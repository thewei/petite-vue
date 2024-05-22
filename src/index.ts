export { createApp } from './app';
export { nextTick } from './scheduler';
export { version } from '../package.json';

import { createApp } from './app';

const s = document.currentScript;
if (s && s.hasAttribute('init')) {
  createApp().mount();
}

export const reactive = window.Vue.reactive;
