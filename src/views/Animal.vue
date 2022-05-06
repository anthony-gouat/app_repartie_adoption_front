<template>
  <div>
    {{animalCopy}}
    <v-row style="margin: 0;margin-top: 50px" justify="center">
      <v-card width="95%">
        <v-row >
          <v-col>
            <v-carousel v-if="animalCopy.images.length>1" v-model="indexCarousel" height="auto">
              <v-carousel-item
                  v-for="(image, i) in animalCopy.images"
                  :key="i"
              >
                <v-img
                    :src="image.lien"
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
            <v-img v-else-if="animalCopy.images.length===1"
                :src="animalCopy.images[0].lien"
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
            <v-btn v-if="getUtilisateur && getUtilisateur.role==='Administrateur'" elevation="0" color="transparent" style="position:relative;top:0;right:0;" @click="cancel()" >
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
                  :value="{text:animalCopy.type,value:animalCopy.idType}"
                  @change="(val)=>{
                    animalCopy.type=val.text
                    animalCopy.idType=val.value
                  }"
                  :items="types.map(type=>{return {text:type.libelleType,value:type.idType}})"
                  :search-input.sync="searchType"
                >
                  <template v-slot:no-data >
                    <v-btn width="100%" color="transparent" elevation="0" @click="ajouteType()">
                      Ajouter le type "<strong>{{ searchType }}</strong>"
                    </v-btn>
                  </template>
                </v-combobox>
              </v-row>
            </div>
            <div>
              <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
                Nom :
              </v-row>
              <v-row style="margin: 0;padding:0;" v-if="!editMode" justify="center">
                {{animal.nomAnimal}}
              </v-row>
              <v-row v-else style="margin: auto;padding:0;width: 25%;min-width: 100px">
                <v-text-field
                    v-model="animalCopy.nomAnimal"
                    :error-messages="(new RegExp(/^[a-zA-Z\-0-9]+( [a-zA-Z\-0-9]+)*$/).test(animalCopy.nomAnimal))?'':'Veuillez choisir un nom pour l\'animal'"
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
<!--                <v-text-field-->
<!--                    v-model="animalCopy.race"-->
<!--                    :error-messages="(new RegExp(/^[a-zA-Z-]+( [a-zA-Z-]+)*$/).test(animalCopy.race))?'':'Veuillez choisir une race pour l\'animal'"-->
<!--                ></v-text-field>-->
                <v-combobox
                    :value="{text:animalCopy.race,value:animalCopy.idRace}"
                    @change="(val)=>{
                    animalCopy.race=val.text
                    animalCopy.idRace=val.value
                  }"
                    :items="races.map(race=>{return {text:race.libelleRace,value:race.idRace}})"
                    :search-input.sync="searchRace"
                >
                  <template v-slot:no-data >
                    <v-btn width="100%" color="transparent" elevation="0" @click="ajouteRace()">
                      Ajouter la race "<strong>{{ searchRace }}</strong>"
                    </v-btn>
                  </template>
                </v-combobox>
              </v-row>
            </div>

            <div>
              <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
                {{ animal.couleurs.length>1?'Couleurs':'Couleur'}} :
              </v-row>
              <v-row style="margin: 0;padding:0;" v-if="!editMode" justify="center">
                {{ getCouleursAnimal() }}
              </v-row>
              <v-row v-else style="margin: auto;padding:0;width: 25%;min-width: 100px">
                <v-combobox
                    @change="(val)=>animalCopy.couleurs=(val.map(v=>{
                      return {idCouleur:v.value,libelleCouleur:v.text}
                    }))"
                    :value="animalCopy.couleurs.map(couleur=>{return {text:couleur.libelleCouleur,value:couleur.idCouleur}})"
                    :items="couleurs.map(couleur=>{return {text:couleur.libelleCouleur,value:couleur.idCouleur}})"
                    multiple
                    :error-messages="(animalCopy.couleurs.length>0)?'':'Veuillez choisir une/des couleur(s) pour l\'animal'"
                ></v-combobox>
              </v-row>
            </div>

            <div>
              <v-row v-if="animal.tags.length>0 || editMode"  style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
                {{ animal.tags.length>1?'Tags':'Tag'}} :
              </v-row>
              <v-row style="margin: 0;padding:0;" v-if="!editMode && animal.tags.length>0" justify="center">
                {{ getTagsAnimal() }}
              </v-row>
              <v-row v-if="editMode" style="margin: auto;padding:0;width: 25%;min-width: 100px">
                <v-combobox
                    @change="(val)=>animalCopy.tags=(val.map(v=>{
                      return {idTag:v.value,libTag:v.text}
                    }))"
                    :value="animalCopy.tags.map(tag=>{return {text:tag.libTag,value:tag.idTag}})"
                    :search-input.sync="searchTag"
                    :items="tags.map(tag=>{return {text:tag.libTag,value:tag.idTag}})"
                    multiple
                    :error-messages="(animalCopy.tags.length>0)?'':'Veuillez choisir un/des tag(s) pour l\'animal (pas obligatoire)'"
                >
                  <template v-slot:no-data >
                    <v-btn width="100%" color="transparent" elevation="0" @click="ajouteTag()">
                      Ajouter le TAG "<strong>{{ searchTag }}</strong>"
                    </v-btn>
                  </template>
                </v-combobox>
              </v-row>
            </div>

            <div v-if="editMode">
              <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
                Image :
              </v-row>
              <v-row  style="margin: auto;padding:0;width: 50%;min-width: 100px">
                <v-combobox
                    @change="(val)=>(animalCopy.images=val.map(v=>{
                      return{lien:v,id_img:0}
                    }))"
                    :value="animalCopy.images.map(image=>{return image.lien})"
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

        <v-card-actions v-if="!animal.adopte">
          <v-row style="padding: 0;margin: 0;position: absolute;right: 10px;bottom: 10px" >
  <!--          Adoption d'un animal                  -->
            <v-btn color="green lighten-2" v-if="!getUtilisateur" @click="$router.push({name:'Login',params:{topath:{name:'Animal',params:{id:animal.id}}}})">
              <v-icon>
                mdi-paw
              </v-icon>
            </v-btn>
            <v-dialog v-else
                      v-model="dialogAdopte"
                      persistent
                      max-width="650"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn elevation="0"
                       style="margin-left: 10px"
                       v-bind="attrs"
                       v-on="on"
                       color="green lighten-2"
                >
                  <v-icon>
                    mdi-paw
                  </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Adopter un animal
                </v-card-title>
                <v-card-text>
                  <p>Vous voulez adopter un {{ animal.type }} nommé {{ animal.nomAnimal }} agée de {{ animal.age }}
                    {{ animal.age > 1 ? 'ans' : 'an' }} le {{ dateRDV }}</p>
                  <v-date-picker locale="fr-fr" :first-day-of-week="1" v-model="dateRDV"></v-date-picker>

                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="red darken-1"
                      text
                      @click="dialogAdopte = false;"
                  >
                    Annuler
                  </v-btn>
                  <v-btn
                      color="green darken-1"
                      text
                      @click="dialogAdopte = false;"
                  >
                    Valider
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-card-actions>
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
            <v-card-actions v-if="getUtilisateur && (getUtilisateur.role==='Administrateur' || getUtilisateur.id === comm.id_util)" style="position: inherit;width: fit-content;margin-left: auto;">
              <v-btn elevation="0" @click="deleteComm(comm.id)">
                <v-icon color="green lighten-2" >
                  mdi-close
                </v-icon>
              </v-btn>
                <v-dialog v-if="!comm.reponse && getUtilisateur && getUtilisateur.role==='Administrateur'"
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
                          color="red darken-1"
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
            <v-card-actions v-if="getUtilisateur && (getUtilisateur.role==='Administrateur' || getUtilisateur.id === comm.reponse.id_util)" style="position: inherit;width: fit-content;margin-left: auto;">
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
import axios from "axios";

