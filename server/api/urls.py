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
    path('hello/', HelloWorld.as_view(), name='hello'),
    path('', include(router.urls)),
    path('api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    
    # Habit関連
    path('habits/create/', views.create_habit_item, name='create_habit_item'),
    path('habits/log_habit/', views.log_habit, name='log_habit'),
    path('habits/<int:pk>/count/', views.count, name='count'),  # habit_idを使ってcountを取得
    
    # Progress関連
    path('progress/record/', views.create_habit_status, name='create_habit_status'),
]

