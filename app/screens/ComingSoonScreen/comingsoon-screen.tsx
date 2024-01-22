import * as React from "react"
import { View, Image, ViewStyle, ImageStyle, TextStyle } from "react-native"
import { Text } from "../../components"
import { useRoute } from "@react-navigation/native"
import { TxKeyPath } from "../../i18n"
import AppLayout from "app/appcomponents/appLayout"
import { spacing } from "app/theme"
const comingsoonImage = require("./hourglass.png")

export const ComingsoonScreen = () => {
  const route = useRoute()

  return (
    <AppLayout>
      <View style={$root}>
        <Image source={comingsoonImage} style={$image} />
        <Text tx={("tab." + route.name.toLowerCase() + "_soon") as TxKeyPath} style={$text} />
      </View>
    </AppLayout>
  )
}

const $root: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  paddingHorizontal: spacing.xl,
}

const $image: ImageStyle = {
  marginBottom: 20,
}

const $text: TextStyle = {
  fontSize: 16,
  textAlign: "center",
}
