import { defineStore } from 'pinia'

function getDefaultDark() {
  const stored = localStorage.getItem('darkMode')
  if (stored !== null) return JSON.parse(stored)
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    dark: getDefaultDark()
  }),

  actions: {
    toggle() {
      this.dark = !this.dark
      try {
        localStorage.setItem('darkMode', JSON.stringify(this.dark))
      } catch (e) {
        console.warn('No se pudo guardar tema en localStorage:', e)
      }
      this.apply()
    },
    apply() {
      document.documentElement.setAttribute('data-theme', this.dark ? 'dark' : 'light')
    }
  }
})
