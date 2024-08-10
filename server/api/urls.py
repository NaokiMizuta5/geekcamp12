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

    path('db/user/get/<int:user_id>/', views.get_user, name='get_user'),
    path('db/users/get/', views.get_users, name='get_users'),
    path('db/user/joined-habit-items/of/<int:user_id>/',
         views.get_joined_habit_items_of,
         name='get_joined_habit_items_of'),
    path('db/user/friends/of/<int:user_id>/',
         views.get_friends_of,
         name='get_friends_of'),
    path('db/user/update/<int:user_id>/',
         views.update_user,
         name='update_user'),

    path('habits/create/', views.create_habit_item, name='create_habit_item'),
    path('progress/record/', views.create_habit_status,
         name='create habit status'),

    path('db/habit_item/get/<int:habit_item_id>/',
         views.get_habit_item,
         name='get_habit_item'),
    path('db/habit_items/get/',
         views.get_habit_items,
         name='get_habit_items'),

    path('db/habit_status/get/<int:habit_status_id>/',
         views.get_habit_status,
         name='get_habit_status'),
    path('db/multiple_habit_status/get/',
         views.get_multiple_habit_status,
         name='get_multiple_habit_status'),
]
