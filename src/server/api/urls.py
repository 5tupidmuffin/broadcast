from django.urls import path, include
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r"imageboard", views.ImageboardViewSet)


app_name = "api"
urlpatterns = [
    path("echo/", views.echo, name="echo"),
    path("", include(router.urls)),
    path("<str:initials>/", views.ThreadList.as_view(), name="ThreadList"),
    path(
        "<str:initials>/<int:thread_id>/",
        views.ThreadDetail.as_view(),
        name="ThreadDetail",
    ),
]
