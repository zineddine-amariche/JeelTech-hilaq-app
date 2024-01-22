import { colors, metrics, spacing, typography } from '../../theme';
import { TextStyle, ViewStyle, ImageStyle, Dimensions } from 'react-native';


export const $full: ViewStyle = { flex: 1, backgroundColor: "transparent" }
export const $screen: ViewStyle = {
  flex: 1,
  padding:spacing.md
}
export const $indicator: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
export const $container: ViewStyle = {
  flex: 1,
  alignItems:"center",
  padding: spacing.md,

}
export const $button: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.clickableElementBG,
  shadowColor: "#000000",
  shadowOffset: {
    width: 3,
    height: 14,
  },
  shadowRadius: 5,
  shadowOpacity: 1.0,
  borderRadius: metrics.clickableElementRadius,
  paddingHorizontal: 40,
  paddingVertical: 10,
}
export const $titleText: TextStyle = {
  marginHorizontal: spacing.md,
  fontSize: 20,
}
export const $textContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  height: "100%",
}
export const $text: TextStyle = {
  fontSize: 16,
  textAlign: "center",
  lineHeight: 24,
}

export const $pdf : ViewStyle ={
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

export const $buttonBack : ViewStyle={
    right: 10,
    zIndex: 9,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: 40,
    alignSelf: "flex-end",
}

export const $containerModal : ViewStyle={
  flex:1,
}

export const $Icon : ImageStyle={ width: 15, height: 15 }