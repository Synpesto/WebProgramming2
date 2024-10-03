Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="Name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review" placeholder="Write something miracle"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>
        <label for="recommend">Would you recommend this product?</label> <!-- Task 10 Challenge -->
        <input type="radio" id="recommend" name="recommend" value="yes" v-model="recommend">Yes
        <input type="radio" id="recommend" name="recommend" value="no" v-model="recommend">No
      </p>
      
      <p>
        <input type="submit" value="Submit">  
      </p>
      <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
    
    </form>
    `,
    data(){
        return{
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                  name: this.name,
                  review: this.review,
                  rating: this.rating,
                  recommend: this.recommend // Task 10 Challenge
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
              } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommendation required.") // Task 10 Challenge
              }
            }
}
})

Vue.component('product-details', { // Task 8 Challenge
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `,
})

Vue.component('product', {
    props:{
        premium: {
            type: Boolean,
            required: true,
        },
    },
    template: `
    <div class="product">

      <div class="product-image">
        <img :src="image" :alt="altText" />
      </div>


      <div class="product-info">
        <h1>{{ title }}</h1>
        <!-- <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p> -->
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost out of stock</p>
        <p v-else
        :class="{outOfStock: !inStock}"
        >Out of Stock</p>
        <p>{{saleMessage}}</p> 
        <p>User is premium: {{premium}}</p>
        <p>Shipping: {{shipping}}</p>


        <product-details :details="details"></product-details> <!-- Task 8 Challenge -->

        <div v-for="(variant, index) in variants" 
        :key="variant.variantId" 
        class="color-box"
        :style="{backgroundColor: variant.variantColor}" 
        @mouseover="updateProduct(index)">
        </div>

        <div v-for="size in sizes" :key="size.sizeId">
          <p>{{size.sizeLabel}}</p>
        </div>
      </div>
      <button v-on:click="addToCart" 
      :disabled="!inStock" 
      :class="{ disabledButton: !inStock }"
      >Add to cart</button>

      <button v-on:click="removeFromCart" 
      :disabled="!inStock" 
      :class="{ disabledButton: !inStock }"
      >Remove from cart</button>
    <div>
    <h2>Reviews</h2>
    <p v-if="!reviews.length"> There are no reviews yet.</p>
    <ul>
    <li v-for="review in reviews">
        <p>{{ review.name }} </p>
        <p>Review: {{ review.review }} </p>
        <p>Rating: {{ review.rating }} </p>
    </li>
    </div>
    <product-review @review-submitted="addReview"></product-review>
    </div>
    </div>
    `,
    data(){
        return{
            product: "Socks",
        brand: "Vue Mastery",
        description: "A pair of warm, fuzzy socks",
        altText: "A pair of socks",
        selectedVariant: 0,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Unisex"],
        variants: [
            {
                variantId: 1234,
                variantColor: "green",
                variantImage:"./assets/images/socks_green.jpg",
                variantQuantity: 10,
                onSale: true,
            },

            {
                variantId: 5678,
                variantColor: "blue",
                variantImage:"./assets/images/socks_blue.jpg",
                variantQuantity: 0,
                onSale: false,
            }
        ],
        sizes: [
            {
                sizeId: 1,
                sizeLabel: "S",
            },

            {
                sizeId: 3,
                sizeLabel: "M",
            },

            {
                sizeId: 2,
                sizeLabel: "L",
            }
        ],
        reviews: [],
        }
    },
    methods:{
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart(){  //Task 9 Challenge
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
            // console.log(index)
            this.onSale = this.variants[index].onSale; // Task 7 challenge
        },
        addReview(productReview){
            this.reviews.push(productReview)
        }


    },
    computed:{
        saleMessage() { // Task 7 challenge
            if (this.onSale) {
                return `${this.brand} ${this.product} is on sale!`;
            }
                return `${this.brand} ${this.product} is not on sale.`;
        },

        title(){
            return this.brand + ' ' + this.product
        }
    ,
        image(){
            return this.variants[this.selectedVariant].variantImage
        }
    ,
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        }
    ,
        shipping(){
            if (this.premium){
                return "Free"
            }
            return 2.99
        }
    }
})
var app = new Vue
({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id){ // Task 9 Challenge
            this.cart.pop(id)
        }
    }
})