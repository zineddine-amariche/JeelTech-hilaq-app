import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import AppLayout from "app/appcomponents/appLayout"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { useHeader } from "app/utils/useHeader"
import LanguageSelection from "app/appcomponents/LanguageSelection"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SettingsLangugesScreenProps extends NativeStackScreenProps<AppStackScreenProps<"SettingsLanguges">> {}

export const SettingsLangugesScreen: FC<SettingsLangugesScreenProps> = observer(function SettingsLangugesScreen() {
  const navigation = useNavigation()

  const onNavigate = () => {
    navigation.goBack()
  }
  useHeader({
    titleTx: "settingsScreen.changeLanguage",
    rightIcon: "back",
    titleMode: "flex",
    onRightPress: onNavigate,
  })

  return (
    <AppLayout>
    <Screen
      backgroundColor={colors.transparent}
      contentContainerStyle={$container}
      preset="fixed"
      safeAreaEdges={["bottom"]}
    >
        <LanguageSelection />
     
    </Screen>
  </AppLayout>
  )
})


const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  padding:spacing.md
}