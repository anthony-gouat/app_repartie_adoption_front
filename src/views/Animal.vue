<template>
<div>
  <v-row style="margin: 0;margin-top: 50px" justify="center">
    <v-card width="95%">

      <v-row>
        <v-col>
          <v-carousel v-if="animalCopy.images.length>1" v-model="indexCarousel">
            <v-carousel-item
                v-for="(image, i) in animalCopy.images"
                :key="i"
            >
              <v-img
                  :src="image"
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
            </v-carousel-item>
          </v-carousel>
          <v-img v-else
              :src="animalCopy.images[0]"
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
          <v-btn v-if="getUtilisateur && getUtilisateur.role==='admin'" elevation="0" color="transparent" style="position:relative;top:0;right:0;" @click="cancel()" >
            <v-icon color="green lighten-2" size="30">
              {{editMode?'mdi-close':'mdi-pen'}}
            </v-icon>
          </v-btn>
          <div>
            <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
              Animal :
            </v-row>
            <v-row style="margin: 0;padding:0;" v-if="!editMode" justify="center">
              {{animal.type}}
            </v-row>
            <v-row v-else style="margin: auto;padding:0;width: 25%;min-width: 100px">
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
            <v-row v-else style="margin: auto;padding:0;width: 25%;min-width: 100px">
              <v-text-field
                  v-model="animalCopy.nom"
                  :error-messages="(new RegExp(/^[a-zA-Z\-0-9]+$/).test(animalCopy.nom))?'':'Veuillez choisir un nom pour l\'animal'"
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
            <v-row v-else style="margin: auto;padding:0;width: 25%;min-width: 100px">
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
            <v-row v-else style="margin: auto;padding:0;width: 25%;min-width: 100px">
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
            <v-row v-else style="margin: auto;padding:0;width: 25%;min-width: 100px">
              <v-combobox
                  v-model="animalCopy.couleur"
                  :items="couleurs"
                  multiple
                  :error-messages="(animalCopy.couleur.length>0)?'':'Veuillez choisir une/des couleur(s) pour l\'animal'"
              ></v-combobox>
            </v-row>
          </div>

          <div v-if="editMode">
            <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
              Image :
            </v-row>
            <v-row  style="margin: auto;padding:0;width: 50%;min-width: 100px">
