<template>
  <div>
    <h1 class="h1"><img src="../../src/assets/IconoHotel.png" width="60">HOTELES</h1>
    <div class="lists">
      <div class="list">
        <div v-for="hotel in evenItems" v-bind:key="hotel.id" class="container">
          <div class="left-container">
            <div class="img-container">
              <img class="img-city" src="../../src/assets/FotoCiudad.jpg" alt="FotoCiudad">
            </div>
            <div>
              <b style="margin: 5px">{{ hotel.name }}</b>
              <br>
              <table>
                <tr>
                  <td><b style="margin: 3px">DIRECCIÓN:</b> {{ hotel.direction }}</td>
                  <td><b style="margin: 3px">CIUDAD:</b> {{ hotel.city }}</td>
                </tr>
                <tr>
                  <td><b style="margin: 3px">NIT:</b> {{ hotel.nit }}</td>
                  <td><b style="margin: 3px">HABITACIONES:</b> {{ hotel.total_rooms }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="right-container">
            <ul>
              <li v-for="room in hotelRooms(hotel.id)" v-bind:key="room.id" style="margin-left: 10px">
                {{ room.room_type.name }}-{{ room.room_type.accommodation }}: {{ room.amount }}
              </li>
            </ul>
            <router-link class="button-plus" :to="{ path: '/HotelRoomInsert', query: { id: hotel.id, nombre: hotel.name } }"><img class="button-agregar" src="../../src/assets/IconoAgregar.png" alt="plus"></router-link>
          </div>
        </div>
      </div>
      <div class="list">
        <div v-for="hotel in oddItems" v-bind:key="hotel.id" class="container">
          <div class="left-container">
            <div class="img-container">
              <img class="img-city" src="../../src/assets/FotoCiudad.jpg" alt="FotoCiudad">
            </div>
            <div>
              <b style="margin: 5px">{{ hotel.name }}</b>
              <br>
              <table>
                <tr>
                  <td><b style="margin: 3px">DIRECCIÓN:</b> {{ hotel.direction }}</td>
                  <td><b style="margin: 3px">CIUDAD:</b> {{ hotel.city }}</td>
                </tr>
                <tr>
                  <td><b style="margin: 3px">NIT:</b> {{ hotel.nit }}</td>
                  <td><b style="margin: 3px">HABITACIONES:</b> {{ hotel.total_rooms }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="right-container">
            <ul>
              <li v-for="room in hotelRooms(hotel.id)" v-bind:key="room.id" style="margin-left: 10px">
                {{ room.room_type.name }}-{{ room.room_type.accommodation }}: {{ room.amount }}
              </li>
            </ul>
            <router-link class="button-plus" :to="{ path: '/HotelRoomInsert', query: { id: hotel.id, nombre: hotel.name } }"><img class="button-agregar" src="../../src/assets/IconoAgregar.png" alt="plus"></router-link>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{ path: '/HotelCreate' }">
      <button class="flying"><img src="../../src/assets/IconoRegistrarHoteles.png" width="13"> Registrar Hotel</button>
    </router-link>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data(){
      return {
        hotels: [],
        rooms: []
      };
    },
    name: 'HotelList',
    mounted(){
      axios.get('http://localhost:8000/api/hotels')
      .then(response => {
        this.hotels = response.data;
      })
      .catch(error => {
        console.error(error);
      });
      axios.get('http://localhost:8000/api/rooms')
      .then(response => {
        this.rooms = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    computed: {
      evenItems() {
        return this.hotels.filter((_, index) => index % 2 === 0);
      },
      oddItems() {
        return this.hotels.filter((_, index) => index % 2 === 1);
      }
    },
    methods:{
      hotelRooms(hotel) {
        if (hotel) {
            return this.rooms.filter(rooms => rooms.hotel_id === hotel);
        } else {
            return this.rooms;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lists {
  display: flex;
}

.list {
  flex: 1;
}

.container {
  display: flex;
  height: 240px;
  width: 520px;
  padding: 10px;
  border-radius: 40px;
  margin: 36px;
  box-shadow: 5px 5px 0px #c6c6c6;
}

table {
  margin-top: 10px;
  font-size: 12px;
}

.right-container {
  margin: 0;
  position: relative;
  width: 34%;
  height: 100%;
}

.left-container {
  margin: 0;
  position: relative;
  width: 66%;
  height: 100%;
}

.img-container {
  width: 100%;
  height: 66%;
}

.img-city {
  width: 100%;
  height: 100%;
  border-radius: 40px 0 0 0;
}

.button-plus {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.button-agregar {
  width: 30px;
}
</style>
