import React from "react"
import { Image, View, ViewStyle } from "react-native"
import { presets } from "./wallpaper.presets"
import { WallpaperProps } from "./wallpaper.props"

const defaultBackgroundImage = require("./bg.png")
const defaultSilhouetteImage = require("./app_logo_silhouette.png")

const $root: ViewStyle = {
  flex: 1,
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
}
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const { preset = "stretch", style: styleOverride, backgroundImage, silhouetteImage } = props

  // assemble the style
  const presetToUse = presets[preset] || presets.stretch
  const style = { ...presetToUse, ...styleOverride }

  // figure out which image to use
  const backgroundSource = backgroundImage || defaultBackgroundImage
  const silhouetteSource = silhouetteImage || defaultSilhouetteImage

  return (
    <View style={presets.stretch}>
      <Image source={backgroundSource} style={style} />
      <View style={$root}>
        <Image source={silhouetteSource} style={{ opacity: 0.03 }} />
      </View>
    </View>
  )
}
