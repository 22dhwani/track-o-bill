# Generated by Django 5.1.2 on 2024-11-25 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0008_bill_items_delete_groupinvitation'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='first_name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='appuser',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='user_images/'),
        ),
        migrations.AddField(
            model_name='appuser',
            name='last_name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
