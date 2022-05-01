<template>
  <div>
    <v-app-bar>
      <v-col class="col-lg-3" style="height: 100%;
    padding: 0;">
        <v-row  align="center">
          <v-col  >
            <v-app-bar-title>
              <template v-slot:default>
                <v-row style="margin: 0;padding: 0">
                  <v-col>
                    <v-icon large @click="$router.push({name:'Carousel'})" color="green lighten-2">
                      mdi-home
                    </v-icon>
                  </v-col>
                  <v-col>
                    <h3>
                      Association d'aide à l'adoption
                    </h3>
                  </v-col>
                </v-row>
              </template>
            </v-app-bar-title>
          </v-col>

        </v-row>
      </v-col>
      <v-col class="col-xl" style="display: contents">
        <v-row align="center" justify="center" style="min-width: fit-content">
          <v-col class="col-auto">
            <v-text-field filled dense rounded solo
                id="input_recherche"
                v-model="recherche"
                hide-details="auto"
                append-outer-icon="mdi-magnify"
                append-icon="mdi-close"
                @click:append-outer="search()"
                @click:append="recherche='';search()"

            >
            </v-text-field>
          </v-col>
          <v-col class="col-auto">
<!--        Critères de recherche              -->
            <v-menu
                open-on-hover
                :close-on-click="false"
                :close-on-content-click="false"
                offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="green lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Critères
                </v-btn>
              </template>
              <v-list>
<!--                <v-list-item-group-->
<!--                    v-model="criteres['checked']"-->
<!--                    multiple-->
<!--                >-->
                  <v-list-item
                      v-for="(critere, index) in criteres"
                      :key="index"
                  >
                      <v-list-item-action>
                        <v-checkbox v-model="critere.checked">
                          <template v-slot:label>
                            <h5 style="color: black">{{critere.nom}}</h5>
                          </template>
                        </v-checkbox>
                      </v-list-item-action>

                  </v-list-item>
<!--                </v-list-item-group>-->
              </v-list>
            </v-menu>
          </v-col>

          <!--        Tags              -->
          <v-col class="col-auto">
            <v-menu
                open-on-hover
                :close-on-click="false"
                :close-on-content-click="false"
                bottom
                offset-y
                :disabled="tags.length===0"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    :color="tags.length>0?'green lighten-2':'grey'"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Tags
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                    v-for="(tag, index) in tags"
                    :key="index"
                >
                  <v-list-item-action>
                    <v-checkbox v-model="tag.checked">
                      <template v-slot:label>
                        <h5 style="color: black">{{tag.nom}}</h5>
                      </template>
                    </v-checkbox>
                  </v-list-item-action>

                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>

        </v-row>
      </v-col>
      <v-col class="col-1">
        <v-row>
          <v-btn fab elevation="0" @click="(getUtilisateur===undefined)? ($router.push({name:'Login'})) : (logout())">
            <v-icon>
              {{(getUtilisateur===undefined)?'mdi-account-outline':'mdi-power'}}
            </v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Navigation",
  data(){
    return {
      recherche:"",
      criteres:[
        {nom:'race',checked:false},
        {nom:'type d\'animal',checked:false},
        {nom:'couleur',checked:false},
        {nom:'âge',checked:false},
      ],
      tags:[
        {nom:'tropical',checked:false},
        {nom:'origine continental',checked:false},
        {nom:'exotique',checked:false},
      ],
    }
  },
  computed:{
    ...mapGetters(['getUtilisateur']),
  },
  methods: {
    ...mapMutations(['setUtilisateur']),
    search:function(){
      console.log(this.recherche)
      if(this.recherche.length>0){
        this.$router.push({name:'Carousel',params:{criteres:this.criteres.filter((critere)=>{return critere.checked}).map((critere)=>(critere.nom)),tags:this.tags.filter((tag)=>{return tag.checked}).map((tag)=>(tag.nom))},query:{search:this.recherche}})
      }else{
        this.$router.push({name:'Carousel',params:{criteres:this.criteres.filter((critere)=>{return critere.checked}).map((critere)=>(critere.nom)),tags:this.tags.filter((tag)=>{return tag.checked}).map((tag)=>(tag.nom))}})
      }
      // TODO
      // fonction de recherche
    },
    logout:function(){
      this.setUtilisateur(undefined)
      this.$router.push({name:'Carousel'})
    }
  }
}
</script>

<style scoped>
/deep/.v-app-bar-title__content {
  width: fit-content!important;
}
</style>