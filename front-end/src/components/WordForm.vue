<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" placeholder="Enter word..." v-model="localWord.english" /> <!-- mutation-props error -->
    </div>
    
    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" placeholder="Enter word..." v-model="localWord.german" /> <!-- mutation-props error -->
    </div>

    <div v-if="showVietnamese" class="ui labeled input fluid">
      <div class="ui label">
        <i class="vietnam flag"></i> Vietnamese
      </div>
      <input type="text" placeholder="Enter word..." v-model="localWord.vietnamese" />
    </div>
    <button type="button" class="ui button right floated" @click="addVietnamese">Add Vietnamese</button>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'word-form',
  props: {
    word: {
      type: Object,
      required: false,
      default: () => {
        return {
          english: '',
          german: '',
          // vietnamese: ''
        }
      }
    }
  },
  data() {
    return {
      // localWord: { ...this.word }, // create a local copy of the word prop
      localWord: this.word , // create a local copy of the word prop
      errorsPresent: false,
      showVietnamese: false,
    };
  },
  methods: {
    onSubmit: function() {
    //   console.log(`English: ${this.localWord.english}`);
    //   console.log(`German: ${this.localWord.german}`);

        if (this.localWord.english === '' || this.localWord.german === '' || this.localWord.vietnamese === '') {
            this.errorsPresent = true;
            } else {
            this.errorsPresent = false;
            this.$emit('createOrUpdate', this.localWord)
            }
        },
    addVietnamese() {
      this.showVietnamese = !this.showVietnamese;
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>