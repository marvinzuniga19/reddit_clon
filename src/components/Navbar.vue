<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePostsStore } from '../stores/posts'
import { useThemeStore } from '../stores/theme'
import { useClickOutside } from '../composables/useClickOutside'

const router = useRouter()
const route = useRoute()
const store = usePostsStore()
const theme = useThemeStore()

const searchQuery = ref('')
const showSearch = ref(false)
const searchRef = ref(null)
const mobileMenuOpen = ref(false)
let debounceTimer = null

useClickOutside(searchRef, () => {
  showSearch.value = false
})

const debouncedQuery = ref('')

const searchResults = computed(() => {
  if (!debouncedQuery.value.trim()) return []
  const q = debouncedQuery.value.toLowerCase()
  return store.posts.filter(
    p =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
  )
})

function onSearchInput() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedQuery.value = searchQuery.value
  }, 200)
}

function goToPost(id) {
  searchQuery.value = ''
  showSearch.value = false
  router.push(`/post/${id}`)
}

function goToCategory(cat) {
  mobileMenuOpen.value = false
  router.push(`/r/${cat}`)
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-inner">
      <router-link to="/" class="nav-logo">
        <span class="logo-icon">◈</span>
        <span class="logo-text">Foro Vue</span>
      </router-link>

      <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen" :aria-label="mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'" :aria-expanded="mobileMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-links" :class="{ open: mobileMenuOpen }">
        <router-link to="/" class="nav-link" :class="{ active: route.name === 'home' && !route.params.category }" @click="mobileMenuOpen = false">
          Inicio
        </router-link>
        <a
          v-for="cat in store.categories"
          :key="cat"
          class="nav-link cat-link"
          :class="{ active: route.params.category === cat }"
          href="#"
          @click.prevent="goToCategory(cat)"
        >
          r/{{ cat }}
        </a>
      </div>

      <div class="nav-right">
        <div ref="searchRef" class="search-wrapper">
          <label for="search-input" class="sr-only">Buscar posts</label>
          <input
            id="search-input"
            v-model="searchQuery"
            type="text"
            placeholder="Buscar posts..."
            class="search-input"
            @focus="showSearch = true"
            @input="onSearchInput"
          />
          <div v-if="showSearch && searchResults.length > 0" class="search-dropdown">
            <div
              v-for="post in searchResults"
              :key="post.id"
              class="search-item"
              @mousedown.prevent="goToPost(post.id)"
            >
              <span class="search-item-title">{{ post.title }}</span>
              <span class="search-item-cat">r/{{ post.category }}</span>
            </div>
          </div>
          <div v-else-if="showSearch && debouncedQuery.trim() && searchResults.length === 0" class="search-dropdown">
            <div class="search-empty">Sin resultados</div>
          </div>
        </div>

        <button class="theme-toggle" @click="theme.toggle()" :title="theme.dark ? 'Modo claro' : 'Modo oscuro'">
          {{ theme.dark ? '☀️' : '🌙' }}
        </button>

        <router-link to="/crear" class="btn-nav-create">+ Nuevo</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
  height: 52px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: var(--text);
  font-weight: 700;
  font-size: 16px;
}

.nav-logo:hover {
  text-decoration: none;
}

.logo-icon {
  color: var(--accent);
  font-size: 20px;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
}

.mobile-toggle span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-link:hover {
  background: var(--bg-hover);
  color: var(--text);
  text-decoration: none;
}

.nav-link.active {
  background: var(--bg-active);
  color: var(--accent);
  font-weight: 600;
}

.nav-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-wrapper {
  position: relative;
}

.search-input {
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  width: 180px;
  transition: all 0.2s;
  background: var(--bg);
  color: var(--text);
}

.search-input:focus {
  outline: none;
  border-color: var(--accent);
  width: 240px;
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--shadow);
  max-height: 300px;
  overflow-y: auto;
}

.search-item {
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
}

.search-item:last-child {
  border-bottom: none;
}

.search-item:hover {
  background: var(--bg-hover);
}

.search-item-title {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 2px;
}

.search-item-cat {
  font-size: 11px;
  color: var(--accent);
}

.search-empty {
  padding: 14px;
  text-align: center;
  color: var(--text-light);
  font-size: 13px;
}

.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  line-height: 1;
  transition: background 0.2s;
}

.theme-toggle:hover {
  background: var(--bg-hover);
}

.btn-nav-create {
  background: var(--accent);
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
  white-space: nowrap;
}

.btn-nav-create:hover {
  background: var(--accent-hover);
  text-decoration: none;
  color: white;
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 52px;
    left: 0;
    right: 0;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    padding: 8px;
    gap: 2px;
  }

  .nav-links.open {
    display: flex;
  }

  .search-input {
    width: 140px;
  }

  .search-input:focus {
    width: 180px;
  }
}
</style>
