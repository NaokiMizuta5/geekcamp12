from django.urls import include, path
from rest_framework import routers

from api.views import HelloWorld, UserViewSet


router = routers.DefaultRouter()
router.register('users', UserViewSet)


urlpatterns = [
    path('hello/', HelloWorld.as_view()),
    path('', include(router.urls)),
]
