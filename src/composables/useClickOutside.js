import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(elRef, callback) {
  function onClick(e) {
    if (elRef.value && !elRef.value.contains(e.target)) {
      callback()
    }
  }
  onMounted(() => document.addEventListener('click', onClick))
  onUnmounted(() => document.removeEventListener('click', onClick))
}
