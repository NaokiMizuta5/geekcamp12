from rest_framework import serializers

from api.models import User, HabitItem, HabitStatus


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'nickname',
            'password',
            'joined_habit_items',
            'friends',
            'created_habit_items',
            'committed_habit_status',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)  # パスワードをハッシュ化して保存
        user.save()
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance


class HabitItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitItem
        fields = [
            'id',
            'name',
            'frequency',
            'created_by',
            'committing_users',
            'committed_habit_status',
        ]  # TODO: Add fields


class HabitStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitStatus
        fields = [
            'id',
            'committed_at',
            'state',
            'habit_item',
            'committed_by',
        ]
