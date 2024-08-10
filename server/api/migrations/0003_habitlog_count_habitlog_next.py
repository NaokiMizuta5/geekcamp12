# Generated by Django 5.1 on 2024-08-10 16:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_habitstatus_committed_at_habitstatus_count_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='habitlog',
            name='count',
            field=models.PositiveIntegerField(blank=True, default=1, verbose_name='count'),
        ),
        migrations.AddField(
            model_name='habitlog',
            name='next',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='prev', to='api.habitlog', verbose_name='next habit log'),
        ),
    ]