# Generated by Django 5.0.8 on 2024-08-16 23:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('siteApi', '0007_delete_token'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='profile_picture',
        ),
    ]
