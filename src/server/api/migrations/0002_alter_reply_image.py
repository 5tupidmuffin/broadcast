# Generated by Django 4.1.7 on 2023-03-07 12:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="reply",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="reply_images/"),
        ),
    ]
