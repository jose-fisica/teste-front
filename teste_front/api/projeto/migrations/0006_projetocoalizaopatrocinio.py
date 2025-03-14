# Generated by Django 3.0.5 on 2024-07-28 03:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projeto', '0005_sponsorposicionamento'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjetoCoalizaoPatrocinio',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nm_sponsor', models.CharField(max_length=1000)),
                ('nm_grupo', models.CharField(max_length=1000)),
                ('nm_sponsor_grupo', models.CharField(max_length=1000)),
                ('posicionamento', models.BooleanField(default=True)),
                ('escala', models.IntegerField()),
                ('projeto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='coalizao_patrocinio', to='projeto.Projeto')),
            ],
        ),
    ]
