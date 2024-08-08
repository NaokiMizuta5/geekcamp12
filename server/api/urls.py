from django.urls import include, path
from rest_framework import routers

from api.views import (
    HabitItemViewSet,
    HabitStatusViewSet,
    HelloWorld,
    UserViewSet,
)


router = routers.DefaultRouter()

router.register('users', UserViewSet)
router.register('habit_items', HabitItemViewSet)
router.register('habit_status', HabitStatusViewSet)


urlpatterns = [
    path('hello/', HelloWorld.as_view()),
    path('', include(router.urls)),
]
