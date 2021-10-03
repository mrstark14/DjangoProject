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
from users.views import LoginClass
from project.views import ProjectModelViewSet, ProjectCardModelViewSet, ProjectListModelViewSet
from rest_framework.routers import DefaultRouter
from users.views import UserModelViewSet
from rest_framework_simplejwt import views as jwt_views
# from users.views import test

router = DefaultRouter()
# router2 = DefaultRouter()
# router3 = DefaultRouter()
# router4 = DefaultRouter()
# router5 = DefaultRouter()
router.register('project', ProjectModelViewSet)
router.register('projectcard', ProjectCardModelViewSet)
router.register('projectlist', ProjectListModelViewSet)
router.register('user', UserModelViewSet)
# router5.register('cardmembersapi', CardMembersModelViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', LoginClass.as_view()),
    path('api/', include(router.urls)),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    # path('projectcard/', include(router2.urls)),
    # path('projectlist/', include(router3.urls)),
    # path('users/', include(router4.urls)),
    # path('test/<int:id>/', test),
    #path('cardmembers/', include(router5.urls))
]
