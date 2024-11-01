import os
import django
from .models import *
from django.db.models import Q  # Import Q object to perform OR queries
from django.db.models import Avg,Sum
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'track_o_bill.settings')  # Replace with your project name
django.setup()

UserModel = get_user_model()
UserModel.create_superuser("t@a.com","12123")