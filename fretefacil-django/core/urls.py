# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ( SolicitacaoServicoViewSet , UserCreateAPIView )
# from .views import RegisterUserView
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterUserView,
    SolicitacaoServicoViewSet,
    UserCreateAPIView,
    CustomTokenObtainPairView
)

router = DefaultRouter()
router.register(r'solicitacoes', SolicitacaoServicoViewSet)

# urlpatterns = [
#     path('api/', include(router.urls)),
#     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     # path('api/register/', UserCreateAPIView.as_view(), name='user_register'),
#     path('api/register/', RegisterUserView.as_view(), name='register'),

# ]

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterUserView.as_view(), name='register'),
]