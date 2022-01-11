from django.urls import path
from .views import ItemListView, ItemDetailView, AddToCartView

urlpatterns = [
    path('product-list/', ItemListView.as_view(), name='product-list'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('product/<pk>/', ItemDetailView.as_view(), name='product-detail')
]
