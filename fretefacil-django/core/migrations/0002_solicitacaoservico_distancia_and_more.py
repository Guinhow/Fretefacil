# Generated by Django 5.1.6 on 2025-03-07 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='solicitacaoservico',
            name='distancia',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='solicitacaoservico',
            name='valor',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
    ]
