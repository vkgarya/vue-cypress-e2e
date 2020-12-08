<template>
  <div class="RegisterProduct">
    <form @submit.prevent="submit" class="w-2/3 mx-auto">
      <form-wrapper :validator="$v.form">
        <div class="-mx-4">
          <div class="flex">
            <form-group class="w-1/2 px-4" name="name">
              <input
                  slot-scope="{ attrs, events }"
                  v-bind="attrs"
                  v-on="events"
              >
            </form-group>
            <form-group class="w-1/2 px-4" name="seller">
              <input
                  slot-scope="{ attrs, events }"
                  v-bind="attrs"
                  v-on="events"
              >
            </form-group>
          </div>
          <div class="flex">
            <form-group class="w-1/2 px-4" name="image">
              <input
                  slot-scope="{ attrs, events }"
                  v-bind="attrs"
                  v-on="events"
              >
            </form-group>
            <form-group class="w-1/2 px-4" name="rating">
              <div
                  slot="label"
                  slot-scope="{ model, attribute }"
              >
                {{ attribute }}: {{ model }} / 5
              </div>
              <input
                  min="0"
                  max="5"
                  step="1"
                  type="range"
                  v-on="events"
                  v-bind="attrs"
                  slot-scope="{ attrs, events }"
              >
            </form-group>
          </div>
          <form-group class="w-full px-4" name="body">
            <textarea
                cols="30"
                rows="10"
                v-on="events"
                v-bind="attrs"
                slot-scope="{ attrs, events }"
            />
          </form-group>
        </div>
        <div class="text-right">
          <button data-testid="submit" class="button" type="submit">
            Save product
          </button>
        </div>
      </form-wrapper>
    </form>
  </div>
</template>

<script>
import { required, numeric, url } from 'vuelidate/lib/validators'

function productForm () {
  return {
    name: '',
    seller: '',
    image: '',
    rating: 0,
    body: ''
  }
}

/**
 * @module RegisterProduct
 */
export default {
  name: 'RegisterProduct',
  data () {
    return {
      form: productForm()
    }
  },
  validations: {
    form: {
      name: { required },
      seller: { required },
      image: { url },
      rating: { numeric },
      body: {}
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) return
      this.$api.post('products', this.form)
        .then((response) => {
          const data = response.data
          this.$notify.confirm(`${data.name} saved successfully. Do you want to check it out?`)
            .then((yes) => {
              if (yes.value) this.$router.push({ name: 'product', params: { id: data.id } })
            })
          this.form = productForm()
          this.$v.form.$reset()
        })
        .catch((e) => {
          this.$notify.error(e)
        })
    }
  }
}
</script>
