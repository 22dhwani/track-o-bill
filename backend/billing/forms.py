from django import forms

class CreateGroupForm(forms.Form):
    group_name = forms.CharField(max_length=255)
    
class GroupForm(forms.Form):
    group_id = forms.IntegerField()

class AddTransactionForm(forms.Form):
    bill_id = forms.IntegerField()
    group_id = forms.IntegerField()
    payer_id = forms.IntegerField()
    transaction_adder = forms.IntegerField() # The user who added the transaction
    users_involved = forms.JSONField()
    amount_users_own = forms.JSONField()
    total_amount = forms.DecimalField()  # Total amount of the transaction
    name = forms.CharField(max_length=255)

class EditTransactionForm(forms.Form):
    transaction_id = forms.IntegerField() # The user who added the transaction
    payer_id = forms.IntegerField() # The user who added the transaction
    users_involved = forms.JSONField()
    amount_users_own = forms.JSONField()
    total_amount = forms.DecimalField()  # Total amount of the transaction
    name = forms.CharField(max_length=255)
    
class RemoveTransactionForm(forms.Form):
    transaction_id = forms.IntegerField()
    
class SettleUpForm(forms.Form):
    group_id = forms.IntegerField()
    user_id = forms.IntegerField()
