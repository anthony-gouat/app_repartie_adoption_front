<template>
<div>
  <v-row style="margin: 0;margin-top: 50px" justify="center">
    <v-card width="95%">
      <v-btn v-if="getUtilisateur && getUtilisateur.role==='admin'" elevation="0" color="transparent" style="position:absolute;top:0;right:0;" @click="editMode=!editMode" >
        <v-icon color="green lighten-2" size="30">
          {{editMode?'mdi-close':'mdi-pen'}}
        </v-icon>
      </v-btn>

      <v-row>

        <v-col>
          <v-img
              :src="animalCopy.image"
              class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                  style="margin: 0"
              >
                <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-img v-if="animalCopy.adopte" :src="svgadopte" width="30%"></v-img>
          </v-img>
        </v-col>

        <v-col style="margin: 0;padding:10px;font-size: 25px">
          <div>
            <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
              Animal :
            </v-row>
            <v-row style="margin: 0;padding:0;" v-if="!editMode" justify="center">
              {{animal.type}}
            </v-row>
            <v-row v-else style="margin: auto;padding:0;width: 25%">
              <v-combobox
                v-model="animalCopy.type"
                :items="types"

              >
              </v-combobox>
            </v-row>
          </div>
          <div>
            <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
              Nom :
            </v-row>
            <v-row style="margin: 0;padding:0;" v-if="!editMode" justify="center">
              {{animal.nom}}
            </v-row>
            <v-row v-else style="margin: auto;padding:0;width: 25%">
              <v-text-field
                  v-model="animalCopy.nom"
                  :error-messages="(new RegExp(/^[a-zA-Z\-]+$/).test(animalCopy.nom))?'':'Veuillez choisir un nom pour l\'animal'"
              >
              </v-text-field>
            </v-row>
          </div>
          <div>
            <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
              Age :
            </v-row>
            <v-row style="margin: 0;padding:0;" v-if="!editMode" justify="center">
              {{animal.age}} {{animal.age>1?'ans':'an'}}
            </v-row>
            <v-row v-else style="margin: auto;padding:0;width: 25%">
              <v-text-field
                  v-model="animalCopy.age"
                  :error-messages="(new RegExp(/^[0-9]+$/).test(animalCopy.age))?'':'Doit être un nombre'"
              ></v-text-field>
            </v-row>
          </div>
          <div>
            <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
              Race :
            </v-row>
            <v-row style="margin: 0;padding:0;" v-if="!editMode" justify="center">
              {{animal.race}}
            </v-row>
            <v-row v-else style="margin: auto;padding:0;width: 25%">
              <v-text-field
                  v-model="animalCopy.race"
                  :error-messages="(new RegExp(/^[a-zA-Z\-]+$/).test(animalCopy.race))?'':'Veuillez choisir une race pour l\'animal'"
              ></v-text-field>
            </v-row>
          </div>
          <div>
            <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
              {{ animal.couleur.length>1?'Couleurs':'Couleur'}} :
            </v-row>
            <v-row style="margin: 0;padding:0;" v-if="!editMode" justify="center">
              {{ getCouleursAnimal() }}
            </v-row>
            <v-row v-else style="margin: auto;padding:0;width: 25%">
              <v-combobox
                  v-model="animalCopy.couleur"
                  :items="couleurs"
                  multiple
                  :error-messages="(animalCopy.couleur.length>0)?'':'Veuillez choisir une race pour l\'animal'"
              ></v-combobox>
            </v-row>
          </div>
          <div v-if="editMode">
            <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
              Adopté :
            </v-row>
            <v-row style="margin: 0;padding:0;" justify="center">
              <v-checkbox
                v-model="animalCopy.adopte"
              >
              </v-checkbox>
            </v-row>
          </div>
          <div v-if="editMode">
            <v-row justify="center">
              <v-btn color="green lighten-2" @click="editMode=false;enregistrer()">
                enregistrer
              </v-btn>
            </v-row>

          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-row>

</div>
</template>

<script>
import * as svgadopte from '../assets/Adopté_Plan de travail 1.svg';
import {mapGetters} from "vuex";

export default {
  name: "Animal",
  props:['id'],
  data(){
    return{
      editMode:false,
      svgadopte:svgadopte,
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
      animaux:[
        {
          id:1,
          nom:'chien1',
          age:1,
          race:'chepa',
          type:'chien',
          couleur:['vert','gris'],
          image:'https://picsum.photos/500/300?image=18',
          adopte:false
        },
        {
          id:2,
          nom:'chat2',
          age:5,
          race:'chepa',
          type:'chat',
          couleur:['gris'],
          image:'https://picsum.photos/500/300?image=15',
          adopte:true
        },
        {
          id:3,
          nom:'chien3',
          age:10,
          race:'chepa',
          type:'chien',
          couleur:['bleu','gris'],
          image:'https://picsum.photos/500/300?image=43',
          adopte:false
        },
        {
          id:4,
          nom:'chien4',
          age:10,
          race:'chepa',
          type:'chien',
          couleur:['brun'],
          image:'https://picsum.photos/500/300?image=78',
          adopte:false
        },
        {
          id:5,
          nom:'chien5',
          age:12,
          race:'chepa',
          type:'chien',
          couleur:['brun','gris'],
          image:'https://picsum.photos/500/300?image=105',
          adopte:false
        }
      ],
      animal:null,
      animalCopy:null,
    }
  },
  methods:{
    getAnimal:function (){
      this.animaux.forEach((animal)=>{
        if(animal.id==this.id){
          this.animal = Object.assign({}, animal);
          this.animalCopy = Object.assign({}, animal);
        }
      })
    },
    getCouleursAnimal:function(){
      let couleurs = ""
      this.animal.couleur.forEach((c)=>{
        couleurs+=(c+', ')
      })
      return couleurs.slice(0, -2);
    },
    enregistrer:function(){
      if(this.animalCopy.type.length>0 && this.animalCopy.nom.length>0 && (new RegExp(/^[0-9]+$/).test(this.animalCopy.age)) && this.animalCopy.race.length>0 && this.animalCopy.couleur.length>0){
        this.animal = Object.assign({}, this.animalCopy);
        //TODO
        // Enregistrer dans la bdd
      }else{
        this.animalCopy = Object.assign({}, this.animal);
      }
    }
  },
  computed:{
    ...mapGetters(['getUtilisateur'])
  },
  created() {
    this.getAnimal()
  }
}
</script>

<style scoped>

</style>