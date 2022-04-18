<template>
  <div style="padding: 10px">
    <v-row>
      <v-col
          v-for="(animal,idx) in animaux"
          :key="idx"
          class="d-flex child-flex"
          cols="4"
      >
        <v-card @click="$router.push({name:'Animal',params:{id:animal.id}})">
          <v-img
              :src="animal.image"
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

      ]
    }
  },
  computed:{
    ...mapGetters(['getUtilisateur']),
  },
}
</script>

<style scoped>

</style>