<template>
  <div class="Product">
    <a
      href="#"
      data-testid="goBackButton"
      @click.prevent="$router.go(-1)"
    >
      Go Back
    </a>
    <transition mode="out-in" name="fade">
      <div class="Product__content flex mt-32" v-if="!isLoading">
        <div class="Product__image px-4 mb-4 w-1/3" v-if="product.image">
          <img data-testid="productImage" :src="product.image" class="shadow" alt="">
        </div>
        <div class="w-2/3 text-left px-4">
          <div data-testid="productName" class="Product__name mb-4 text-3xl">
            <span class="font-bold">Name:</span> {{ product.name }}
          </div>
          <div data-testid="productSeller" class="Product__seller text-grey uppercase text-sm mb-4">
            <span class="font-bold">Seller:</span> {{ product.seller }}
          </div>
          <div class="Product__rating mb-4">
            <span class="font-bold text-grey mr-2">Rating:</span>
            <span data-testid="productRating">{{ product.rating }}</span> / 5
          </div>
          <div class="Product__body" data-testid="productBody">
            {{ product.body }}
          </div>
        </div>
      </div>
      <div class="can-load loading" v-else />
    </transition>
  </div>
</template>

<script>
/**
 * @module Product
 */
export default {
  name: 'Product',

  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      isLoading: false,
      product: {
        name: null,
        seller: null,
        rating: 0,
        image: ''
      }
    }
  },

  mounted () {
    this.fetchProduct()
  },

  methods: {
    fetchProduct () {
      this.isLoading = true
      this.$api.get(`products/${this.id}`)
        .then((response) => {
          this.product = response.data
        })
        .catch((error) => {
          this.$notify.error(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
