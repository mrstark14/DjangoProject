from django.db import models
from users.models import User
# Create your models here.
class Project(models.Model):
    ProjectName = models.CharField(max_length = 100, unique=True, blank=False)
    Due_Date = models.DateField(auto_now=False, auto_now_add=False, blank=False, null=False)
    def __str__(self):
        return f"{self.ProjectName}"

class ProjectMembers(models.Model):
    Name = models.OneToOneField(User, on_delete=models.CASCADE)
    Role_choice = [
        ('Leader','Leader'),
        ('Member', 'Member')
    ]
    Role = models.CharField(max_length=10, choices=Role_choice, default='Member')
    ProjectName = models.ForeignKey(to=Project, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.Name}: {self.ProjectName}"

class ProjectList(models.Model):
    Name = models.CharField(max_length=100)
    ProjectName = models.ForeignKey(to=Project,on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.Name}"

class ProjectCard(models.Model):
    Name = models.CharField(max_length=100)
    ProjectName = models.ForeignKey(to=Project,on_delete=models.CASCADE)
    ListName = models.ForeignKey(to=ProjectList, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.Name}"

class CardMembers(models.Model):
    Members = models.ManyToManyField(User)
    List = models.ForeignKey(to=ProjectList,on_delete=models.CASCADE)