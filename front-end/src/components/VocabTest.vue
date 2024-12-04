<template>
  <div>
    <select id="form-selector" v-model="selectedForm">
      <option value="" selected disabled>Choose one !</option>
      <option value="E_and_G">English and German</option>
      <option value="E_and_V">English and Vietnamese</option>
      <option value="G_and_V">German and Vietnamese</option>
      <option value="AllLang">All three languages</option>
    </select>
    <div id="my-test">
      <form v-if="selectedForm === 'E_and_G'" action="#" @submit.prevent="onSubmit" name="E_and_G">
        <h2>Score: {{ score }} out of {{ words.length }}</h2>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="germany flag"></i> German
          </div>
          <input type="text" readonly :disabled="testOver" :value="currWord.german"/>
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="united kingdom flag"></i> English
          </div>
          <input type="text" placeholder="Enter word..." v-model="english" :disabled="testOver" autocomplete="off" />
        </div>
        <button class="positive ui button" :disabled="testOver">Submit</button>
      </form>

      <form v-if="selectedForm === 'E_and_V' && allVietnameseWordsEntered" action="#" @submit.prevent="onSubmitForE_V" name="E_and_V">
        <h2>Score: {{ score }} out of {{ words.length }}</h2>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="united kingdom flag"></i> English
          </div>
          <input type="text" readonly :disabled="testOver" :value="currWord.english"/>
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="vietnam flag"></i> Vietnamese
          </div>
          <input type="text" placeholder="Enter word..." v-model="vietnamese" :disabled="testOver" autocomplete="off" />
        </div>
        <button class="positive ui button" :disabled="testOver">Submit</button>
      </form>

      <form v-if="selectedForm === 'G_and_V' && allVietnameseWordsEntered" action="#" @submit.prevent="onSubmitForG_V" name="G_and_V">
        <h2>Score: {{ score }} out of {{ words.length }}</h2>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="germany flag"></i> German
          </div>
          <input type="text" readonly :disabled="testOver" :value="currWord.german"/>
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="vietnam flag"></i> Vietnamese
          </div>
          <input type="text" placeholder="Enter word..." v-model="vietnamese" :disabled="testOver" autocomplete="off" />
        </div>
        <button class="positive ui button" :disabled="testOver">Submit</button>
      </form>

      <form v-if="selectedForm === 'AllLang' && allVietnameseWordsEntered" action="#" @submit.prevent="onSubmitAll" name="AllLang">
        <h2>Score: {{ score }} out of {{ words.length }}</h2>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="germany flag"></i> German
          </div>
          <input type="text" readonly :disabled="testOver" :value="currWord.german"/>
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="united kingdom flag"></i> English
          </div>
          <input type="text" placeholder="Enter word..." v-model="english" :disabled="testOver" autocomplete="off" />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="vietnam flag"></i> Vietnamese
          </div>
          <input type="text" placeholder="Enter word..." v-model="vietnamese" :disabled="testOver" autocomplete="off" />
        </div>
        <button class="positive ui button" :disabled="testOver">Submit</button>
      </form>

      <p :class="['results', resultClass]">
        <span v-html="result"></span>
      </p>

      <p v-if="selectedForm === 'AllLang' && !allVietnameseWordsEntered">
        You need to enter all words from each language to begin the test
      </p>
      <p v-if="selectedForm === 'E_and_V' && !allVietnameseWordsEntered">
        You need to enter all words from each language to begin the test
      </p>
      <p v-if="selectedForm === 'G_and_V' && !allVietnameseWordsEntered">
        You need to enter all words from each language to begin the test
      </p>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: 'vocab-test',
    props: {
      words: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        randWords: [...this.words.sort(() => 0.5 - Math.random())],
        incorrectGuesses: [],
        result: '',
        resultClass: '',
        english: '',
        vietnamese: '',
        score: 0,
        testOver: false,
        selectedForm: ''
      };
    },
    computed: {
      currWord: function() {
        return this.randWords.length ? this.randWords[0] : '';
      },
      allVietnameseWordsEntered() {
        return this.words.every(word => word.vietnamese);
      }
    },
    methods: {
      onSubmit: function() {
        if (this.english === this.currWord.english) {
          this.flash('Correct!', 'success', { timeout: 1000 });
          this.score += 1;
        } else {
          this.flash('Wrong!', 'error', { timeout: 1000 });
          this.incorrectGuesses.push(this.currWord.german);
        }
  
        this.english = '';
        this.randWords.shift();
  
        if (this.randWords.length === 0) {
          this.testOver = true;
          this.displayResults();
        }
      },
      
      onSubmitForG_V: function() {
        if (this.vietnamese === this.currWord.vietnamese) {
          this.flash('Correct!', 'success', { timeout: 1000 });
          this.score += 1;
        } else {
          this.flash('Wrong!', 'error', { timeout: 1000 });
          this.incorrectGuesses.push(this.currWord.german);
        }
  
        this.vietnamese = '';
        this.randWords.shift();
  
        if (this.randWords.length === 0) {
          this.testOver = true;
          this.displayResults();
        }
      },

      onSubmitForE_V: function() {
        if (this.vietnamese === this.currWord.vietnamese) {
          this.flash('Correct!', 'success', { timeout: 1000 });
          this.score += 1;
        } else {
          this.flash('Wrong!', 'error', { timeout: 1000 });
          this.incorrectGuesses.push(this.currWord.english);
        }
  
        this.vietnamese = '';
        this.randWords.shift();
  
        if (this.randWords.length === 0) {
          this.testOver = true;
          this.displayResults();
        }
      },

      onSubmitAll: function() {
        if (this.english === this.currWord.english && this.vietnamese === this.currWord.vietnamese) {
          this.flash('Correct!', 'success', { timeout: 1000 });
          this.score += 1;
        } else {
          this.flash('Wrong!', 'error', { timeout: 1000 });
          this.incorrectGuesses.push(this.currWord.german);
        }
  
        this.english = ''
        this.vietnamese = ''
        this.randWords.shift()
  
        if (this.randWords.length === 0) {
          this.testOver = true;
          this.displayResults();
        }
      },
      displayResults: function() {
        if (this.incorrectGuesses.length === 0) {
          this.result = 'You got everything correct. Well done!';
          this.resultClass = 'success';
        } else {
          const incorrect = this.incorrectGuesses.join(', ');
          this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
          this.resultClass = 'error';
        }
      }
    },
    mounted() {
    const myForms = document.getElementById('my-test');
    document.getElementById('form-selector').oninput = ev => {
      myForms.className = `f-${ev.target.value}`;
    }
  }
}
</script>
  
  <style scoped>
  .results {
    margin: 25px auto;
    padding: 15px;
    border-radius: 5px;
  }
  
  .error {
    border: 1px solid #ebccd1;
    color: #a94442;
    background-color: #f2dede;
  }
  
  .success {
    border: 1px solid #d6e9c6;
    color: #3c763d;
    background-color: #dff0d8;
  }
  </style>