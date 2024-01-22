import { View, ViewStyle } from "react-native"
import React from "react"
import { Wallpaper } from "../wallpaper/wallpaper"

const AppLayout = ({ children }) => {
  return (
    <View style={$full}>
      <Wallpaper />
      {children}
    </View>
  )
}

export default AppLayout
export const $full: ViewStyle = { flex: 1, backgroundColor: "transparent" }
