from django.contrib import admin
from .models import Project,ProjectCard,ProjectList,ProjectMembers,CardMembers
# Register your models here.
admin.site.register(Project)
admin.site.register(ProjectMembers)
admin.site.register(ProjectList)
admin.site.register(ProjectCard)
admin.site.register(CardMembers)