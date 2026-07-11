<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '../stores/posts'
import { useToastStore } from '../stores/toast'

const route = useRoute()
const router = useRouter()
const store = usePostsStore()
const toast = useToastStore()

const post = computed(() => store.getPostById(route.params.id))

const form = ref({
  title: '',
  content: '',
  author: '',
  category: ''
})

watch(post, (p) => {
  if (p) {
    form.value.title = p.title
    form.value.content = p.content
    form.value.author = p.author
    form.value.category = p.category
  }
}, { immediate: true })

function submit() {
  if (!form.value.title.trim() || !form.value.content.trim() || !form.value.author.trim()) return
  store.updatePost(post.value.id, { ...form.value })
  toast.show('Post actualizado')
  router.push(`/post/${post.value.id}`)
}
</script>

<template>
  <div class="edit-post" v-if="post">
    <button class="btn-back" @click="router.push(`/post/${post.id}`)">← Volver</button>

    <div class="form-card">
      <h1>Editar post</h1>

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
        Guardar cambios
      </button>
    </div>
  </div>

  <div v-else class="not-found">
    <h2>Post no encontrado</h2>
    <router-link to="/">Volver al inicio</router-link>
  </div>
</template>

<style scoped>
@import '../assets/forms.css';

.edit-post {
  max-width: 600px;
  margin: 0 auto;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found h2 {
  color: var(--text-light);
}
</style>
