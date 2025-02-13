from rest_framework import serializers
from .models import SolicitacaoServico
from django.contrib.auth.models import User

class SolicitacaoServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitacaoServico
        fields = '__all__'
        extra_kwargs = {
            'cliente': {'read_only': True},
        }

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user