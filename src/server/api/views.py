from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from . import models, serializers


@api_view()
def echo(request: Request) -> Response:
    return Response({"message": "server is live"}, status=status.HTTP_200_OK)


class ImageboardViewSet(viewsets.ModelViewSet):
    queryset = models.Imageboard.objects.all()
    serializer_class = serializers.ImageboardSerializer

    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_404_NOT_FOUND)


class ThreadList(APIView):
    def get(self, request: Request, *args, **kwargs) -> Response:
        imageboard_initials = kwargs["initials"]
        thread = get_object_or_404(models.Imageboard, initials=imageboard_initials)
        serializer = serializers.ThreadListSerializer(thread)
        return Response(serializer.data)

    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = serializers.ThreadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ThreadDetail(APIView):
    def get(self, request: Request, *args, **kwargs) -> Response:
        imageboard_initials = kwargs["initials"]
        thread_id = kwargs["thread_id"]
        thread = models.Thread.objects.filter(
            imageboard__initials=imageboard_initials, pk=thread_id
        ).first()
        if not thread:
            return Response(
                {"error": "no such thread exists"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(serializers.ThreadDetailSerializer(thread).data)

    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = serializers.ReplySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
