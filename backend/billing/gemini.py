import PIL.Image
import google.generativeai as genai
import json
import os
import sys
from io import BytesIO
from django.core.files.base import ContentFile

# Adjust backend directory and append it to the sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(backend_dir)

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "track_o_bill.settings")
import django
django.setup()

from billing.models import Bill

# Configure the Google Generative AI API
genai.configure(api_key="AIzaSyCiqbVPzf_DEAqp7ybWdu_oL2w0AfMz5ec")

# Path to the bill image
image_path = "Bill-2.jpg"
img = PIL.Image.open(image_path)

try:
    # Initialize the generative AI model
    model = genai.GenerativeModel("gemini-1.5-flash")

    # Generate a prompt for extracting bill details
    prompt = "From this receipt give me a table format for item and price, take the item from left side of image and take price from right side of image strictly. Omit numbers from the item part and omit items written in bold, also include the total amount of bill and total tax in the table."
    response = model.generate_content([img, prompt])

    # Debug: Print the AI response text
    print("AI Response:")
    print(response.text)

    # Generate a sequential bill_id by checking the last entry in the database
    last_bill = Bill.objects.last()
    if last_bill:
        new_bill_id = last_bill.id + 1  # Increment the last bill ID
    else:
        new_bill_id = 1  # Start from 1 if no entries exist

    # Initialize extracted data dictionary
    extracted_data = {
        "bill_id": new_bill_id,  # Use the sequential bill ID
        "total_amount": 0,  # Default to 0
        "total_tax": 0,  # Default to 0
        "items": [],
    }

    lines = response.text.split("\n")
    for line in lines:
        line = line.strip()  # Clean line of extra spaces

        # Process lines containing valid table rows
        if "|" in line and "Item" not in line and "Price" not in line:
            try:
                parts = line.split("|")
                item = parts[1].strip()  # Extract item name
                price = parts[2].strip()  # Extract price

                # Skip non-item rows like Subtotal and Total Tax
                if item.lower() not in ["subtotal", "total tax"] and item != "":
                    price = float(price.replace("$", "").replace("**", ""))  # Convert price to float
                    extracted_data["items"].append({"item_name": item, "price": price})
                elif "**Subtotal**" in line:  # Extract total amount
                    extracted_data["total_amount"] = float(price.replace("$", "").replace("**", ""))
                elif "**Total Tax**" in line:  # Extract total tax
                    extracted_data["total_tax"] = float(price.replace("$", "").replace("**", ""))
            except (IndexError, ValueError) as e:
                print(f"Error parsing line: {line} - {e}")
                continue


    # Ensure all required fields have valid data
    if extracted_data["total_amount"] is None:
        extracted_data["total_amount"] = 0  # Fallback value
    if extracted_data["total_tax"] is None:
        extracted_data["total_tax"] = 0  # Fallback value
    
    bill_image = BytesIO()
    img.save(bill_image, format='JPEG')
    bill_image.seek(0)

    image_name = os.path.basename(image_path)
    image_file = ContentFile(bill_image.read(), name=image_name)

    # Save the extracted data into the Bill model
    try:
        bill = Bill(
            image=image_path,
            id=extracted_data["bill_id"],
            amount=extracted_data["total_amount"],
            tax=extracted_data["total_tax"],
            items=extracted_data.get("items", []),  # Use `.get` to ensure items key exists
        )
        bill.save()
        print("Bill saved successfully!")
    except Exception as e:
        print(f"Error saving bill: {e}")
