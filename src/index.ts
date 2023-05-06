export { createApp } from './app'
export { nextTick } from './scheduler'
export { reactive } from 'vue'

import { createApp } from './app'

const s = document.currentScript
if (s && s.hasAttribute('init')) {
  createApp().mount()
}
