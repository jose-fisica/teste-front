# Generated by Django 3.0.5 on 2024-07-26 00:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projeto', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='saudeprojeto',
            name='somatoria',
        ),
    ]
