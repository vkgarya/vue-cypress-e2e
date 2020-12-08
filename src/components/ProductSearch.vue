<template>
  <form @submit.prevent="search" class="ProductSearch">
    <input type="text" v-model="query" placeholder="Find Products" data-testid="productSearchInput">
    <button type="submit" class="hidden">Search</button>
  </form>
</template>

<script>
/**
 * @module ProductSearch
 */
export default {
  name: 'ProductSearch',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    search () {
      this.$router.push({
        name: 'productList',
        query: {
          q: this.query
        }
      })
    }
  }
}
</script>