<!--              <v-text-field-->
<!--                  v-model="animalCopy.image"-->
<!--                  :error-messages="(animalCopy.image.length>0)?'':'Veuillez choisir une image pour l\'animal (pas obligatoire)'"-->
<!--              ></v-text-field>-->
              <v-combobox
                  v-model="animalCopy.images"
                  multiple
                  chips
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
            <v-row justify="center" style="margin: 0;padding:0;margin-bottom: 10px">
              <v-btn color="green lighten-2" @click="editMode=false;enregistrer()">
                enregistrer
              </v-btn>
            </v-row>

          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-row>


  <v-row v-for="(comm,i) in commentaires" :key="i" style="margin: 0;margin-top: 50px;margin-left: 2.5%">
    <v-col style="margin: 0;padding: 0">
      <v-row style="margin: 0;padding: 0">
        <v-card width="47.5%">
          <v-card-title>
            {{comm.id_util}}
          </v-card-title>
          <v-card-text>
            {{comm.contenu}}
          </v-card-text>
          <v-card-actions v-if="getUtilisateur && getUtilisateur.role==='admin'" style="position: inherit;width: fit-content;margin-left: auto;">
            <v-btn elevation="0" @click="deleteComm(comm.id)">
              <v-icon color="green lighten-2" >
                mdi-close
              </v-icon>
            </v-btn>
              <v-dialog v-if="!comm.reponse"
                  v-model="comm.ecritRep"
                  persistent
                  max-width="650"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn elevation="0"
                         style="margin-left: 10px"
                         v-bind="attrs"
                         v-on="on"
                  >
                    <v-icon color="green lighten-2">
                      mdi-message-text
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5">
                    écrire une réponse {{comm.id}}
                  </v-card-title>
                  <v-card-text>
                    <v-textarea
                        v-model="reponse"
                    >

                    </v-textarea>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="comm.ecritRep = false;reponse=''"
                    >
                      Annuler
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="addRep(comm.id);reponse='';comm.ecritRep = false;"
                    >
                      Ok
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </v-card-actions>
        </v-card>

      </v-row>
      <v-row v-if="comm.reponse" style="margin: 0;margin-right: 2.5%;margin-left: 50%">
        <v-card width="100%">
          <v-card-title>
            {{comm.reponse.id_util}}
          </v-card-title>
          <v-card-text>
            {{comm.reponse.contenu}}
          </v-card-text>
          <v-card-actions v-if="getUtilisateur && getUtilisateur.role==='admin'" style="position: inherit;width: fit-content;margin-left: auto;">
            <v-btn elevation="0" @click="deleteComm(comm.reponse.id)">
              <v-icon color="green lighten-2">
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
  </v-row>


  <v-row justify="center">
    <v-dialog
        v-model="ecritComm"
        persistent
        max-width="650"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="getUtilisateur" fab  style="position: fixed;right: 25px;bottom: 25px;"
               v-bind="attrs"
               v-on="on"
        >
          <v-icon large color="green lighten-2">
            mdi-message-text
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          écrire un commentaire
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="commentaire"
          >

          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="ecritComm = false;commentaire=''"
          >
            Annuler
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="addComm();commentaire='';ecritComm = false;"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      ecritComm:false,
      indexCarousel:0,
      commentaire:'',
      reponse:'',
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
      commentaires:[
        {
          id:1,
          id_util:2,
          reponse:{
            id:2,
            id_util:1,
            contenu:'Ma réponse',
          },
          contenu:'Commentaire',
          ecritRep:false,
        }
      ],
      animaux:[
        {
          id:1,
          nom:'chien1',
          age:1,
          race:'chepa',
          type:'chien',
          couleur:['vert','gris'],
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
          images:['https://picsum.photos/500/300?image=105'],
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
      if(this.animalCopy.type.length>0 && this.animalCopy.nom.length>0 && (new RegExp(/^[a-zA-Z\-0-9]+$/).test(this.animalCopy.nom)) && (new RegExp(/^[0-9]+$/).test(this.animalCopy.age)) && this.animalCopy.race.length>0 && (new RegExp(/^[a-zA-Z-]+$/).test(this.animalCopy.race)) && this.animalCopy.couleur.length>0){
        this.animal = Object.assign({}, this.animalCopy);
        //TODO
        // Enregistrer dans la bdd
      }else{
        this.animalCopy = Object.assign({}, this.animal);
      }
    },
    cancel:function(){
      this.editMode=!this.editMode;
      this.animalCopy = Object.assign({}, this.animal);
    },
    addComm:function(){
      let id = this.commentaires.length*2+10
      this.commentaires.push(
        {
          id:id,
          id_util:this.getUtilisateur.id,
          reponse:null,
          contenu:this.commentaire,
          ecritRep:false,
        }
      )
    },
    addRep:function(idcomm){
      this.commentaires.forEach((comm)=>{
        if(comm.id===idcomm){
          comm.reponse={
            id:comm.id+1,
            id_util:this.getUtilisateur.id,
            contenu:this.reponse,
          }
        }
      })
    },
    deleteComm:function(idcomm){
      let index=-1
      this.commentaires.forEach((comm,i)=>{
        if(comm.id===idcomm){
          if(comm.reponse!==null){
            comm.reponse=null
            // TODO
            // delete avec api
          }
          index=i
          // TODO
          // delete avec api
        }
        if(comm.reponse!== null && comm.reponse.id===idcomm) {
          // TODO
          // delete avec api
          comm.reponse=null
        }
      })
      if(index>-1){
        this.commentaires.splice(index, 1);
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