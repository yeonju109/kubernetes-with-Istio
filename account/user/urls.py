from django.urls import path
from .views import  UserLoginView, UserLogoutView, UserAPIView, UserAPIViewParam
urlpatterns = [
    path('user/<int:pk>', UserAPIViewParam.as_view(), name='api_v1_user_api'),
    path('user', UserAPIView.as_view(), name='api_v1_user_create'),
    path('user/login', UserLoginView.as_view(), name='api_v1_user_login'),
    path('user/logout', UserLogoutView.as_view(), name='api_v1_user_logout'),
    
    
    
]