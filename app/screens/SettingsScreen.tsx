import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import LanguageSelection from "app/appcomponents/LanguageSelection"
import AppLayout from "app/appcomponents/appLayout"
import { useHeader } from "app/utils/useHeader"
import { colors, spacing } from "app/theme"

interface SettingsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Settings">> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen() {
  useHeader({
    titleTx: "settingsScreen.chooseLanguage",
  })

  return (
    <AppLayout>
      <Screen
        backgroundColor={colors.transparent}
        contentContainerStyle={$screenContentContainer}
        preset="fixed"
        safeAreaEdges={["bottom"]}
      >
        <LanguageSelection />
      </Screen>
    </AppLayout>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
