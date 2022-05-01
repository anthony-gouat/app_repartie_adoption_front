<template>
  <div style="padding: 10px">
    <v-row>
      {{tags}}
      {{criteres}}
      {{search.split(' ')}}
      <v-col
          v-for="(animal,idx) in animauxFiltre"
          :key="idx"
          class="d-flex child-flex"
          cols="4"
      >
        <v-card @click="$router.push({name:'Animal',params:{id:animal.id}})">
          <v-img
              :src="animal.images[0]"
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
            <v-img v-if="animal.adopte" :src="svgadopte" width="30%"></v-img>
          </v-img>
          <v-col style="margin: 0;padding:10px">
            <v-row style="margin: 0;padding:0">
              Animal : {{animal.type}}
            </v-row>
            <v-row style="margin: 0;padding:0">
              Nom : {{animal.nom}}
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
    <v-btn v-if="getUtilisateur && getUtilisateur.role==='admin'" fab  style="position: fixed;right: 25px;bottom: 25px;" @click="$router.push({name:'Ajout'})">
      <v-icon large color="green lighten-2">
        mdi-plus
      </v-icon>
    </v-btn>


    <v-dialog v-if="getUtilisateur && getUtilisateur.role!=='admin'"
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
export default {
  name: "carousel",
  data(){
    return{
      svgadopte:svgadopte,
      dialogAdopte:false,
      types:[
        "chat",
        "chien",
        "lapin",
        "oiseau",
      ],
      couleurs:[
        "vert",
        "gris",
        "bleu",
        "brun",
        "noir",
        "blanc"
      ],
      animalAdopte:{
        age:0,
        race:'',
        type:'',
        couleur:[],
      },
      animauxFiltre:[],
      animaux:[
        {
          id:1,
          nom:'chien1',
          age:1,
          race:'chepa',
          type:'chien',
          couleur:['vert','gris'],
          tag:['tropical'],
          images:[
            'https://picsum.photos/500/300?image=18',
            'https://picsum.photos/500/300?image=15'
          ],
          adopte:false
        },
        {
          id:2,
          nom:'chat2',
          age:5,
          race:'chepa',
          type:'chat',
          couleur:['gris'],
          tag:[],
          images:['https://picsum.photos/500/300?image=15'],
          adopte:true
        },
        {
          id:3,
          nom:'chien3',
          age:10,
          race:'chepa',
          type:'chien',
          couleur:['bleu','gris'],
          tag:[],
          images:['https://picsum.photos/500/300?image=43'],
          adopte:false
        },
        {
          id:4,
          nom:'chien4',
          age:10,
          race:'chepa',
          type:'chien',
          couleur:['brun'],
          tag:['tropical'],
          images:['https://picsum.photos/500/300?image=78'],
          adopte:false
        },
        {
          id:5,
          nom:'chien5',
          age:12,
          race:'chepa',
          type:'chien',
          couleur:['brun','gris'],
          tag:[],
          images:['https://picsum.photos/500/300?image=105'],
          adopte:false
        }
      ],
      search:'',
      criteres:[],
      tags:[]
    }
  },
  computed:{
    ...mapGetters(['getUtilisateur']),
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
    filtrage:function (animal){
      let resFiltre = false
      if(this.tags.length>0){
        this.tags.forEach((tag)=>{
          if(animal.tag.length>0){
            animal.tag.forEach((atag)=>{
              if(tag===atag){
                console.log(animal.id)
                resFiltre = true
              }
            })
          }
        })
      }else{
        resFiltre = true
      }

      let resCritere = false
      if(this.criteres.length>0){
        this.criteres.forEach((critere)=>{
          this.search.split(' ').forEach((s)=>{
            switch (critere){
              case "race": if(new RegExp(s).test(animal.race)) {
                resCritere = true
              }
                break;
              case "type d'animal":if(new RegExp(s).test(animal.type)) {
                resCritere = true
              }
                break;
              case "couleur":  if(new RegExp(s).test(animal.couleur)) {
                resCritere = true
              }
                break;
              case "âge":  if(new RegExp(s).test(animal.age)) {
                resCritere = true
              }
                break;
            }
          })
        })
      }else{
        this.search.split(' ').forEach((s)=>{
          if( (new RegExp(s).test(animal.race)) || (new RegExp(s).test(animal.type)) || (new RegExp(s).test(animal.couleur)) || (new RegExp(s).test(animal.age)) ){
            resCritere = true
          }
        })
      }
      if(this.search.length===0){
        return resFiltre
      }
      return resFiltre && resCritere
    }
  },
  created() {
    this.$watch(
        () => this.$route.query,
        (toParams) => {
          let search = toParams.search
          if(search){
            this.search=search
          }
          this.animauxFiltre=this.animaux.filter((animal) => this.filtrage(animal))

        }
    )
    this.$watch(
        () => this.$route.params,
        (toParams) => {
          let criteres = toParams.criteres
          if(criteres){
            this.criteres=criteres
          }
          let tags = toParams.tags
          if(tags){
            this.tags=tags
          }
          this.animauxFiltre=this.animaux.filter((animal) => this.filtrage(animal))

        }
    )
    let search = this.$route.query.search
    if(search){
      this.search=search
    }
    let criteres = this.$route.params.criteres
    if(criteres){
      this.criteres=criteres
    }
    let tags = this.$route.params.tags
    if(tags){
      this.tags=tags
    }

    this.animauxFiltre=this.animaux.filter((animal) => this.filtrage(animal))
  }
}
</script>

<style scoped>

</style>