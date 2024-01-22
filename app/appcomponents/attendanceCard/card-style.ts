import { colors, metrics } from "app/theme"
import { ViewStyle, TextStyle, ImageStyle } from "react-native"

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
  backgroundColor: colors.clickableElementBG,
  shadowColor: "#00000040",
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowRadius: 5,
  shadowOpacity: 1.0,
  borderRadius: metrics.clickableElementRadius,
  paddingHorizontal: 40,
  paddingVertical: 10,
}
export const $top: ViewStyle = {
  width: "100%",
  flexDirection: "row-reverse",
  justifyContent: "space-between",
}
export const $bottom: ViewStyle = {
  width: "100%",
  flexDirection: "row-reverse",
}
export const $titleText: TextStyle = {
  textAlignVertical: "bottom",
  flex: 1,
  textAlign: "left",
  fontSize: 20,
  // fontFamily: typography.secondary,
  color: colors.clickableElementText,
}
export const $dateText: TextStyle = {
  textAlignVertical: "center",
  textAlign: "left",
  fontSize: 13,
  color: colors.clickableElementText,
  // fontFamily: typography.fonts.Tajawal.medium,
}
export const $presenceText: TextStyle = {
  textAlignVertical: "center",
  textAlign: "right",
  fontSize: 12,
  color: colors.clickableElementText,
  height: 20,
}
export const $badges: ViewStyle = {
  flex: 1,
  flexDirection: "row-reverse",
}
export const $badgeContainer: ViewStyle = {
  marginRight: 10,
}
export const $badge: ImageStyle = {
  tintColor: colors.badgeTint,
  height: 20,
}
export const $absentText: TextStyle = {
  color: colors.alert,
}
export const $presentText: TextStyle = {
  color: colors.successText,
}
export const $lateText: TextStyle = {
  color: colors.lateText,
}
export const $isNewKnob: ViewStyle = {
  position: "absolute",
  top: 10,
  left: 10,
  height: 10,
  width: 10,
  backgroundColor: colors.notificationKnob,
  borderRadius: 10,
}
