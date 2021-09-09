from rest_framework import permissions
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .serializers import ProjectSerializer
from .models import Project
from users.models import User


class ProjectPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.method == 'GET':
                user = User.objects.get(username=request.user.username)
                if user.role != 'Admin' and len(request.get_full_path())==20:
                    return False
                return request.user.is_authenticated
        # print(request.data, "hello")
        return request.user.is_authenticated
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            user = User.objects.get(username=request.user.username)
            if request.user in obj.project_members.all() or user.role == 'Admin':
                return True
            return False
        if request.user == obj.project_leader:
            return True
        return False
        
class CardPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.method == 'GET':
                user = User.objects.get(username=request.user.username)
                if user.role != 'Admin' and len(request.get_full_path())==24:
                    return False
                return request.user.is_authenticated
        # print(request.data, "hello")
        return request.user.is_authenticated
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            user = User.objects.get(username=request.user.username)
            if request.user in obj.project.project_members.all() or user.role == 'Admin':
                return True
            return False
        if request.user in obj.card_members.all() or request.user == obj.project.project_leader:
            return True
        return False

class ListPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            user = User.objects.get(username=request.user.username)
            if request.user in obj.project.project_members.all() or user.role == 'Admin':
                return True
            return False
        if request.user == obj.project.project_leader:
            return True
        return False