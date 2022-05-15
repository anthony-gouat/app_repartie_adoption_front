<template>
  <div style="padding: 10px">
    <v-row>
      <v-col
          v-for="(animal,idx) in animauxFiltre"
          :key="idx"
          class="d-flex child-flex"
          cols="4"
      >
        <v-card @click="$router.push({name:'Animal',params:{id:animal.idAnimal}})">
          <v-img
              v-if="animal.images[0]"
              :src="animal.images[0].lien"
              aspect-ratio="1"
              class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
              >
                <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-img v-if="animal.adopter" :src="svgadopte" width="30%"></v-img>
          </v-img>
          <v-img
              v-else
              src="#"
              aspect-ratio="1"
              class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
              >
                <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-img v-if="animal.adopter" :src="svgadopte" width="30%"></v-img>
          </v-img>
          <v-col style="margin: 0;padding:10px">
            <v-row style="margin: 0;padding:0">
              Animal : {{animal.type}}
            </v-row>
            <v-row style="margin: 0;padding:0">
              Nom : {{animal.nomAnimal}}
            </v-row>
            <v-row style="margin: 0;padding:0">
              Age : {{animal.age}} {{animal.age>1?'ans':'an'}}
            </v-row>
            <v-row style="margin: 0;padding:0">
              Race : {{animal.race}}
            </v-row>
          </v-col>
        </v-card>

      </v-col>
    </v-row>
    <v-btn v-if="getUtilisateur && getUtilisateur.role==='Administrateur'" fab  style="position: fixed;right: 25px;bottom: 25px;" @click="$router.push({name:'Ajout'})">
      <v-icon large color="green lighten-2">
        mdi-plus
      </v-icon>
    </v-btn>


    <v-dialog v-if="getUtilisateur && getUtilisateur.role!=='Administrateur'"
              v-model="dialogAdopte"
              persistent
              max-width="650"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab  style="position: fixed;right: 25px;bottom: 25px;"
               v-bind="attrs"
               v-on="on"
        >
          <v-icon color="green lighten-2">
            mdi-paw
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Adopter un animal
        </v-card-title>
        <v-card-text>
          *obligatoire
          <v-col>
            <v-row style="margin: 0;padding:0;">
              <h2>Type d'animal*</h2>
            </v-row>
            <v-row style="margin: 0;padding:0;">
              <v-combobox
                  v-model="animalAdopte.type"
                  :items="types"
                  :error-messages="animalAdopte.type.length>0?'':'Veuillez choisir une race pour l\'animal'"

              >
              </v-combobox>
            </v-row>
            <v-row style="margin: 0;padding:0;">
              <h2>Race</h2>
            </v-row>
            <v-row style="margin: 0;padding:0;">
              <v-text-field
                  v-model="animalAdopte.race"
                  :error-messages="(new RegExp(/^[a-zA-Z-]+( [a-zA-Z-]+)*$|^$/).test(animalAdopte.race))?'':'Veuillez choisir une race pour l\'animal'"
              >
              </v-text-field>
            </v-row>
            <v-row style="margin: 0;padding:0;">
              <h2>Age</h2>
            </v-row>
            <v-row style="margin: 0;padding:0;">
              <v-text-field
                  v-model="animalAdopte.age"
                  :error-messages="(new RegExp(/^[0-9]+$|^$/).test(animalAdopte.age))?'':'Doit être un nombre'"
              >
              </v-text-field>
            </v-row>
            <v-row style="margin: 0;padding:0;">
              <h2>Couleurs</h2>
            </v-row>
            <v-row style="margin: 0;padding:0;">
              <v-combobox
                  v-model="animalAdopte.couleur"
                  :items="couleurs"
                  multiple
              ></v-combobox>
            </v-row>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1"
              text
              @click="dialogAdopte = false;animalAdopte.age=0;
                animalAdopte.race='';
                animalAdopte.type='';
                animalAdopte.couleur=[];"
          >
            Annuler
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="demandeAdoption()"
          >
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-btn v-if="!getUtilisateur" fab  style="position: fixed;right: 25px;bottom: 25px;" @click="$router.push({name:'Login',params:{topath:{name:'Carousel'}}})">
      <v-icon large color="green lighten-2">
        mdi-paw
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import * as svgadopte from '../assets/Adopté_Plan de travail 1.svg';
import {mapGetters} from "vuex";
import axios from "axios";
export default {
  name: "carousel",
  data(){
    return{
      svgadopte:svgadopte,
      dialogAdopte:false,
      types:[],
      races:[],
      couleurs:[],
      animalAdopte:{
        age:0,
        race:'',
        type:'',
        couleur:[],
      },
      animauxFiltre:[],
      animaux:[],
      search:'',
      criteres:[],
      tags:[]
    }
  },
  computed:{
    ...mapGetters(['getUtilisateur','getRechercheCarousel','getTagsRecherche','getCriteresRecherche']),
  },
  methods:{
    demandeAdoption:function(){
      this.dialogAdopte = false;
      // TODO
      // enregistrer la demande

      this.animalAdopte.age=0
      this.animalAdopte.race=''
      this.animalAdopte.type=''
      this.animalAdopte.couleur=[]
    },
    getInfos:async function (){
      axios.get('http://127.0.0.1:8855/api/race').then(response=>{
        this.races = response.data
      })
      axios.get('http://127.0.0.1:8855/api/type').then(response=>{
        this.types = response.data
      })
    },
    getAnimaux(){
      let listAnimaux = []
      axios.get('http://127.0.0.1:8855/api/animaux')
      .then(async (response) => {
        let animaux = response.data
        for (const animal of animaux) {
          await axios.get('http://127.0.0.1:8855/api/image/animal/'+animal.idAnimal).then(res => {
            animal['images'] = res.data
          })
          await axios.get('http://127.0.0.1:8855/api/tag/animal/'+animal.idAnimal).then(res => {
            animal['tags'] = res.data
          })
          this.types.forEach(type=>{
            if(type.idType===animal.idType){
              animal['type'] = type.libelleType
            }
          })
          this.races.forEach(race=>{
            if(race.idRace===animal.idRace){
              animal['race'] = race.libelleRace
            }
          })
          listAnimaux.push(animal)
        }
        this.animaux=listAnimaux
        // this.animauxFiltre=this.animaux
        this.animauxFiltre = this.animaux.filter((animal) => this.filtrage(animal)).sort((a,b)=>this.customSort(a,b))

      })
    },
    filtrage:function (animal){
      let resFiltre = false

      if(this.tags.length>0) {
        let tags = this.tags.filter(tag => tag.checked)
        if (tags.length > 0) {
          tags.forEach((tag) => {
            if (animal.tags.length > 0) {
              animal.tags.forEach((atag) => {
                if (tag.nom === atag.libTag) {
                  resFiltre = true
                }
              })
            }
          })
        } else {
          resFiltre = true
        }
      }else {
        resFiltre = true
      }
      if(this.search.length===0){
        return resFiltre
      }
      return resFiltre
    },
    customSort:function(animalA,animalB){
      if(this.search.length===0)return 0;
      console.log(animalA);
      console.log(animalB);
      let scores = [0,0];
      [animalA,animalB].forEach((animal,idx)=>{
        if(this.criteres.length>0){
          let criteres = this.criteres.filter(critere => critere.checked)
          if(criteres.length>0){
            criteres.forEach((critere)=>{
              this.search.split(' ').forEach((s)=>{
                switch (critere.nom){
                  case "race": if(new RegExp(s).test(animal.race)) {
                    scores[idx]+=1;
                  }
                    break;
                  case "type d'animal":if(new RegExp(s).test(animal.type)) {
                    scores[idx]+=1;
                  }
                    break;
                  case "âge":  if(new RegExp(s).test(animal.age)) {
                    scores[idx]+=1;
                  }
                    break;
                }
              })
            })
          }else {
            this.search.split(' ').forEach((s)=>{
              if( (new RegExp(s).test(animal.race)) || (new RegExp(s).test(animal.type)) || (new RegExp(s).test(animal.age)) ){
                scores[idx]+=1;
              }
            })
          }
        }else {
          return 0
        }
      })
      return -(scores[0]-scores[1])%2
    }
  },
  watch:{
    tags: {
      handler() {
        this.animauxFiltre = this.animaux.filter((animal) => this.filtrage(animal))
      },
      deep: true
    },
    criteres: {
      handler() {
        this.animauxFiltre.sort((a,b)=>this.customSort(a,b))
      },
      deep: true
    },
    getTagsRecherche(newVal){
      this.tags=newVal
    },
    getCriteresRecherche(newVal){
      this.criteres=newVal
    },
    getRechercheCarousel(newVal){
      this.search=newVal
      this.animauxFiltre.sort((a,b)=>this.customSort(a,b))
    }
  },
  async created() {
    await this.getInfos();
    this.tags=this.getTagsRecherche;
    this.criteres=this.getCriteresRecherche;
    this.search=this.getRechercheCarousel;
    this.getAnimaux();
  }
}
</script>

<style scoped>

</style>