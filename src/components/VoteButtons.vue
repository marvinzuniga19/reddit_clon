<script setup>
defineProps({
  upvotes: { type: Number, required: true },
  voted: { type: String, default: null }
})

const emit = defineEmits(['upvote', 'downvote'])
</script>

<template>
  <div class="vote-buttons">
    <button
      :class="['vote-btn', 'upvote', { active: voted === 'up' }]"
      @click="emit('upvote')"
      title="Upvote"
    >
      ▲
    </button>
    <span class="vote-count">{{ upvotes }}</span>
    <button
      :class="['vote-btn', 'downvote', { active: voted === 'down' }]"
      @click="emit('downvote')"
      title="Downvote"
    >
      ▼
    </button>
  </div>
</template>

<style scoped>
.vote-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 40px;
}

.vote-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 8px;
  color: var(--text);
  transition: all 0.2s;
}

.vote-btn.upvote:hover {
  background: var(--bg-active);
  border-color: var(--accent);
}

.vote-btn.upvote.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.vote-btn.downvote:hover {
  background: var(--bg-danger);
  border-color: var(--danger);
}

.vote-btn.downvote.active {
  background: var(--danger);
  border-color: var(--danger);
  color: white;
}

.vote-count {
  font-size: 14px;
  font-weight: bold;
  color: var(--text);
}
</style>
