from rest_framework import serializers
from catalog.models import Order, Item, OrderItem, ItemVariation, Variation


class ItemSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = [
            'id',
            'title',
            'price',
            'discount_price',
            'slug',
            'status',
            'category',
            'label',
            'description',
            'image',
        ]

    def get_category(self, obj):
        return obj.get_category_display()


class VariationDetailSerializer(serializers.ModelSerializer):
    item_variations = serializers.SerializerMethodField()

    class Meta:
        model = Variation
        fields = [
            'id',
            'name',
            'item_variations'
        ]

    def get_item_variations(self, obj):
        return ItemVariationDetailSerializer(obj.itemvariation_set.all(), many=True).data


class ItemVariationDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariation
        fields = [
            'id',
            'variation',
            'value',
            'attachment'
        ]


class ItemDetailSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    variations = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = [
            'id',
            'title',
            'price',
            'discount_price',
            'slug',
            'status',
            'category',
            'label',
            'description',
            'image',
            'variations'
        ]

    def get_category(self, obj):
        return obj.get_category_display()

    def get_variations(self, obj):
        return VariationDetailSerializer(obj.variation_set.all(), many=True).data


class VariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variation
        fields = [
            'id',
            'name',
        ]


class ItemVariationSerializer(serializers.ModelSerializer):
    variation = serializers.SerializerMethodField()

    class Meta:
        model = ItemVariation
        fields = [
            'id',
            'variation',
            'value',
            'attachment'
        ]

    def get_variation(self, obj):
        return VariationSerializer(obj.variation, many=True).data


class OrderItemSerializer(serializers.ModelSerializer):
    item_variations = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            'id',
            'item',
            'item_variations',
            'quantity'
        ]

    def get_item_variations(self, obj):
        return ItemVariationSerializer(obj.item_variations.all(), many=True).data
