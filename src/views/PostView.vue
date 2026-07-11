<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '../stores/posts'
import { useToastStore } from '../stores/toast'
import VoteButtons from '../components/VoteButtons.vue'
import CommentThread from '../components/CommentThread.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import CommentForm from '../components/CommentForm.vue'
import { timeAgo } from '../utils/time'

const route = useRoute()
const router = useRouter()
const store = usePostsStore()
const toast = useToastStore()

const post = computed(() => store.getPostById(route.params.id))
const voted = computed(() => store.getPostVote(route.params.id))

const showConfirmDelete = ref(false)

function submitComment(data) {
  store.addComment(post.value.id, data)
  toast.show('Comentario agregado')
}

function handleDelete() {
  store.deletePost(post.value.id)
  toast.show('Post eliminado')
  router.push('/')
}
</script>

<template>
  <div class="post-detail" v-if="post">
    <button class="btn-back" @click="router.push('/')">← Volver</button>

    <div class="post-main">
      <VoteButtons
        :upvotes="post.upvotes"
        :voted="voted"
        @upvote="store.upvotePost(post.id)"
        @downvote="store.downvotePost(post.id)"
      />
      <div class="post-body">
        <div class="post-meta">
          <span class="category">r/{{ post.category }}</span>
          <span class="separator">·</span>
          <span class="author">{{ post.author }}</span>
          <span class="separator">·</span>
          <span class="time">{{ timeAgo(post.createdAt) }}</span>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="post-content-text">{{ post.content }}</p>
        <div class="post-actions-bar">
          <router-link :to="`/editar/${post.id}`" class="action-btn">✏️ Editar</router-link>
          <button class="action-btn delete-btn" @click="showConfirmDelete = true">🗑️ Eliminar</button>
        </div>
      </div>
    </div>

    <div class="comments-section">
      <h2>Comentarios ({{ post.comments.length }})</h2>

      <div v-if="post.comments.length === 0" class="no-comments">
        Sin comentarios aún. ¡Sé el primero!
      </div>

      <div v-else class="comments-list">
        <CommentThread
          v-for="comment in post.comments"
          :key="comment.id"
          :comment="comment"
          :post-id="post.id"
        />
      </div>

      <h3>Deja un comentario</h3>
      <CommentForm @submit="submitComment" />
    </div>

    <ConfirmDialog v-if="showConfirmDelete" message="¿Eliminar este post?" @confirm="handleDelete" @cancel="showConfirmDelete = false" />
  </div>

  <div v-else class="not-found">
    <h2>Post no encontrado</h2>
    <router-link to="/">Volver al inicio</router-link>
  </div>
</template>

<style scoped>
.post-detail {
  max-width: 700px;
  margin: 0 auto;
}

.btn-back {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
}

.btn-back:hover {
  text-decoration: underline;
}

.post-main {
  display: flex;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.post-body {
  flex: 1;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.category {
  color: var(--accent);
  font-weight: 600;
}

.separator {
  color: var(--border);
}

.post-title {
  font-size: 22px;
  margin: 0 0 12px 0;
  color: var(--text);
}

.post-content-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text);
  margin: 0 0 12px 0;
}

.post-actions-bar {
  display: flex;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.action-btn {
  background: none;
  border: none;
  font-size: 12px;
  color: var(--text-muted);
  cursor: pointer;
  text-decoration: none;
  padding: 0;
}

.action-btn:hover {
  color: var(--accent);
}

.delete-btn:hover {
  color: var(--danger);
}

.comments-section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
}

.comments-section h2 {
  font-size: 18px;
  margin: 0 0 16px 0;
  color: var(--text);
}

.comments-list {
  margin-bottom: 16px;
}

.no-comments {
  color: var(--text-light);
  font-size: 14px;
  text-align: center;
  padding: 20px;
  margin-bottom: 16px;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found h2 {
  color: var(--text-light);
}
</style>
