import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        score: 0,
    },
    mutations: {
        INCREMENT_SCORE(state) {
            state.score++
        }
    },
    actions: {
        incrementScore ({ commit }) {
            commit('INCREMENT_SCORE')
        }        
    },

    getters: {
        getScore: state => {
            return state.score;
        },

    }
})