<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({
  message: { type: String, default: '¿Estás seguro?' }
})

const emit = defineEmits(['confirm', 'cancel'])

const dialogRef = ref(null)

function onKeydown(e) {
  if (e.key === 'Escape') emit('cancel')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  dialogRef.value?.focus()
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="confirm-overlay" @click="emit('cancel')">
    <div ref="dialogRef" class="confirm-dialog" role="dialog" aria-modal="true" tabindex="-1" @click.stop>
      <p>{{ message }}</p>
      <div class="confirm-actions">
        <button class="btn-cancel" @click="emit('cancel')">Cancelar</button>
        <button class="btn-confirm-delete" @click="emit('confirm')">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.confirm-dialog {
  background: var(--bg-card);
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 16px var(--shadow);
}

.confirm-dialog:focus {
  outline: none;
  box-shadow: 0 4px 16px var(--shadow), 0 0 0 2px var(--accent);
}

.confirm-dialog p {
  margin: 0 0 16px;
  font-size: 15px;
}

.confirm-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn-cancel,
.btn-confirm-delete {
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-cancel {
  background: var(--bg-hover);
  color: var(--text);
}

.btn-confirm-delete {
  background: var(--danger);
  color: white;
}
</style>
