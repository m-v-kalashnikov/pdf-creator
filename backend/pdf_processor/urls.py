from django.urls import path

from .views import pdf_processor

app_name = 'pdf_processor_app'

urlpatterns = [
    path('pdf/', pdf_processor)
]
