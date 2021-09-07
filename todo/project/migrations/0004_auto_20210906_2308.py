# Generated by Django 3.2.6 on 2021-09-06 23:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('project', '0003_auto_20210906_2303'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectcard',
            name='card_members',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='CardMembers',
        ),
    ]