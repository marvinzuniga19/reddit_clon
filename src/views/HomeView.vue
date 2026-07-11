<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '../stores/posts'
import PostCard from '../components/PostCard.vue'

const route = useRoute()
const router = useRouter()
const store = usePostsStore()

const activeCategory = computed(() => route.params.category || 'todas')

const filteredPosts = computed(() => {
  const posts = store.postsByCategory(activeCategory.value)
  const sorted = [...posts]
  if (store.sortBy === 'top') {
    sorted.sort((a, b) => b.upvotes - a.upvotes)
  } else if (store.sortBy === 'new') {
    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
  return sorted
})

function selectCategory(cat) {
  if (cat === 'todas') {
    router.push('/')
  } else {
    router.push(`/r/${cat}`)
  }
}
</script>

<template>
  <div class="home">
    <div class="home-header">
      <h1 v-if="activeCategory === 'todas'">Todos los posts</h1>
      <h1 v-else>r/{{ activeCategory }}</h1>
    </div>

    <div class="category-tabs">
      <button
        v-for="cat in ['todas', ...store.categories]"
        :key="cat"
        :class="['tab', { active: activeCategory === cat }]"
        @click="selectCategory(cat)"
      >
        {{ cat === 'todas' ? 'Todas' : 'r/' + cat }}
      </button>
    </div>

    <div class="sort-bar">
      <button
        :class="['sort-btn', { active: store.sortBy === 'top' }]"
        @click="store.setSortBy('top')"
      >
        ▲ Top
      </button>
      <button
        :class="['sort-btn', { active: store.sortBy === 'new' }]"
        @click="store.setSortBy('new')"
      >
        ● Nuevos
      </button>
    </div>

    <div v-if="filteredPosts.length === 0" class="empty">
      No hay posts en esta categoría.
    </div>

    <div v-else class="posts-list">
      <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 700px;
  margin: 0 auto;
}

.home-header {
  margin-bottom: 16px;
}

.home-header h1 {
  font-size: 24px;
  margin: 0;
  color: var(--text);
}

.category-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.tab {
  background: none;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  transition: all 0.2s;
}

.tab:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.tab.active {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.sort-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.sort-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  transition: all 0.2s;
}

.sort-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.sort-btn.active {
  background: var(--bg-active);
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 600;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty {
  text-align: center;
  color: var(--text-light);
  padding: 40px;
  font-size: 14px;
}
</style>
