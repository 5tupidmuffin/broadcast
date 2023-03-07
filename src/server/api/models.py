from django.db import models


class Imageboard(models.Model):
    initials = models.CharField(max_length=2, primary_key=True)
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=200)
    banner_image = models.ImageField(upload_to="imageboard_banners/")


class Thread(models.Model):
    imageboard = models.ForeignKey(
        Imageboard, db_column="initials", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=30, default="Anonymous")
    title = models.CharField(max_length=50)
    body = models.TextField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to="thread_images/")


class Reply(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=30, default="Anonymous")
    body = models.TextField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to="reply_images/", blank=True, null=True)
