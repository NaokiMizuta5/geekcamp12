from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models


# Tables

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
    habit_items = models.ManyToManyField(
        to='HabitItem',
        related_name='joined_users',
        verbose_name='habit items',
        blank=True,
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

    # TODO: Implement this
    habit_notification_setting = ...
    habit_sharing_settings = ...

    created_by = models.ForeignKey(
        to='User',
        on_delete=models.PROTECT,
        related_name='created_habit_items',
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name


class HabitStatus(models.Model):
    SUCCEEDED = 'SC'
    SKIPPED = 'SK'
    FAILED = 'FL'

    STATE_CHOICES = {
        SUCCEEDED: 'succeeded',
        SKIPPED: 'skipped',
        FAILED: 'failed',
    }

    commited_at = models.DateTimeField(
        verbose_name='commited at',
        auto_now_add=True,
        blank=False,
        null=False,
    )
    state = models.CharField(
        verbose_name='state',
        max_length=2,
        choices=STATE_CHOICES,
        blank=False,
        null=False,
        default=SUCCEEDED,
    )

    habit_item = models.ForeignKey(
        to='HabitItem',
        on_delete=models.PROTECT,
        related_name='committed_habit_status',
        blank=False,
        null=False,
        default=1,
    )
    commited_by = models.ForeignKey(
        to='User',
        on_delete=models.PROTECT,
        related_name='committed_habit_status',
        blank=False,
        null=False,
        default=1,
    )

    def __str__(self):
        return (
            f'item: {self.habit_item}; '
            f'{self.commited_at}; '
            f'{self.commited_by}'
        )


# Join tables

...
