# Generated by Django 3.2.6 on 2021-10-10 07:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0008_auto_20211006_1539'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projectcard',
            name='project',
        ),
    ]
