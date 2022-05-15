import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    utilisateur:undefined,
    rechercheCarousel:'',
    tagsRecherche:{},
    criteresRecherche:{},
  },
  getters:{
    getUtilisateur(state){
      return state.utilisateur;
    },
    getRechercheCarousel(state){
      return state.rechercheCarousel;
    },
    getTagsRecherche(state){
      return state.tagsRecherche;
    },
    getCriteresRecherche(state){
      return state.criteresRecherche;
    },
  },
  mutations: {
    setUtilisateur(state,val){
      state.utilisateur=val
    },
    setRechercheCarousel(state,val){
      state.rechercheCarousel=val
    },
    setTagsRecherche(state,val){
      state.tagsRecherche=val
    },
    setCriteresRecherche(state,val){
      state.criteresRecherche=val
    },
  },
  actions: {
  },
  modules: {
  }
})
