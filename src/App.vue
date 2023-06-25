<template>
  <div id="app" class="screen">
    <!-- <HotelList msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
  // import HotelList from './components/HotelList.vue'

  export default {
    name: 'App'
  }
</script>

<style>
@font-face {
  font-family: 'Myriad Pro';
  src: url('./assets/fonts/myriadpro/MYRIADPRO-REGULAR.OTF') format('opentype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Bebas Neue';
  src: url('./assets/fonts/bebasneue/BebasNeue-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

.flying {
  font-family: "Bebas Neue", sans-serif;
  border: none;
  position: fixed;
  font: inherit;
  cursor: pointer;
  top: 25px;
  right: 25px;
  border-radius: 40px;
  padding: 16px;
  background-color: #1a0c7d;
  color: rgb(255, 255, 255);
  box-shadow: 3px 3px 0px #c6c6c6;
}

.screen {
  font-family: "Myriad Pro", sans-serif;
  width: 95%;
  height: 100%;
  margin: 30px;
}

li {
  list-style-type: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

h1 {
  font-family: "Bebas Neue", Arial, sans-serif;
  font-size: 75px;
  margin: 0 36px;
}
</style>
