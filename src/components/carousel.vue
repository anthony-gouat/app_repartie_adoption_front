<template>
  <div style="padding: 10px">
    <v-row>
      <v-col
          v-for="(animal,idx) in animaux"
          :key="idx"
          class="d-flex child-flex"
          cols="4"
      >
        <v-card>
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
            <v-icon color="red" v-if="animal.adopte">mdi-close</v-icon>
          </v-img>
          {{animal.nom}} {{animal.age}} {{animal.age>1?'ans':'an'}}
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "carousel",
  data(){
    return{
      animaux:[
        {
          nom:'chien1',
          age:1,
          race:'chepa',
          type:'chien',
          couleur:['vert','gris'],
          image:'https://picsum.photos/500/300?image=18',
          adopte:false
        },
        {
          nom:'chat2',
          age:5,
          race:'chepa',
          type:'chat',
          couleur:['gris'],
          image:'https://picsum.photos/500/300?image=15',
          adopte:true
        },
        {
          nom:'chien3',
          age:10,
          race:'chepa',
          type:'chien',
          couleur:['bleu','gris'],
          image:'https://picsum.photos/500/300?image=43',
          adopte:false
        },
        {
          nom:'chien4',
          age:10,
          race:'chepa',
          type:'chien',
          couleur:['brun'],
          image:'https://picsum.photos/500/300?image=78',
          adopte:false
        },
        {
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
  }
}
</script>

<style scoped>

</style>