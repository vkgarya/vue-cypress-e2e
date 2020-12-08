<template>
  <div class="ProductList">
    <product-list-item
        v-for="item in items"
        :key="item.id"
        :item="item"
    />
  </div>
</template>

<script>
import ProductListItem from './ProductListItem'

/**
 * @module ProductList
 */
export default {
  name: 'ProductList',
  components: { ProductListItem },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
