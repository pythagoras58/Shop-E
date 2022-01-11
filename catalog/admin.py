from django.contrib import admin
from .models import Item, Order, OrderItem, ItemVariation, Variation


class ItemAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title', )}
    list_display = [
        'title',
        'price',
        'discount_price'
    ]


class ItemVariationAdmin(admin.ModelAdmin):
    list_display = [
        'variation',
        'value',
        'attachment'
    ]
    search_fields = ['value']
    list_filter = ['variation', 'variation__item']


class ItemVariationInlineAdmin(admin.TabularInline):
    model = ItemVariation
    extra = 1


class VariationAdmin(admin.ModelAdmin):
    list_display = [
        'item',
        'name',
    ]
    search_fields = ['item']
    list_filter = ['name']
    inlines = [ItemVariationInlineAdmin]


admin.site.register(ItemVariation, ItemVariationAdmin)
admin.site.register(Variation, VariationAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Order)
admin.site.register(OrderItem)
