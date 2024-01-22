import { colors } from "app/theme"
import * as React from "react"
import { View, ViewStyle, ActivityIndicator } from "react-native"

/**
 * Loading.
 */
export const Loading: React.FunctionComponent<any> = () => {
  return (
    <View style={$loadingView}>
      <ActivityIndicator style={$indicator} color="white" size="large" />
    </View>
  )
}

const $loadingView: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.loadingBackground,
}
const $indicator: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
