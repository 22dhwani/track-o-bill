from django.db import models
from django.conf import settings

# from django.contrib.auth.models import User
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


# custom user manager
class AppUserManager(BaseUserManager):
    def create_user(self, email, username=None, password=None, **extra_fields):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username=None, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)

        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        user = self.create_user(email, username, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

# custom app user
class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    groups_joined = models.JSONField(blank=True, default=list)
    objects = AppUserManager()

    def __str__(self):
        return self.username

# group model
class Group(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    users = models.JSONField(blank=True, default=list) # an array of user ids 
    left_users =  models.JSONField(blank=True, default=list) 
    created_at = models.DateTimeField(auto_now_add=True)
    
    # reference to user who created the group, also wil be the admin
    created_by = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="user_created")  

    def __str__(self):
        return str(self.id) + " : "+ self.name

# bill model
class Bill(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to="bills/", null=True, blank=True)  # Store the image of the bill
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Amount of the bill
    tax = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Bill {self.id} - Amount: {self.amount}"

# Transaction Model
class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=True,default="as",max_length=255)
    #bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name="bill",blank=True)  # reference to bill
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="transactions")  # Foreign key to Group
    payer = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="owned_transactions")  # The user who paid
    transaction_adder = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="transaction_adder",blank=True)  # The user who added the transaction
    users_involved = models.JSONField(blank=True, default=list) 
    amount_users_own = models.JSONField(blank=True, default=list) # maps to user_involved
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)  # Total amount of the transaction
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set the creation date
    
    def __str__(self):
        return f"Transaction {self.id} - Group {self.group.name} - Added by: {self.transaction_adder.username} - Payed by: {self.payer.username}"

# Owing Model
class Owning(models.Model):
    id = models.AutoField(primary_key=True)
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name="owings")  # Foreign key to transaction
    owner = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="owed_transactions")  # The person who is owed
    borrower = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="borrowed_transactions")  # The person who owes
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Amount owed
    is_settled = models.BooleanField(default=False)
    def __str__(self):
        return f"Owning {self.id} - Transaction {self.transaction.id} - {self.borrower.username} owes {self.owner.username} {self.amount}"
