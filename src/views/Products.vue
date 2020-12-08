<template>
  <div class="Products">
    <h2>Products</h2>
    <div class="Products__container my-8 w-2/3 mx-auto">
      <load-more
        :limit="1"
        :url="url"
        is-route-synced
      >
        <items-list
          :items="items"
          slot-scope="{ items }"
        />
      </load-more>
    </div>
  </div>
</template>

<script>
import ItemsList from '../components/ProductList'
import LoadMore from '../components/LoadMore'

/**
 * @module Products
 */
export default {
  name: 'Products',
  components: { LoadMore, ItemsList },
  computed: {
    url () {
      const query = this.$route.query.q ? `?q=${this.$route.query.q}` : ''
      return `products` + query
    }
  }
}
</script>
