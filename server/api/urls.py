from django.urls import include, path
from rest_framework import routers
from . import views

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
    path('api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
]
