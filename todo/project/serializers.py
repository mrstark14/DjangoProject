from rest_framework import serializers
from .models import Project, ProjectCard, ProjectList

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['project_name', 'due_date', 'project_leader', 'project_members']

class ProjectCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCard
        fields = ['card_name', 'project', 'list', 'card_members']

class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectList
        fields = ['list_name', 'project']

# class ProjectMembersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProjectMembers
#         fields = ['name', 'role', 'project']

# class CardMembersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CardMembers
#         fields = ['members', 'list']