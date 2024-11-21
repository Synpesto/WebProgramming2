import axios from "axios"
import Vue from 'vue'
import vueFlashMessageMin from "vue-flash-message"
import 'vue-flash-message/dist/vue-flash-message.min.css'

Vue.use(vueFlashMessageMin, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
})

const vm = new Vue()
const BASE_URL = "http://localhost:3000/words/"

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error')
    })

export const api = {
    getWord: handleError(async id => {
        const res = await axios.get(BASE_URL + id)
        return res.data
    }),
    getWords: handleError(async () => {
        const res = await axios.get(BASE_URL)
        return res.data
    }),
    deleteWord: handleError(async id => {
        const res = await axios.delete(BASE_URL + id)
        return res.data
    }),
    createWord: handleError(async payload => {
        const res = await axios.post(BASE_URL, payload)
        return res.data
    }),
    updateWord: handleError(async payload => {
        console.log(payload._id)
        const res = await axios.put(BASE_URL + payload._id, payload)
        return res.data
    })
}
