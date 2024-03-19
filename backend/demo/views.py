from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer, UserSerializer

class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserSearchAPIView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        name = self.request.query_params.get('name', None)
        hometown = self.request.query_params.get('hometown', None)
        age = self.request.query_params.get('age', None)
        gender = self.request.query_params.get('gender', None)
        
        if name:
            queryset = queryset.filter(username__icontains=name)
        if hometown:
            queryset = queryset.filter(profile__hometown__icontains=hometown)
        if age:
            queryset = queryset.filter(profile__age=age)
        if gender:
            queryset = queryset.filter(profile__gender=gender)
        
        return queryset