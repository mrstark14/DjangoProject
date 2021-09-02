from django.http import response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin

from .models import Project
from .serializers import ProjectSerializer

# Create your views here.

# class ProjectView(APIView, UpdateModelMixin, DestroyModelMixin):
#     def get(self, request, id=None):
#         if id:
#             try:
#                 queryset = Project.objects.get(id = id)
#             except:
#                 return Response({'errors': 'This project does not exist.'}, status=400)
#             read_serializer = ProjectSerializer(queryset)
#         else:
#             queryset = Project.objects.all()
#             read_serializer = ProjectSerializer(queryset, many=True)
#         return Response(read_serializer.data)
