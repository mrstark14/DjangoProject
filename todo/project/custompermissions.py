from rest_framework import permissions
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .serializers import ProjectSerializer
from .models import Project


class ProjectPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            if request.user in obj.project_members.all() or request.user.is_superuser:
                return True
            return False
        if request.user == obj.project_leader:
            return True
        return False
        