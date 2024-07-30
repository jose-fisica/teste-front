# Generated by Django 3.0.5 on 2024-07-28 01:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projeto', '0004_categoriasponsorprimarioprojeto_perguntasponsorprimarioprojeto_sponsorprimarioprojeto'),
    ]

    operations = [
        migrations.CreateModel(
            name='SponsorPosicionamento',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('posicionamento', models.BooleanField(default=True)),
                ('projeto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sponsor_primario_posicionamento', to='projeto.Projeto')),
            ],
        ),
    ]
