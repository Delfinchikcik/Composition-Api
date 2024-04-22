<template>
  <div class="wrapper-todo">
    <div class="title has-text-centered">Мои заметки</div>
    <form @submit.prevent="addCart">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input v-model="newCart" class="input" type="text" placeholder="Найти заметку" />
        </p>
        <p class="control">
          <button :disabled="!newCart" class="button is-info">Добавить</button>
        </p>
      </div>
    </form>
    <div
      v-for="cart in carts"
      :key="cart.id"
      class="card mb-5"
      :class="{ 'has-background-success-light': cart.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{ 'has-text-success line-through': cart.done }">
              {{ cart.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                @click="toggleDonchik(cart.id)"
                class="button is-light"
                :class="cart.done ? 'is-success' : 'is-light'"
              >
                &check;
              </button>
              <button @click="deleteNotion(cart.id)" class="button">&#10060;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//import
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore'

//firebase ref

const notionRef = collection(db, 'todos');
const notionOrder = query(notionRef, orderBy("date", "desc"));

//todos

const carts = ref([])

// get todoshca
onMounted(() => {
  onSnapshot(notionOrder, (querySnapshot) => {
    const fbNotions = []
    querySnapshot.forEach((doc) => {
      const notion = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbNotions.push(notion)
    })
    carts.value = fbNotions
    console.log('Current cities in CA: ', fbNotions.join(', '))
  })
})
//add cart

const newCart = ref('')

const addCart = () => {
  addDoc(notionRef, {
    content: newCart.value,
    done: false,
    date: Date.now()
  })

  newCart.value = ''
}

//delete notion
const deleteNotion = (id) => {
  deleteDoc(doc(notionRef, id))
}

//toggle
const toggleDonchik = (id) => {
  const index = carts.value.findIndex((cart) => cart.id == id)
  updateDoc(doc(notionRef, id), {
    done: !carts.value[index].done
  })
}
</script>

<style>
@import 'D:\Учим HTML\developer2024\VueJS\Composition Api\node_modules\bulma\css\bulma.min.css';
.wrapper-todo {
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;
}
.line-through {
  text-decoration: line-through;
}
</style>
