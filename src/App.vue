<template>
  <div id="app">
    <Play />
  </div>
</template>

<script>
import Play from './components/Play.vue'

export default {
  name: 'App',
  components: {
    Play
  }
}
</script>

<style>
/* minimal reset */ 
html { box-sizing: border-box; }
*, *:before, *:after { box-sizing: inherit; }
body, h1, h2, h3, h4, h5, h6, p, ol, ul { margin: 0; padding: 0; font-weight: normal; }
ol, ul { list-style: none; }
img { max-width: 100%; height: auto; }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
