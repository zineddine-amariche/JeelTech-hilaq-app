import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import * as Localization from "expo-localization"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { I18nManager } from "react-native"
import RNRestart from "react-native-restart"

import en, { Translations } from "./en"
import ar from "./ar"

const languageDetector = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      // get stored language from Async storage
      await AsyncStorage.getItem("locale").then((language) => {
        if (language) {
          // if language was stored before, use this language in the app
          return callback(language)
        } else {
          // if language was not stored yet, use device's locale
          return callback(Localization.locale)
        }
      })
    } catch (error) {
      console.log("Error reading language", error)
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      // save a user's language choice in Async storage
      await AsyncStorage.setItem("locale", language)
    } catch (error) {}
  },
}

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: "v3",
    resources: {
      en: {
        translation: {
          ...en,
        },
      },
      ar: {
        translation: {
          ...ar,
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    react: {
      useSuspense: false,
    },
  })
  .then(() => {
    isRTL = i18n.dir() === "rtl"
    I18nManager.forceRTL(isRTL)
    if (isRTL !== I18nManager.isRTL) {
      RNRestart.restart()
    }
  })

export let isRTL = false

export default i18n

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text
