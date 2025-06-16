from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UploadFile
from .serializers import UploadFileSerializer

class UploadFileView(APIView):
    def post(self, request, format=None):
        serializer = UploadFileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
