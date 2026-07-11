<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '../stores/posts'

const router = useRouter()
const store = usePostsStore()

const form = ref({
  title: '',
  content: '',
  author: '',
  category: store.categories[0]
})

function submit() {
  if (!form.value.title.trim() || !form.value.content.trim() || !form.value.author.trim()) return
  store.addPost({ ...form.value })
  router.push('/')
}
</script>

<template>
  <div class="create-post">
    <button class="btn-back" @click="router.push('/')">← Volver</button>

    <div class="form-card">
      <h1>Crear nuevo post</h1>

      <div class="form-group">
        <label for="title">Título</label>
        <input id="title" v-model="form.title" placeholder="¿De qué quieres hablar?" class="input-field" maxlength="150" />
      </div>

      <div class="form-group">
        <label for="author">Tu nombre</label>
        <input id="author" v-model="form.author" placeholder="Usuario" class="input-field" maxlength="30" />
      </div>

      <div class="form-group">
        <label for="category">Categoría</label>
        <select id="category" v-model="form.category" class="input-field">
          <option v-for="cat in store.categories" :key="cat" :value="cat">
            r/{{ cat }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="content">Contenido</label>
        <textarea id="content" v-model="form.content" placeholder="Escribe tu post..." class="input-field textarea" maxlength="5000"></textarea>
      </div>

      <button @click="submit" class="btn-submit" :disabled="!form.title.trim() || !form.content.trim() || !form.author.trim()">
        Publicar
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/forms.css';

.create-post {
  max-width: 600px;
  margin: 0 auto;
}
</style>
