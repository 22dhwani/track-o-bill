from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Group)

class BillAdmin(admin.ModelAdmin):
    list_display = ('id', 'amount', 'tax', 'image')
admin.site.register(Bill, BillAdmin)

admin.site.register(Transaction)
admin.site.register(Owning)
admin.site.register(AppUser)