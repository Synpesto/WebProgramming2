<template>
    <div>
        <h1>Words</h1>
        <div class="ui icon input">
            <input type="text" v-model="keyword" placeholder="Search...">
            <i class="search icon"></i>
        </div>
        
        <table id="words" class= "ui celled compact table">
            <thead>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th>Vietnamese</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <!-- <tr v-for="(word,i) in words" :key="i"> -->
            <tr v-for="word in filteredWords" :key="word._id">
                <td> {{ word.english }}</td>
                <td> {{ word.german }}</td>
                <td v-if="word.vietnamese"> {{ word.vietnamese }}</td>
                <td v-if="!word.vietnamese" style="color: red;">You haven't add vietnamese</td>
                <td width="75" class="center aligned">
                    <router-link :to="{ name: 'show', params: { id: word._id }}">Show</router-link></td>
                <td width="75" class="center aligned">
                    <router-link :to="{ name: 'edit', params: { id: word._id }}">Edit</router-link></td>
                <td width="75" class="center aligned" @click.prevent="onDelete(word._id)">
                    <a style="color: red" :href="`/words/${word._id}`">Delete</a></td>
            </tr>
        </table>
    </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
    name: 'MyWords',
    data() {
        return {
            words: [],
            keyword: '', // Changed to a string
        }
    },
    methods: {
        async onDelete(id) {
            const sure = window.confirm('Are you sure you want to delete this word?')
            if (!sure) return
            await api.deleteWord(id)
            this.flash('Word deleted successfully', 'success')
            const newWords = this.words.filter(word => word._id !== id)
            this.words = newWords
        }
    },
    computed: {
        filteredWords() {
        return this.words.filter((word) => {
            const searchKeyword = this.keyword.toLowerCase();
            return (
                word.english.toLowerCase().includes(searchKeyword) ||
                word.german.toLowerCase().includes(searchKeyword) ||
                word.vietnamese.toLowerCase().includes(searchKeyword)
            )
        })
        }
    },
    async mounted() {
        this.words = await api.getWords();
    }
}
</script>