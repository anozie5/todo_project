# Generated by Django 5.0.8 on 2024-08-08 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteApi', '0003_alter_user_last_login'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
    ]