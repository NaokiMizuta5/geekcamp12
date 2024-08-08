from django.urls import include, path
from rest_framework import routers

from api.views import HelloWorld


router = routers.DefaultRouter()


urlpatterns = [
    path('hello/', HelloWorld.as_view()),
    path('', include(router.urls)),
]
