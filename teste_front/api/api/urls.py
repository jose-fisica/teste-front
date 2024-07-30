from django.contrib import admin
from django.urls import include, path



urlpatterns = [
    path('admin/', admin.site.urls),
    path('pessoa/', include('pessoa.urls')),
    path('projeto/', include('projeto.urls')),
]
