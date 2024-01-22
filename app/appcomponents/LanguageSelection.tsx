// LanguageSelection.js

import { useNavigation } from "@react-navigation/native"
import { Button } from "app/components"
import { translate } from "app/i18n"
import { useStores } from "app/models"
import { spacing } from "app/theme"
import React from "react"
import { Alert, View, ViewStyle } from "react-native"
import RNRestart from "react-native-restart"

const LanguageSelection = () => {
  const {
    parentStore: { setLocale, locale, school },
  } = useStores()

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale)

    Alert.alert(
      translate("settingsScreen.changeLanguage"),
      translate("settingsScreen.setupLanguage"),
      [{ text: translate("common.ok"), onPress: () => RNRestart.Restart() }],
    )
  }
  const navigation = useNavigation()

  return (
    <View style={$container}>
      {locale !== "ar" && (
        <Button
          style={{ width: "100%" }}
          onPress={() => {
            changeLanguage("ar")
            if (locale) {
              if (school) {
                navigation.navigate("Children")
              } else {
                navigation.navigate("Welcome")
              }
            }
          }}
        >
          اللغة العربية
        </Button>
      )}
      {locale !== "en" && (
        <Button
          style={{ width: "100%" }}
          onPress={() => {
            changeLanguage("en")
            if (locale) {
              if (school) {
                navigation.navigate("Children")
              } else {
                navigation.navigate("Welcome")
              }
            }
          }}
        >
          English
        </Button>
      )}
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  gap: spacing.md,
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}

export default LanguageSelection
