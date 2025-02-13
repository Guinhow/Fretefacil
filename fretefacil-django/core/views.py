from django.shortcuts import render
from rest_framework import ( viewsets , generics )
from .models import SolicitacaoServico
from .serializers import ( SolicitacaoServicoSerializer , UserSerializer )
from rest_framework.permissions import IsAuthenticated

class SolicitacaoServicoViewSet(viewsets.ModelViewSet):
    queryset = SolicitacaoServico.objects.all()
    serializer_class = SolicitacaoServicoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(cliente=self.request.user)
    
    def create(self, request, *args, **kwargs):
        print("Usuário autenticado:", request.user)
        return super().create(request, *args, **kwargs)

class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