export default {
  name: "Animal",
  props:['id'],
  data(){
    return{
      searchRace:'',
      searchTag:'',
      searchType:'',
      dateRDV:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), // date du jour
      ecritComm:false,
      dialogAdopte:false,
      indexCarousel:0,
      commentaire:'',
      reponse:'',
      editMode:false,
      svgadopte:svgadopte,
      races:[],
      types:[],
      couleurs:[],
      tags:[],
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
      animal:null,
      animalCopy:null,
    }
  },
  methods:{
    ajouteTag:function (){
      // TODO
      // ajoute tag
      axios.post('http://127.0.0.1:8855/api/tag',
          {
            libTag:this.searchTag
          })
      .then(response=>{
        this.animalCopy.tags.push(response.data)
        this.tags.push(response.data)
        this.searchTag=''
      })

    },
    ajouteType:function (){
      this.types.push(this.searchType)
      this.animalCopy.type=this.searchType
      // TODO
      // ajoute type
      this.searchType=''
    },
    ajouteRace:function (){
      this.types.push(this.searchRace)
      this.animalCopy.race=this.searchRace
      // TODO
      // ajoute race
      this.searchRace=''
    },
    getAnimal:function (){
      axios.get('http://127.0.0.1:8855/api/animaux/'+this.id)
          .then(async (response) => {
            let animal = response.data
            await axios.get('http://127.0.0.1:8855/api/image/animal/'+this.id).then(res => {
              animal['images'] = res.data
            })
            await axios.get('http://127.0.0.1:8855/api/tag/animal/'+this.id).then(res => {
              animal['tags'] = res.data
            })
            await axios.get('http://127.0.0.1:8855/api/couleur/animal/'+this.id).then(res => {
              animal['couleurs'] = res.data
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
            this.animal = Object.assign({}, animal);
            this.animalCopy = Object.assign({}, animal);
            console.log(this.animal)

          })
    },
    getInfos:async function (){
      axios.get('http://127.0.0.1:8855/api/race').then(response=>{
        this.races = response.data
      })
      axios.get('http://127.0.0.1:8855/api/type').then(response=>{
        this.types = response.data
      })
      axios.get('http://127.0.0.1:8855/api/couleur').then(response=>{
        this.couleurs = response.data
      })
      axios.get('http://127.0.0.1:8855/api/tag').then(response=>{
        this.tags = response.data
      })
    },
    getCouleursAnimal:function(){
      let couleurs = ""
      this.animal.couleurs.forEach((c)=>{
        couleurs+=(c.libelleCouleur+', ')
      })
      return couleurs.slice(0, -2);
    },
    getTagsAnimal:function(){
      let tags = ""
      this.animal.tags.forEach((t)=>{
        tags+=(t.libTag+', ')
      })
      return tags.slice(0, -2);
    },
    enregistrer:function(){
      if(this.animalCopy.nomAnimal.length>0 && (new RegExp(/^[a-zA-Z\-0-9]+( [a-zA-Z\-0-9]+)*$/).test(this.animalCopy.nomAnimal)) && (new RegExp(/^[0-9]+$/).test(this.animalCopy.age))){
        this.animal = Object.assign({}, this.animalCopy);
        //TODO
        // Enregistrer dans la bdd
        axios.put('http://127.0.0.1:8855/api/animaux/'+this.id,{
          nomAnimal: this.animal.nomAnimal,
          age: this.animal.age,
          idRace: this.animal.idRace,
          idType: this.animal.idType,
          adopter: this.animal.adopte
        }).then(async () => {
          let animalId = this.id
          await axios.delete('http://127.0.0.1:8855/api/images/animal/'+animalId)
          await axios.delete('http://127.0.0.1:8855/api/tags/animal/'+animalId)
          await axios.delete('http://127.0.0.1:8855/api/couleurs/animal/'+animalId)
          for (const couleur of this.animal.couleurs) {
            await axios.post('http://127.0.0.1:8855/api/couleurs', {
              idAnimal: animalId,
              idCouleur: couleur.idCouleur
            })
          }
          for (const tag of this.animal.tags) {
            await axios.post('http://127.0.0.1:8855/api/tags', {
              idAnimal: animalId,
              idTag: tag.idTag
            })
          }
          for (const image of this.animal.images) {
            await axios.post('http://127.0.0.1:8855/api/image', {
              lien:image.lien
            })
                .then(async res => {
                  let nawIdImage = res.data.id_img
                  await axios.post('http://127.0.0.1:8855/api/images', {
                    idImage: nawIdImage,
                    idAnimal: animalId
                  })
                })
          }
          await this.getInfos()
          this.getAnimal()
        })
        .catch(error=>{
          alert(error)
        })
      }else{
        alert("Il y a une erreur")
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
  async created() {
    await this.getInfos()
    this.getAnimal()
  }
}
</script>

<style scoped>

</style>