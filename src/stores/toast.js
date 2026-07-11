import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    message: '',
    type: 'success',
    visible: false,
    _timer: null
  }),
  actions: {
    show(msg, type = 'success') {
      if (this._timer) clearTimeout(this._timer)
      this.message = msg
      this.type = type
      this.visible = true
      this._timer = setTimeout(() => this.visible = false, 3000)
    }
  }
})
