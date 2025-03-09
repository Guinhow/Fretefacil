from django.shortcuts import render
from rest_framework import ( viewsets , generics )
from .models import SolicitacaoServico , CustomUser
from .serializers import ( SolicitacaoServicoSerializer , UserSerializer , CustomUserSerializer )
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        print("Dados recebidos:", serializer.validated_data)
        super().perform_create(serializer)

class SolicitacaoServicoViewSet(viewsets.ModelViewSet):
    queryset = SolicitacaoServico.objects.all()
    serializer_class = SolicitacaoServicoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(cliente=self.request.user)

class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_type'] = self.user.user_type 
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer