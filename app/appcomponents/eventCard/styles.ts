import { colors } from "../../theme"
import { TextStyle, ViewStyle } from "react-native"

// static styles
export const $root: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}
export const $dim: ViewStyle = {
  opacity: 0.8,
}
export const $body: ViewStyle = {
  alignSelf: "baseline",
  backgroundColor: colors.messageBG,
  shadowColor: "#000000",
  shadowOffset: {
    width: 3,
    height: 14,
  },
  shadowRadius: 5,
  shadowOpacity: 1.0,
  paddingHorizontal: 20,
  paddingVertical: 14,
}
export const $top: ViewStyle = {
  width: "100%",
  flexDirection: "row",
}
export const $bottom: ViewStyle = {
  width: "100%",
  flexDirection: "row",
}
export const $titleText: TextStyle = {
  textAlignVertical: "bottom",
  flex: 1,
  textAlign: "right",
  fontSize: 20,
  // fontFamily: typography.fonts.Tajawal.medium,
  color: colors.clickableElementText,
}
export const $dateText: TextStyle = {
  textAlignVertical: "center",
  textAlign: "left",
  fontSize: 14,
  color: colors.clickableElementText,
}
export const $presenceText: TextStyle = {
  flex: 1,
  textAlignVertical: "center",
  textAlign: "right",
  fontSize: 14,
  color: colors.clickableElementText,
  height: 20,
  marginTop: 5,
}
export const $absentText: TextStyle = {
  color: colors.alert,
}
export const $presentText: TextStyle = {
  color: colors.successText,
}
export const $nextText: TextStyle = {
  color: colors.nextText,
}
