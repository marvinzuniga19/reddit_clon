<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const form = ref({ author: '', text: '' })

function submit() {
  if (!form.value.author.trim() || !form.value.text.trim()) return
  emit('submit', { ...form.value })
  form.value = { author: '', text: '' }
}
</script>

<template>
  <div class="comment-form">
    <label :for="'cf-author'" class="sr-only">Tu nombre</label>
    <input id="cf-author" v-model="form.author" placeholder="Tu nombre" class="input-field" maxlength="30" />
    <label :for="'cf-text'" class="sr-only">Escribe tu comentario</label>
    <textarea id="cf-text" v-model="form.text" placeholder="Escribe tu comentario..." class="input-field textarea" maxlength="2000"></textarea>
    <button @click="submit" class="btn-submit" :disabled="!form.author.trim() || !form.text.trim()">Comentar</button>
  </div>
</template>

<style scoped>
.comment-form {
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 10px;
  box-sizing: border-box;
  background: var(--bg);
  color: var(--text);
}

.input-field:focus {
  outline: none;
  border-color: var(--accent);
}

.textarea {
  min-height: 80px;
  resize: vertical;
}

.btn-submit {
  background: var(--accent);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background: var(--accent-hover);
}

.btn-submit:disabled {
  background: var(--border);
  cursor: not-allowed;
}
</style>
