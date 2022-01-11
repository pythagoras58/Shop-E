from django.shortcuts import get_object_or_404
from django.utils import timezone
from .serializers import ItemSerializer, ItemDetailSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.permissions import IsAuthenticated, AllowAny
from catalog.models import Order, Item, OrderItem, ItemVariation, Variation


class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class ItemDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemDetailSerializer
    queryset = Item.objects.all()


class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            slug = request.data.get('slug', None)
            variations = request.data.get('variations', [])
            print(variations)
            if slug is None:
                return Response({"message": "Invalid data"}, status=HTTP_400_BAD_REQUEST)

            item = get_object_or_404(Item, slug=slug)

            min_var_count = Variation.objects.filter(item=item).count()
            if len(variations) < min_var_count:
                return Response({"message": "Specify the variations"}, status=HTTP_400_BAD_REQUEST)

            order_item_qs = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False,
            )
            for v in variations:
                order_item_qs = order_item_qs.filter(item_variations__exact=v)

            if order_item_qs.exists():
                order_item = order_item_qs.first()
                order_item.quantity += 1
                order_item.save()
            else:
                order_item = OrderItem.objects.create(
                    item=item,
                    user=request.user,
                    ordered=False,
                )
                order_item.item_variations.add(*variations)
                order_item.save()

            order_qs = Order.objects.filter(user=request.user, ordered=False)
            if order_qs.exists():
                order = order_qs[0]
                if not order.items.filter(item__id=order_item.id).exists():
                    order.items.add(order_item)
                    order.save()
                return Response(status=HTTP_200_OK)
            else:
                ordered_date = timezone.now()
                order = Order.objects.create(
                    user=request.user, ordered=False, ordered_date=ordered_date)
                order.items.add(order_item)
                return Response(status=HTTP_200_OK)
        else:
            return Response({"message":"You need to log in to add items to cart"}, status=HTTP_400_BAD_REQUEST)
