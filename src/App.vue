<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import ToastNotif from './components/ToastNotif.vue'
import { useThemeStore } from './stores/theme'

const theme = useThemeStore()

onMounted(() => {
  theme.apply()
})
</script>

<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <ToastNotif />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

.main-content {
  padding: 24px 16px;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
