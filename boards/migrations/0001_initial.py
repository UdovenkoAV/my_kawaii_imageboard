# Generated by Django 4.1.2 on 2022-10-06 16:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('slug', models.CharField(max_length=10)),
                ('description', models.TextField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_number', models.IntegerField()),
                ('title', models.CharField(blank=True, max_length=120)),
                ('username', models.CharField(max_length=120)),
                ('email', models.CharField(blank=True, max_length=120)),
                ('file', models.FileField(blank=True, null=True, upload_to='src')),
                ('thumbnail', models.ImageField(blank=True, null=True, upload_to='thumb')),
                ('message', models.TextField(blank=True, max_length=2000)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('board', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='boards.board')),
                ('parent', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replyes', to='boards.post')),
            ],
        ),
    ]