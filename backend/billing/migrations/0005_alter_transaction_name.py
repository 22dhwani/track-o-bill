# Generated by Django 5.1.2 on 2024-11-03 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0004_transaction_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='name',
            field=models.CharField(blank=True, default='as', max_length=255),
        ),
    ]
