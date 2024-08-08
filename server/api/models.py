from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models


class User(AbstractUser):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        verbose_name='username',
        max_length=256,
        unique=True,
        blank=False,
        null=False,
        default='user',
        validators=[username_validator],
    )
    nickname = models.CharField(
        verbose_name='nickname',
        max_length=256,
        unique=False,
        blank=True,
        null=False,
        default='User',
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['nickname']

    def __str__(self):
        return f'@{self.username} ({self.nickname})'


class HabitItem(models.Model):
    name = models.CharField(
        verbose_name='name',
        max_length=256,
        unique=False,
        blank=False,
        null=False,
        default='Some habit',
    )
    frequency = models.PositiveIntegerField(
        verbose_name='frequency',
        blank=False,
        null=False,
    )

    created_by = models.ForeignKey(
        to=User,
        on_delete=models.PROTECT,
        null=True,
    )

    def __str__(self):
        return self.name


class HabitStatus(models.Model):
    habit_item = models.ForeignKey(HabitItem, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.habit_item.item_name} - {self.date} - {self.status}"