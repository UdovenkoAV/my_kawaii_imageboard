# Generated by Django 4.1.2 on 2022-10-31 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0003_board_bump_limit_board_default_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='pages_limit',
            field=models.IntegerField(default=10),
            preserve_default=False,
        ),
    ]