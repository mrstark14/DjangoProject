from django.http import response
from django.shortcuts import render
from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
from .models import Project, ProjectCard, ProjectList
from .serializers import ProjectSerializer, ProjectCardSerializer, ProjectListSerializer
from rest_framework.authentication import SessionAuthentication
from .custompermissions import ProjectPermission, CardPermission

class ProjectModelViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [ProjectPermission]
    # permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer    


class ProjectCardModelViewSet(viewsets.ModelViewSet):
    queryset = ProjectCard.objects.all()
    serializer_class = ProjectCardSerializer
    # #authentication_classes = [BasicAuthentication]
    authentication_classes = [SessionAuthentication]
    permission_classes = [CardPermission]


class ProjectListModelViewSet(viewsets.ModelViewSet):
    queryset = ProjectList.objects.all()
    serializer_class = ProjectListSerializer
    #authentication_classes = [BasicAuthentication]
    authentication_classes = [SessionAuthentication]
    permission_classes = [ProjectPermission]

# class ProjectMembersModelViewSet(viewsets.ModelViewSet):
#     queryset = ProjectMembers.objects.all()
#     serializer_class = ProjectMembersSerializer

# class CardMembersModelViewSet(viewsets.ModelViewSet):
#     queryset = CardMembers.objects.all()
#     serializer_class = CardMembersSerializer