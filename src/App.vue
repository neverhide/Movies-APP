<template lang='pug'>
#app
  img(src='./assets/logo.png')
  select(v-model='selectedCountry')
   option(v-for='country in countries' v-bind:value='country.value') {{country.name}}
  spinner(v-show='loading')
  ul
    artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
</template>

<script>
import config from './api/config';
import {getData} from './api/getdata';
import Artist from './component/Artist';
import Spinner from './component/Spinner';

export default {
  data() {
    return {
      artists:[],
      countries:[
        {name:'colombia', value:'colombia'},
        {name:'Argentina',value:'argentina'},
        {name:'España', value:'spain'}
      ],
      selectedCountry:'colombia',
      loading:'true'
    };
  },
  components:{
    Artist,
    Spinner
  },
  methods:{
    findArtists(){
      const apiKey = config.apiKey
      this.loading = true;
      const self = this;

      getData(apiKey, this.selectedCountry).then(function(artists){
          self.loading = false;
          self.artists = artists;
      })
    }
  },
  mounted: function () {
    //ejecuta las funciones cuando ya se cargo en el dom
    this.findArtists();

  },
  watch:{
    //observa los cambios reslizados en la vista
    selectedCountry: function(){
      this.findArtists();
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
