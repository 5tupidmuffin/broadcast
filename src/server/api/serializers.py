from rest_framework import serializers

from . import models


class ImageboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Imageboard
        fields = "__all__"


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Thread
        fields = "__all__"


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reply
        fields = "__all__"


class ThreadListSerializer(serializers.ModelSerializer):
    threads = serializers.SerializerMethodField()

    class Meta:
        model = models.Imageboard
        fields = "__all__"

    def get_threads(self, obj):
        serializer_context = {"request": self.context.get("request")}
        threads = models.Thread.objects.filter(imageboard__initials=obj.initials)
        if not threads.exists():
            return []
        return ThreadSerializer(threads, many=True, context=serializer_context).data


class ThreadDetailSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = models.Thread
        fields = "__all__"

    def get_replies(self, obj):
        replies = models.Reply.objects.filter(pk=obj.id)
        if not replies.exists():
            return []
        return ReplySerializer(replies, many=True).data
