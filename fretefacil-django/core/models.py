from django.db import models
from django.contrib.auth.models import User

class SolicitacaoServico(models.Model):
    cliente = models.ForeignKey(User, on_delete=models.CASCADE)
    origem = models.CharField(max_length=255)
    destino = models.CharField(max_length=255)
    data = models.DateField()
    hora = models.TimeField()
    descricao = models.TextField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Solicitação de {self.cliente.username} de {self.origem} para {self.destino}"
