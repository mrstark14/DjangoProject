"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.http import response
from django.urls import path, include
from users.views import response_handle
from project.views import ProjectModelViewSet, ProjectCardModelViewSet, ProjectListModelViewSet
from rest_framework.routers import DefaultRouter

router1 = DefaultRouter()
router2 = DefaultRouter()
router3 = DefaultRouter()
# router4 = DefaultRouter()
# router5 = DefaultRouter()
router1.register('projectapi', ProjectModelViewSet)
router2.register('projectcardapi', ProjectCardModelViewSet)
router3.register('projectlistapi', ProjectListModelViewSet)
# router4.register('projectmembersapi', ProjectMembersModelViewSet)
# router5.register('cardmembersapi', CardMembersModelViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', response_handle),
    path('project/', include(router1.urls)),
    path('projectcard/', include(router2.urls)),
    path('projectlist/', include(router3.urls)),
    #path('projectmembers/', include(router4.urls)),
    #path('cardmembers/', include(router5.urls))
]
