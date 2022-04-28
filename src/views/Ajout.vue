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
                </v-img>
              </v-carousel-item>
            </v-carousel>
            <v-img v-else
                   :src="animal.images[0]"
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
                    v-model="animal.type"
                    :items="types"
                    :error-messages="(animal.type!=='')?'':'Veuillez choisir un type d\'animal'"

                >
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
                <v-text-field
                    v-model="animal.race"
                    :error-messages="(new RegExp(/^[a-zA-Z\-]+( [a-zA-Z\-]+)*$/).test(animal.race))?'':'Veuillez choisir une race pour l\'animal'"
                ></v-text-field>
              </v-row>
            </div>

            <div>
              <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
                {{ animal.couleur.length>1?'Couleurs':'Couleur'}} :
              </v-row>
              <v-row style="margin: auto;padding:0;width: 25%;min-width: 100px">
                <v-combobox
                    v-model="animal.couleur"
                    :items="couleurs"
                    multiple
                    :error-messages="(animal.couleur.length>0)?'':'Veuillez choisir une/des couleur(s) pour l\'animal'"
                ></v-combobox>
              </v-row>
            </div>

            <div >
              <v-row style="margin: 0;padding:0;font-size: 12px;color: darkgrey" justify="center">
                {{ animal.images.length>1?'Images':'Image'}} :
              </v-row>
              <v-row  style="margin: auto;padding:0;width: 50%;min-width: 100px">
                <!--              <v-text-field-->
                <!--                  v-model="animal.image"-->
                <!--                  -->
                <!--              ></v-text-field>-->
                <v-combobox
                    v-model="animal.images"
                    multiple
                    :error-messages="(animal.images.length>0)?'':'Veuillez choisir une image pour l\'animal (pas obligatoire)'"
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

export default {
  name: "Ajout",
  data(){
    return{
      indexCarousel:0,
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
      animal:{
        nom:'',
        age:0,
        race:'',
        type:'',
        couleur:[],
        images:[],
        adopte:false
      },
    }
  },
  methods:{
    enregistrer:function(){
      if(this.animal.type.length>0 && this.animal.nom.length>0 && (new RegExp(/^[a-zA-Z\-0-9]+( [a-zA-Z\-0-9]+)*$/).test(this.animal.nom)) && (new RegExp(/^[0-9]+$/).test(this.animal.age)) && this.animal.race.length>0 && (new RegExp(/^[a-zA-Z-]+( [a-zA-Z-]+)*$/).test(this.animal.race)) && this.animal.couleur.length>0){
        //TODO
        // Enregistrer dans la bdd
        // this.$router.push({name:'Carousel'})
      }else{
        alert("Il y a une erreur")
      }
    },

  },
  computed:{
    ...mapGetters(['getUtilisateur'])
  },
}
</script>

<style scoped>

</style>