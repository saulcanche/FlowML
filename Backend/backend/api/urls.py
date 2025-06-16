from django.urls import path
from .views import UploadFileView

urlpatterns = [
    path('upload_file/', UploadFileView.as_view(), name='upload-file'),
]