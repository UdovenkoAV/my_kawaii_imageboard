# Generated by Django 4.1.2 on 2022-11-14 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SiteConfiguration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site_name', models.CharField(default='My kawaii imageboard', max_length=256)),
                ('welcome_message', models.TextField(default='Hello world!', max_length=2048)),
                ('max_upload_file_size', models.IntegerField(default=20971520)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
