<template>
  <div class="ProductListItem mb-8 border-b border-grey pb-4">
    <router-link :to="{ name: 'product', params: { id: item.id } }" class="block">
      <div class="mb-4 sh" v-if="item.image">
        <img data-testid="productListItemImage" :src="item.image" class="h-64 shadow" alt="">
      </div>
      <h2 data-testid="productListItemName">{{ item.name }}</h2>
      <small data-testid="productListItemSeller">{{ item.seller }}</small>
    </router-link>
  </div>
</template>

<script>

/**
 * @module ProductListItem
 */
export default {
  name: 'ProductListItem',

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
