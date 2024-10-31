from django import forms

class CreateGroupForm(forms.Form):
    group_name = forms.CharField(max_length=255)
    
class GroupForm(forms.Form):
    group_id = forms.IntegerField()