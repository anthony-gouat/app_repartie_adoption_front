<template>
  <div>
    <v-row style="margin: 0;margin-top: 50px" justify="center">
      <v-card width="95%">
        <v-row>
          <v-col>
            <v-carousel v-if="animal.images.length>1" v-model="indexCarousel">
              <v-carousel-item
                  v-for="(image, i) in animal.images"
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
                </v-img>
              </v-carousel-item>
            </v-carousel>
            <v-img v-else-if="animal.images.length===1"
                   :src="animal.images[0].lien"
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
            </v-img>
          </v-col>

          <v-col style="margin: 0;padding:10px;font-size: 25px">
            <div>
              <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
                Animal :
              </v-row>
              <v-row style="margin: auto;padding:0;width: 25%;min-width: 100px">
                <v-combobox
                    :value="animal.type"
                    @change="(val)=>{
                      animal.type=val.text
                      animal.idType=val.value
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
              <v-row style="margin: auto;padding:0;width: 25%;min-width: 100px">
                <v-text-field
                    v-model="animal.nom"
                    :error-messages="(new RegExp(/^[a-zA-Z\-0-9]+( [a-zA-Z\-0-9]+)*$/).test(animal.nom))?'':'Veuillez choisir un nom pour l\'animal'"
                >
                </v-text-field>
              </v-row>
            </div>
            <div>
              <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
                Age :
              </v-row>
              <v-row style="margin: auto;padding:0;width: 25%;min-width: 100px">
                <v-text-field
                    v-model="animal.age"
                    :error-messages="(new RegExp(/^[0-9]+$/).test(animal.age))?'':'Doit être un nombre'"
                ></v-text-field>
              </v-row>
            </div>
            <div>
              <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
                Race :
              </v-row>
              <v-row style="margin: auto;padding:0;width: 25%;min-width: 100px">
                <v-combobox
                    :value="animal.race"
                    @change="(val)=>{
                      animal.race=val.text
                      animal.idRace=val.value
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
              <v-row style="margin: auto;padding:0;width: 25%;min-width: 100px">
                <v-combobox
                    @change="(val)=>animal.couleurs=(val.map(v=>{
                      return {idCouleur:v.value,libelleCouleur:v.text}
                    }))"
                    :value="animal.couleurs.map(couleur=>{return {text:couleur.libelleCouleur,value:couleur.idCouleur}})"
                    :items="couleurs.map(couleur=>{return {text:couleur.libelleCouleur,value:couleur.idCouleur}})"
                    multiple
                    :error-messages="(animal.couleurs.length>0)?'':'Veuillez choisir une/des couleur(s) pour l\'animal'"
                ></v-combobox>
              </v-row>
            </div>

            <div >
              <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
                {{ animal.images.length>1?'Images':'Image'}} :
              </v-row>
              <v-row  style="margin: auto;padding:0;width: 50%;min-width: 100px">
                <v-combobox
                    @change="(val)=>(animal.images=val.map(v=>{
                      return{lien:v,id_img:0}
                    }))"
                    :value="animal.images.map(image=>{return image.lien})"
                    multiple
                    chips
                ></v-combobox>
              </v-row>
            </div>
            <div>
              <v-row justify="center" style="margin: 0;padding:0;margin-bottom: 10px">
                <v-btn color="green lighten-2" @click="enregistrer()">
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
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "Ajout",
  data(){
    return{
      searchRace:'',
      searchTag:'',
      searchType:'',
      indexCarousel:0,
      races:[],
      types:[],
      couleurs:[],
      animal:{
        nom:'',
        age:0,
        idRace:0,
        idType:0,
        race:'',
        type:'',
        couleurs:[],
        images:[],
        adopter:false
      },
    }
  },
  methods:{
    ajouteType:function (){
      axios.post('http://127.0.0.1:8855/api/type',
          {
            libelleType:this.searchType
          })
          .then(response=>{
            this.animal.type=response.data.libelleType
            this.animal.idType=response.data.idType
            this.types.push(response.data)
            this.searchType=''
          })
    },
    ajouteRace:function (){
      axios.post('http://127.0.0.1:8855/api/race',
          {
            libelleRace:this.searchRace
          })
          .then(response=>{
            this.animal.race=response.data.libelleRace
            this.animal.idRace=response.data.idRace
            this.races.push(response.data)
            this.searchRace=''
          })
    },
    enregistrer:function(){
      if(this.animal.idType && this.animal.nom.length>0 && (new RegExp(/^[a-zA-Z\-0-9]+( [a-zA-Z\-0-9]+)*$/).test(this.animal.nom)) && (new RegExp(/^[0-9]+$/).test(this.animal.age)) && this.animal.idRace && this.animal.couleurs.length>0){
        axios.post('http://127.0.0.1:8855/api/animaux',{
          nomAnimal: this.animal.nom,
          age: this.animal.age,
          idRace: this.animal.idRace,
          idType: this.animal.idType,
          adopter: false
        }).then(async response => {
          let newAnimalId = response.data.idAnimal
          for (const couleur of this.animal.couleurs) {
            await axios.post('http://127.0.0.1:8855/api/couleurs', {
              idAnimal: newAnimalId,
              idCouleur: couleur.idCouleur
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
                idAnimal: newAnimalId
              })
            })
          }

          this.$router.push({name: 'Carousel'})
        })
        .catch(error=>{
          alert(error)
        })

      }else{
        alert("Il y a une erreur")
      }
    },
    getInfos:async function () {
      axios.get('http://127.0.0.1:8855/api/race').then(response => {
        this.races = response.data
      })
      axios.get('http://127.0.0.1:8855/api/type').then(response => {
        this.types = response.data
      })
      axios.get('http://127.0.0.1:8855/api/couleur').then(response => {
        this.couleurs = response.data
      })
    }
  },
  computed:{
    ...mapGetters(['getUtilisateur'])
  },
  created() {
    this.getInfos();
  }
}
</script>

<style scoped>

</style>