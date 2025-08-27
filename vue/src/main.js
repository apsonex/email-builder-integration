// src/main.js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ApxEmailBuilder from '@apsonex-email-builder/core'; // 👈 import EmailBuilder from core package
import emailConfig from './config/email-builder-config'; // 👈 import EmailBuilder config

createApp(App)
    .use(ApxEmailBuilder, emailConfig()) // 👈 use EmailBuilder Package and provide Configuration
    .mount('#app')
