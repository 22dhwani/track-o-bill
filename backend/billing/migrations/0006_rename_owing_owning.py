# Generated by Django 5.1.2 on 2024-11-03 23:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0005_alter_transaction_name'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Owing',
            new_name='Owning',
        ),
    ]
