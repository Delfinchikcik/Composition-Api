<template>
  <div class="wrapper-todo">
    <div class="title has-text-centered">Мои заметки</div>
    <form @submit.prevent="addCart">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
          v-model="newCart"  
          class="input" type="text" placeholder="Найти заметку" />
        </p>
        <p class="control">
          <button :disabled="!newCart" class="button is-info">Добавить</button>
        </p>
      </div>
    </form>
    <div v-for="cart in carts" :key="cart.id" class="card mb-5">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">{{ cart.content }}</div>
            <div class="column is-5 has-text-right">
              <button class="button is-light">&check;</button>
              <button class="button">&#10060;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//import
import {ref} from 'vue'
import { v4 as uuidv4 } from 'uuid';


//todos

const carts =ref([
]);


//add cart

const newCart =ref("");

const addCart =()=>{
  const newNotion = {
    id: uuidv4(),
    content: newCart.value,
    done: false
  };
  carts.value.unshift(newNotion);
  newCart.value = ""
}

</script>

<style>
@import 'D:\Учим HTML\developer2024\VueJS\Composition Api\node_modules\bulma\css\bulma.min.css';
.wrapper-todo {
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;
}
</style>
