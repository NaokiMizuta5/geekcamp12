from rest_framework import serializers

from api.models import (
    HabitItem,
    HabitStatus,
    User,
    HabitLog
)


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
        try:
            password = validated_data.pop('password')
            instance.set_password(password)
        except KeyError:
            pass

        try:
            friends = validated_data.pop('friends')
            instance.friends.set(friends)
        except KeyError:
            pass

        try:
            joined_habit_items = validated_data.pop('joined_habit_items')
            instance.joined_habit_items.set(joined_habit_items)
        except KeyError:
            pass

        for attr, value in validated_data.items():
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
        ]

    def create(self, validated_data):
        habit_item = HabitItem.objects.create(**validated_data)
        habit_item.save()
        return habit_item

    def update(self, instance, validated_data):
        try:
            committing_users = validated_data.pop('committing_users')
            instance.committing_users.set(committing_users)
        except KeyError:
            pass

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class HabitStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitStatus
        fields = [
            'id',
            'date_committed',
            'time_committed',
            'state',
            'habit_item',
            'committed_by',
            'count',
            'next',
        ]

    def create(self, validated_data):
        habit_status = HabitStatus.objects.create(**validated_data)
        habit_status.save()
        return habit_status

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = [
            'id',
            'habit_item',
            'date_committed',
            'next',
        ]

    def create(self, validated_data):
        habit_log = HabitLog.objects.create(**validated_data)
        habit_log.save()
        return habit_log

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
