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
    joined_habit_items = models.ManyToManyField(
        to='HabitItem',
        related_name='committing_users',
        verbose_name='joined habit items',
        blank=True,
    )
    friends = models.ManyToManyField(
        to='User',
        symmetrical=True,
        verbose_name='friends',
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

    committed_at = models.DateTimeField(
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
    committed_by = models.ForeignKey(
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
            f'{self.committed_at}; '
            f'{self.committed_by}'
        )


# Join tables

...
