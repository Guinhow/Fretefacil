from rest_framework import serializers
from .models import SolicitacaoServico
from django.contrib.auth.models import User
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'user_type']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            user_type=validated_data['user_type']
        )
        return user

class SolicitacaoServicoSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), required=False)
    cliente_nome = serializers.CharField(source='cliente.username', read_only=True)

    class Meta:
        model = SolicitacaoServico
        fields = '__all__'

    def create(self, validated_data):
            # Pegando a distância e valor do frontend
        distancia = validated_data.get('distancia')
        valor = validated_data.get('valor')

            # Caso o valor não tenha sido passado, calculamos com base na distância
        if not valor and distancia:
            valor = round(10 + (float(distancia) * 1.5), 2)

            # Criando a solicitação com o valor calculado
        return SolicitacaoServico.objects.create(valor=valor, **validated_data)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user