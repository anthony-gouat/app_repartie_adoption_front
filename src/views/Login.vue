<template>
  <div id="login" style="margin-top: 50px">

    <!--        Formulaire de connexion        -->
    <v-form v-on:submit.prevent="true">
      <v-container style="padding-bottom: 0px !important;">
        <v-col cols="auto" sm="6"  style="margin:auto !important;width: 400px;padding-bottom: 0px !important;">
          <v-row justify="center" style="display: grid;">
            <h1 style="text-align: center">Éspace de connexion</h1>
          </v-row>

          <v-row justify="center">
<!--            Si il y a une erreur de connexion     -->
            <v-alert :value="(loginError.length>0)"
                     color="red"
                     type="error"
                     style="width: 100%">
              {{loginError}}
              <v-btn style="margin-left: 10px"
                     @click="() => (loginError='')"
                     :icon=true>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-alert>

          </v-row>
          <v-row justify="center">
<!--            Identifiant       -->
            <v-text-field
                v-model="loginForm.login"
                placeholder="Identifiant"
                autocomplete="login"
                type="login"
                id="login1"
            ></v-text-field>
          </v-row>
          <v-row justify="center">

<!--            Mot de passe      -->
            <v-text-field
                class="v-text-field"
                v-model.trim="loginForm.mdp"
                placeholder="Mot de passe"
                autocomplete="current-password"
                :append-icon="showLog ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (showLog = !showLog)"
                :type="showLog ? 'password' : 'text'"
                id="password1"
                style="margin-bottom: 45px;"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-col cols="auto" sm="9" style="margin:auto !important;display: inline-grid;padding: 0;">
              <v-btn @click="login()" >Connexion</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import axios from "axios";
import router from "@/router";

export default {
  name: "Login",
  data(){
    return{
      showLog: true, // affiche en clair le mdp
      loginError: '', // erreur de login
      loginForm: {
        login: '',
        mdp: ''
      },
    }
  },
  computed:{
    ...mapGetters(['getUtilisateur'])
  },
  methods: {
    ...mapMutations(['setUtilisateur']),
    // connexion avec l'api
    login:function() {
      let v = this
      // post sur l'adresse de l'API d'authentification
      axios.post('', {
            Identifiant: this.loginForm.login,
            MotDePasse: this.loginForm.mdp
          }
      )
          .then(function (response) {
            if(response.status===200){ // si il n'y a pas d'erreur
              v.setUtilisateur(response.data) // on initialise l'utilisateur
              router.push({name:''}) // on va sur la page
            }
          }).catch(function(error) { // si il y a une erreur
        console.log(error)
        alert("Erreur Identifiant/Mot de passe inconnu")
      })
    },
  },
  created() {
    // effectue la connexion si on appuie sur entrer
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' && this.loginForm.login!=='' && this.loginForm.mdp!=='') {
        this.login()
      }
    });
  }
}
</script>

<style scoped>

</style>