from django.shortcuts import render
from rest_framework import ( viewsets , generics )
from .models import SolicitacaoServico
from .serializers import ( SolicitacaoServicoSerializer , UserSerializer )
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny

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
