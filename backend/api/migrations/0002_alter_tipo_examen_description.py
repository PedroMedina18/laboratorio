# Generated by Django 3.2.18 on 2023-05-19 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tipo_examen',
            name='description',
            field=models.TextField(max_length=2000),
        ),
    ]
