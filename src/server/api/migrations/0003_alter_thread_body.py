# Generated by Django 4.1.7 on 2023-03-07 13:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_alter_reply_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="thread",
            name="body",
            field=models.TextField(default="<empty body>", max_length=200),
            preserve_default=False,
        ),
    ]
