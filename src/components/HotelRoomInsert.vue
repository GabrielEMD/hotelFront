<template>
    <div class="container">
        <h1><img src="../../src/assets/IconoHotel.png" width="46">&nbsp;Hotel {{ name }}</h1>
        <form @submit="submitForm">
            <label for="name_type">Tipo Habitación</label>
            <select id="name_type" v-model="form.name_type" required>
                <option v-for="tipo in uniqueTypes" v-bind:key="tipo.name">{{ tipo.name }}</option>
            </select>
            <br>
            <label for="name_acommodation">Acomodación</label>
            <select id="name_acommodation" v-model="form.name_acommodation" required>
                <option v-for="accommodation in filteredAccommodations" v-bind:key="accommodation.accommodation">{{ accommodation.accommodation }}</option>
            </select>
            <br>
            <label for="amount">Habitaciones</label>
            <input type="number" id="amount" v-model="form.amount" required>
            <br>

            <button class="submit" type="submit">ENVIAR</button>
        </form>
        <router-link to="/">
            <button class="flying">VOLVER</button>
        </router-link>
    </div>
</template>

<script>
    import { API_URL } from '../../urls.js';
    import axios from 'axios';
    export default {
        props: ['id', 'nombre'],
        name: 'HotelCreate',
        data(){
            return {
                form: {
                    amount: 0,
                    name_type: '',
                    name_acommodation: ''
                },
                types: [],
                name: '',
                payload: {
                    hotel_id: 0,
                    room_type_id: 0,
                    amount: 0,
                }
            };
        },
        methods: {
            submitForm(event) {
                event.preventDefault();
                this.payload.amount = this.form.amount;

                if (this.payload.amount <= 0){
                    alert('No es posible colocar 0 en total de habitaciones ');
                    return;
                }
                for (let i = 0; i < this.types.length; i++) {
                    if (this.types[i].name == this.form.name_type && this.types[i].accommodation == this.form.name_acommodation){
                        this.payload.room_type_id = this.types[i].id;
                        break;
                    }
                }

                axios.post(API_URL+'/rooms', this.payload)
                    .then(response => {
                        console.log('Formulario enviado exitosamente', response.data);
                        this.payload.amount = 0;
                        this.payload.room_type_id = 0;
                        this.form.amount = 0;
                        this.form.name_type = '';
                        this.form.name_acommodation = '';
                    })
                    .catch(error => {
                        if (error.response.status == 422){
                            alert(error.response.data.message);
                        }
                    });
            },
            actualiceOptions(){

            }
        },
        mounted(){
            axios.get(API_URL+'/roomtypes')
            .then(response => {
                this.types = response.data;
            })
            .catch(error => {
                console.error(error);
            });
            this.name = this.$route.query.nombre;
            this.payload.hotel_id = this.$route.query.id;
        },
        computed: {
            uniqueTypes() {
                const uniqueTypeIds = new Set();
                return this.types.filter(tipo => {
                    if (uniqueTypeIds.has(tipo.name)) {
                    return false;
                    }
                    uniqueTypeIds.add(tipo.name);
                    return true;
                });
            },
            filteredAccommodations() {
                if (this.form.name_type) {
                    return this.types.filter(types => types.name === this.form.name_type);
                } else {
                    const uniqueTypeIds = new Set();
                    return this.types.filter(tipo => {
                        if (uniqueTypeIds.has(tipo.accommodation)) {
                            return false;
                        }
                        uniqueTypeIds.add(tipo.accommodation);
                        return true;
                    });
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    margin: 10px 20%;
    height: 360px;
    width: 720px;
    padding: 30px;
    border-radius: 40px;
    box-shadow: 5px 5px 0px #c6c6c6;
}

form {
    width: 410px;
    margin: 10px 15%;
}

input, select {
    all: unset;
    width: 100%;
    background-color: #E2E2E2;
    border: none;
    padding: 5px;
    margin: 5px 0;
}

select {
    background-image: url('../../src/assets/iconoFlecha.png');
    background-size: 20px;
    background-position: right center;
    background-repeat: no-repeat;
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
