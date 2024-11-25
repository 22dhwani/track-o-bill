import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MenuProps } from "@mui/material";
import Input from "../components/Input";

interface BillModalProps {
  open: boolean;
  onClose: () => void;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "#1A1B1C",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  maxHeight: "80vh",
  overflow: "auto",
};

const BillModal: React.FC<BillModalProps> = ({ open, onClose }) => {
  const [invoiceNumber, setInvoiceNumber] = useState("#000058");
  const [invoiceDate, setInvoiceDate] = useState("09/05/24");
  const [clientName, setClientName] = useState("Freshco");
  const [items, setItems] = useState<Item[]>([
    { name: "Dashboard UX + UI", quantity: 5, price: 4000 },
  ]);
  // const [total, setTotal] = useState(22500); // Total price editable
  const [total, setTotal] = useState(0); // Total price

  // Update total whenever items change
  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(newTotal);
  }, [items]);
  const [selectedFrom, setSelectedFrom] = useState<string[]>([
    "Dhrumil",
    "Smit",
  ]);
  const [selectedTo, setSelectedTo] = useState<string[]>([
    "Dhrumil",
    "Smit",
  ]);

  // Update total price when edited
  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTotal = Number(e.target.value);
    setTotal(newTotal);
  };

  // Handle dropdown select for options
  const handleDropdownChange = (type: "from" | "to", value: string) => {
    if (type === "from") {
      setSelectedFrom((prevState) =>
        prevState.includes(value)
          ? prevState.filter((val) => val !== value)
          : [...prevState, value]
      );
    } else {
      setSelectedTo((prevState) =>
        prevState.includes(value)
          ? prevState.filter((val) => val !== value)
          : [...prevState, value]
      );
    }
  };

  // Render people list based on selected options
  const renderPeopleList = () => {
    const selectedOptions = selectedTo.length > 0 ? selectedTo : [];
    const pricePerPerson =
      selectedOptions.length > 0 ? total / selectedOptions.length : 0;

    // return selectedOptions.map((option, index) => (
    //   <div key={index} className="space-y-4 mt-4">
    //     <h3 className="font-medium text-white">Peoples</h3>
    //     <div className="space-y-3">
    // <div className="flex items-center text-primaeryYellow  justify-between">
    //   <span className="text-sm font-semibold">Name</span>
    //   <span className="text-sm font-semibold">Price</span>
    // </div>
    //       <div className="flex items-center justify-between text-white">
    //         <span className="text-sm">{option}</span>
    //         <span className="text-sm">{pricePerPerson.toFixed(2)}</span>
    //       </div>
    //     </div>
    //   </div>
    // ));
    return (
      <div className="space-y-4 mt-4">
        {/* Single Title */}
        <h3 className="font-medium text-white">People</h3>

        {/* Headings for Name and Price */}
        <div className="flex items-center text-primaeryYellow  justify-between">
          <span className="text-sm font-semibold">Name</span>
          <span className="text-sm font-semibold">Price</span>
        </div>

        {/* List of People */}
        <div className="space-y-3">
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-white"
            >
              <span className="text-sm">{option}</span>
              <span className="text-sm">{pricePerPerson.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render item list
  const renderItemList = () => {
    return items.map((item, index) => (
      <div key={index} className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{item.name}</span>
          <span className="text-sm text-dimWhite">
            Quantity: {item.quantity}
          </span>
          <span className="text-sm text-dimWhite">Price: {item.price}</span>
        </div>
      </div>
    ));
  };

  // Update item details
  const updateItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setItems(updatedItems);
  };

  // Add a new item to the list
  const addItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0 }]);
  };

  // Delete an item from the list
  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };
  // Custom MenuProps to apply white text
  const customMenuProps: Partial<MenuProps> = {
    PaperProps: {
      sx: {
        bgcolor: "#1A1B1C", // Background color of the dropdown
        color: "white", // White text color
      },
    },
  };

  return (
    <Modal
      className="bg-dimgGray"
      open={open}
      onClose={onClose}
      aria-labelledby="create-invoice-modal"
    >
      <Box sx={modalStyle}>
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-white">Add Bill</h1>
        </header>

        {/* Invoice Details */}
        <section className="space-y-2 mb-4">
          <h2 className="text-sm font-medium text-white">Bill Details</h2>
          <div className="grid grid-cols-2  space-x-4">
            <div className="">
              <label className="text-xs font-semibold text-white">
                Bill Number
              </label>
              <Input
                placeholderclassname=" text-dimWhite text-xs"
                type="text"
                value={invoiceNumber}
                readOnly
                className="w-full  border rounded-md bg-black"
              />
            </div>
            <div className="">
              <label className="text-xs font-semibold text-white">
                Bill Date
              </label>
              <Input
                placeholderclassname=" text-dimWhite text-xs"
                type="date"
                value={invoiceDate}
                onChange={(e: any) => setInvoiceDate(e.target.value)}
                className="w-full  border rounded-md bg-black"
              />
            </div>
          </div>
        </section>

        {/* Bill Name */}
        <section className="space-y-2 mb-4">
          <h2 className="text-sm font-medium text-white">
            Bill Name
          </h2>
          <Input
            placeholderclassname=" text-dimWhite"
            type="text"
            value={clientName}
            onChange={(e: any) => setClientName(e.target.value)}
            className="w-full  border rounded-md bg-black"
          />
        </section>

        {/* Business Info */}
        <section className="space-y-2 mb-4">
          <h2 className="text-sm font-medium text-white">Bill Info</h2>
          <div className="flex space-x-4 ">
            <Select
              multiple
              value={selectedFrom}
              onChange={(e) => {
                const value = e.target.value as string[];
                setSelectedFrom(value);
              }}
              renderValue={(selected) => selected.join(", ")}
              className="flex-1 !text-white bg-black border-white border-[0.5px]"
              MenuProps={customMenuProps} // Apply custom MenuProps
            >
              <MenuItem value="Dhrumil" className="text-white ">
                <Checkbox checked={selectedFrom.includes("Dhrumil")} />
                Dhrumil
              </MenuItem>
              <MenuItem value="Smit" className="text-white">
                <Checkbox checked={selectedFrom.includes("Smit")} />
                Smit
              </MenuItem>
            </Select>
            <Select
              multiple
              value={selectedTo}
              onChange={(e) => {
                const value = e.target.value as string[];
                setSelectedTo(value);
              }}
              renderValue={(selected) => selected.join(", ")}
              className="flex-1 !text-white bg-black border-white border-[0.5px]"
              MenuProps={customMenuProps} // Apply custom MenuProps
            >
              <MenuItem value="Dhrumil">
                <Checkbox
                  checked={selectedTo.includes("Dhrumil")}
                  className="text-white"
                />
                Dhrumil
              </MenuItem>
              <MenuItem value="Smit">
                <Checkbox
                  className="text-white"
                  checked={selectedTo.includes("Smit")}
                />
                Smit
              </MenuItem>
            </Select>
          </div>
          {/* <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="paid-by" className="block mb-1 text-white">
                Paid By
              </label>
              <Select
                id="paid-by"
                multiple
                value={selectedFrom}
                onChange={(e) => {
                  const value = e.target.value as string[];
                  setSelectedFrom(value);
                }}
                renderValue={(selected) => selected.join(", ")}
                className="!text-white bg-black border-white border-[0.5px]"
                MenuProps={customMenuProps}
              >
                <MenuItem value="Option 1" className="text-white">
                  <Checkbox checked={selectedFrom.includes("Option 1")} />
                  Option 1
                </MenuItem>
                <MenuItem value="Option 2" className="text-white">
                  <Checkbox checked={selectedFrom.includes("Option 2")} />
                  Option 2
                </MenuItem>
              </Select>
            </div>

            <div className="flex-1">
              <label htmlFor="owers" className="block mb-1 text-white">
                Owers
              </label>
              <Select
                id="owers"
                multiple
                value={selectedTo}
                onChange={(e) => {
                  const value = e.target.value as string[];
                  setSelectedTo(value);
                }}
                renderValue={(selected) => selected.join(", ")}
                className="!text-white bg-black border-white border-[0.5px]"
                MenuProps={customMenuProps}
              >
                <MenuItem value="Option A" className="text-white">
                  <Checkbox
                    checked={selectedTo.includes("Option A")}
                    className="text-white"
                  />
                  Option A
                </MenuItem>
                <MenuItem value="Option B" className="text-white">
                  <Checkbox
                    className="text-white"
                    checked={selectedTo.includes("Option B")}
                  />
                  Option B
                </MenuItem>
              </Select>
            </div>
          </div> */}

        </section>

        {/* Item Details */}
        {/* <section className="space-y-2 mb-4">
          <h2 className="text-sm font-medium text-white">Item Details</h2>
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item.name}
                placeholder="Item name"
                onChange={(e) => updateItem(index, "name", e.target.value)}
                className="flex-1 p-2 border rounded-md bg-black text-white placeholder:text-white"
              />
              <input
                type="number"
                value={item.quantity}
                placeholder="Qty"
                onChange={(e) =>
                  updateItem(index, "quantity", Number(e.target.value))
                }
                className="w-16 p-2 border rounded-md bg-black text-white placeholder:text-white"
              />
              <input
                type="number"
                value={item.price}
                placeholder="Price"
                onChange={(e) =>
                  updateItem(index, "price", Number(e.target.value))
                }
                className="w-24 p-2 border rounded-md bg-black text-white placeholder:text-white"
              />
              <button
                onClick={() => deleteItem(index)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
          <button onClick={addItem} className="text-primaryPurple">
            Add Item
          </button>
        </section> */}

        {/* Total Price Section */}
        {/* <section className="space-y-2 mb-4">
          <h2 className="text-sm font-medium text-white">Total Price</h2>
          <input
            type="number"
            value={total}
            onChange={handleTotalChange}
            className="w-full p-2 border rounded-md bg-black text-white placeholder:text-white"
            min="0"
          />
        </section> */}
        {/* Item Details */}
        <section className="space-y-2 mb-4">
          <h2 className="text-sm font-medium text-white">Item Details</h2>
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item.name}
                placeholder="Item name"
                onChange={(e) => updateItem(index, "name", e.target.value)}
                className="flex-1 p-2 border rounded-md bg-black text-white placeholder:text-white"
              />
              <input
                type="number"
                value={item.quantity}
                placeholder="Qty"
                onChange={(e) =>
                  updateItem(index, "quantity", Number(e.target.value))
                }
                className="w-16 p-2 border rounded-md bg-black text-white placeholder:text-white"
              />
              <input
                type="number"
                value={item.price}
                placeholder="Price"
                onChange={(e) =>
                  updateItem(index, "price", Number(e.target.value))
                }
                className="w-24 p-2 border rounded-md bg-black text-white placeholder:text-white"
              />
              <button
                onClick={() => deleteItem(index)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
          <button onClick={addItem} className="text-primaryPurple">
            Add Item
          </button>
        </section>

        {/* Total Price Section */}
        <section className="space-y-2 mb-4">
          <h2 className="text-sm font-medium text-white">Total Price</h2>
          <input
            type="number"
            value={items.reduce((acc, item) => acc + item.price, 0)} // Calculate total price
            readOnly // Make input read-only
            className="w-full p-2 border rounded-md bg-black text-white placeholder:text-white"
          />
        </section>


        {/* People List */}
        <section className="mt-4">{renderPeopleList()}</section>
      </Box>
    </Modal>
  );
};

export default BillModal;
