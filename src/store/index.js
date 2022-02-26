import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    utilisateur:undefined
  },
  getters:{
    getUtilisateur(state){
      return state.utilisateur;
    },
  },
  mutations: {
    setUtilisateur(state,val){
      state.utilisateur=val
    },
  },
  actions: {
  },
  modules: {
  }
})
