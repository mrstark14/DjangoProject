from django.db import models
from users.models import User
# Create your models here.
class Project(models.Model):
    project_name = models.CharField(max_length = 100, unique=True, blank=False)
    due_date = models.DateField(auto_now=False, auto_now_add=False, blank=False, null=False)
    project_members = models.ManyToManyField(User, related_name='project_members')
    project_leader = models.OneToOneField(User, on_delete = models.CASCADE, related_name='project_leader', blank = True, null = True)
    def __str__(self):
        return f"{self.project_name}"

# class ProjectMembers(models.Model):
#     name = models.OneToOneField(User, on_delete=models.CASCADE)
#     role_choice = [
#         ('Leader','Leader'),
#         ('Member', 'Member')
#     ]
#     role = models.CharField(max_length=10, choices=role_choice, default='Member')
#     project = models.ForeignKey(to=Project, on_delete=models.CASCADE)
#     def __str__(self):
#         return f"{self.name}: {self.project}"

class ProjectList(models.Model):
    list_name = models.CharField(max_length=100)
    project = models.ForeignKey(to=Project,on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.list_name}"

class ProjectCard(models.Model):
    card_name = models.CharField(max_length=100)
    project = models.ForeignKey(to=Project,on_delete=models.CASCADE)
    list = models.ForeignKey(to=ProjectList, on_delete=models.CASCADE)
    card_members = models.ManyToManyField(User)
    def __str__(self):
        return f"{self.card_name}"

# class CardMembers(models.Model):
#     members = models.ManyToManyField(User)
#     list = models.ForeignKey(to=ProjectList,on_delete=models.CASCADE)