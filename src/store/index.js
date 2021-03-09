import { createStore } from 'vuex'

import images from './modules/images.js'
import settings from './modules/settings.js'

const store = createStore({
    state() {
        return {
            previousPage: null,
        }
    },
    mutations: {
        setPreviousPage(state, payload) {
            state.previousPage = payload
        },
    },
    actions: {
        setPreviousPage({ state, commit }, value) {
            commit('setPreviousPage', value)
            console.log('setPreviousPage called', state.previousPage)
        },
    },
    modules: {
        images,
        settings,
    },
})

export default store
