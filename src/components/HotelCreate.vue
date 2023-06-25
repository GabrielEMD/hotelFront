<template>
    <div>
        <div class="container">
            <h1><img src="../../src/assets/IconoHotel.png" width="46">&nbsp;Ingresar Hotel</h1>
            <form @submit="submitForm">
                <label for="name">Nombre</label>
                <br>
                <input type="text" id="name" v-model="form.name" required>
                <br>
                <label for="direction">Dirección</label>
                <br>
                <input type="text" id="direction" v-model="form.direction" required>
                <br>
                <label for="city">Ciudad</label>
                <br>
                <input type="text" id="city" v-model="form.city" required>
                <br>
                <label for="nit">NIT</label>
                <br>
                <input type="text" id="nit" v-model="form.nit" required>
                <br>
                <label for="total_rooms">Habitaciones</label>
                <br>
                <input type="number" id="total_rooms" v-model="form.total_rooms" required>
                <br>

                <button class="submit" type="submit">ENVIAR</button>
            </form>
        </div>
            <router-link to="/">
                <button class="flying">VOLVER</button>
            </router-link>
    </div>
</template>

<script>
    import { API_URL } from '../../urls.js';
    import axios from 'axios';
    export default {
        name: 'HotelCreate',
        data(){
            return {
                form: {
                    name: '',
                    direction: '',
                    city: '',
                    nit: '',
                    total_rooms: 0
                }
            };
        },
        methods: {
            submitForm(event) {
            event.preventDefault();

            axios.post(API_URL+'/hotels', this.form)
                .then(response => {
                    console.log('Formulario enviado exitosamente', response.data);
                    this.form.name = '';
                    this.form.direction = '';
                    this.form.city = '';
                    this.form.nit = '';
                    this.form.total_rooms = 0;
                })
                .catch(error => {
                    if (error.response.status == 422){
                        alert(error.response.data.message);
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    margin: 10px 30%;
    height: 420px;
    width: 410px;
    padding: 30px;
    border-radius: 40px;
    box-shadow: 5px 5px 0px #c6c6c6;
}

input {
    all: unset;
    width: 100%;
    background-color: #E2E2E2;
    border: none;
    padding: 5px;
    margin: 5px 0;
}

h1 {
    font-size: 56px;
}

.submit {
    margin: 10px 40%;
    font-family: "Bebas Neue", sans-serif;
    border: none;
    font: inherit;
    cursor: pointer;
    border-radius: 40px;
    padding: 16px;
    background-color: #1a0c7d;
    color: rgb(255, 255, 255);
}
</style>
