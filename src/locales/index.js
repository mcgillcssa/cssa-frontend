import { createI18n } from 'vue-i18n'
import en from './en.js'
import zh from './zh.js'
import fr from './fr.js'

const messages = {
  en,
  zh,
  fr
}

// 从localStorage获取语言设置，默认为中文
const savedLocale = localStorage.getItem('locale') || 'zh'

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'zh',
  messages,
  legacy: false,
  globalInjection: true
})

export default i18n