# Generated by Django 4.1.2 on 2022-11-01 19:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0006_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='boards', to='boards.category'),
            preserve_default=False,
        ),
    ]
