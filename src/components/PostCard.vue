<script setup>
import { ref, computed } from 'vue'
import VoteButtons from './VoteButtons.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import { usePostsStore } from '../stores/posts'
import { useToastStore } from '../stores/toast'
import { timeAgo } from '../utils/time'

const props = defineProps({
  post: { type: Object, required: true }
})

const store = usePostsStore()
const toast = useToastStore()
const showConfirmDelete = ref(false)

const voted = computed(() => store.getPostVote(props.post.id))

function handleDelete() {
  store.deletePost(props.post.id)
  toast.show('Post eliminado')
}
</script>

<template>
  <article class="post-card">
    <VoteButtons
      :upvotes="post.upvotes"
      :voted="voted"
      @upvote="store.upvotePost(post.id)"
      @downvote="store.downvotePost(post.id)"
    />
    <div class="post-content">
      <div class="post-meta">
        <span class="category">r/{{ post.category }}</span>
        <span class="separator">·</span>
        <span class="author">{{ post.author }}</span>
        <span class="separator">·</span>
        <span class="time">{{ timeAgo(post.createdAt) }}</span>
      </div>
      <router-link :to="`/post/${post.id}`" class="post-title">
        {{ post.title }}
      </router-link>
      <p class="post-excerpt">{{ post.content.substring(0, 150) }}{{ post.content.length > 150 ? '...' : '' }}</p>
      <div class="post-actions">
        <router-link :to="`/post/${post.id}`" class="action-link">
          💬 {{ post.comments.length }} comentarios
        </router-link>
        <router-link :to="`/editar/${post.id}`" class="action-link edit-link">
          ✏️ Editar
        </router-link>
        <button class="action-link delete-link" @click="showConfirmDelete = true">
          🗑️ Eliminar
        </button>
      </div>
    </div>

    <ConfirmDialog v-if="showConfirmDelete" message="¿Eliminar este post?" @confirm="handleDelete" @cancel="showConfirmDelete = false" />
  </article>
</template>

<style scoped>
.post-card {
  display: flex;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  transition: box-shadow 0.2s;
  position: relative;
}

.post-card:hover {
  box-shadow: 0 2px 8px var(--shadow);
}

.post-content {
  flex: 1;
  min-width: 0;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.category {
  color: var(--accent);
  font-weight: 600;
}

.separator {
  color: var(--border);
}

.post-title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  margin-bottom: 4px;
}

.post-title:hover {
  color: var(--accent);
}

.post-excerpt {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.post-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-link {
  font-size: 12px;
  color: var(--text-muted);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.action-link:hover {
  color: var(--accent);
}

.delete-link:hover {
  color: var(--danger);
}
</style>
