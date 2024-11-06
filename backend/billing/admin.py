from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Group)
admin.site.register(Bill)
admin.site.register(Transaction)
admin.site.register(Owning)
admin.site.register(AppUser)