from django.http import response
from django.shortcuts import render
from rest_framework import serializers, viewsets
from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Project, ProjectCard, ProjectList
from .serializers import ProjectSerializer, ProjectCardSerializer, ProjectListSerializer, ProjectDetailSerializer
from rest_framework.authentication import TokenAuthentication
from .custompermissions import ProjectPermission, CardPermission, ListPermission

class ProjectModelViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [ProjectPermission]
    # # permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer


class ProjectCardModelViewSet(viewsets.ModelViewSet):
    queryset = ProjectCard.objects.all()
    serializer_class = ProjectCardSerializer
    # #authentication_classes = [BasicAuthentication]
    authentication_classes = [TokenAuthentication]
    permission_classes = [CardPermission]


class ProjectListModelViewSet(viewsets.ModelViewSet):
    queryset = ProjectList.objects.all()
    serializer_class = ProjectListSerializer
    #authentication_classes = [BasicAuthentication]
    authentication_classes = [TokenAuthentication]
    permission_classes = [ListPermission]

# class ProjectMembersModelViewSet(viewsets.ModelViewSet):
#     queryset = ProjectMembers.objects.all()
#     serializer_class = ProjectMembersSerializer

# class CardMembersModelViewSet(viewsets.ModelViewSet):
#     queryset = CardMembers.objects.all()
#     serializer_class = CardMembersSerializer

# class ProjectsModelViewSet(viewsets.ModelViewSet):
#     serializer_class = ProjectDetailSerializer
#     def get_queryset(self, request):
#         queryset = Project.objects.filter(use)

# class ProjectsModelViewSet(viewsets.ModelViewSet):
#     serializer_class = ProjectDetailSerializer
#     def get_queryset(self, request):
#         return Project.objects.all().filter(project_members__User__enrollment_no__contains=request.user.username)

class DashboardProjectViewset(viewsets.ModelViewSet):
    """
    Shows the list of projects a user is part of
    """
    serializer_class = ProjectSerializer
    http_method_names=['get']

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        queryset = Project.objects.filter(project_members = user)
        return queryset

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class ProjectListViewset(viewsets.ModelViewSet):
    """
    Shows the lists of a particular project
    """
    serializer_class = ProjectListSerializer
    http_method_names=['get']

    def get_queryset(self, *args, **kwargs):
        project_id = int(self.request.GET.get('projectid',''))
        asked_project = Project.objects.get(id = project_id)
        queryset = ProjectList.objects.filter(project = asked_project)
        return queryset

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class ListCardViewset(viewsets.ModelViewSet):
    """
    Shows the cards of a particular list
    """
    serializer_class = ProjectCardSerializer
    http_method_names=['get']

    def get_queryset(self, *args, **kwargs):
        list_id = int(self.request.GET.get('list',''))
        asked_list = ProjectList.objects.get(id = list_id)
        queryset = ProjectCard.objects.filter(list = asked_list)
        return queryset

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]