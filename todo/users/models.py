from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    Enrollment_No = models.CharField(max_length=10, unique=True)
    Name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    Role_choices = [
        ('Admin', 'Admin'),
        ('Member', 'Member')
    ]
    Role = models.CharField(max_length=6, choices=Role_choices, default='Member')
    class Meta:
        db_table = 'todo'