from rest_framework import serializers

from api.models import User, HabitItem, HabitStatus


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'nickname',]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
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
        fields = ['id', 'name', 'frequency', 'created_by']  # TODO: Add fields


class HabitStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitStatus
        fields = ['id', 'commited_at', 'state', 'habit_item']
