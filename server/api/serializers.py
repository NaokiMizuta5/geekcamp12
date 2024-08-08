from rest_framework import serializers

from api.models import User, HabitItem, HabitStatus


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'nickname',]


class HabitItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitItem
        fields = ['id', 'name', 'frequency', 'created_by']  # TODO: Add fields


class HabitStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitStatus
        fields = ['id', 'date', 'time', 'status', 'habit_item']
