# Generated by Django 5.1 on 2024-08-11 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_habitteamlog'),
    ]

    operations = [
        migrations.AlterField(
            model_name='habitstatus',
            name='date_committed',
            field=models.DateField(blank=True, null=True, verbose_name='date committed'),
        ),
    ]
