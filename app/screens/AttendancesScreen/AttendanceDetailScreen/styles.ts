import { colors, spacing } from "app/theme"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"

export const $full: ViewStyle = { backgroundColor: "#142" }
export const $screen: ViewStyle = {
  flex: 1,
  width: "100%",
  padding: spacing.lg,
  backgroundColor: "transparent",
}
export const $container: ViewStyle = {
  flexGrow: 1,
  width: "100%",
}
export const $informationCard: ViewStyle = {
  marginVertical: 10,
}
export const $headRow: ViewStyle = {
  paddingTop: 10,
  flexDirection: "row-reverse",
  width: "100%",
}
export const $presenceText: TextStyle = {
  textAlignVertical: "bottom",
  fontSize: 16,
  marginLeft: 0,
  marginRight: 10,
}
export const $headLeftDate: TextStyle = {
  flex: 1,
  textAlign: "right",
  textAlignVertical: "center",
  paddingRight: 0,
}
export const $headRight: TextStyle = {
  textAlign: "right",
  textAlignVertical: "center",
}
export const $separator: ViewStyle = {
  borderBottomColor: colors.dimDarkBG,
  borderBottomWidth: 1,
  paddingVertical: 2,
  flex: 1,
}
export const $separatorContainer: ViewStyle = {
  flexDirection: "row-reverse",
  alignItems: "center",
  marginVertical: 10,
}
export const $infoCardIcon: ImageStyle = {
  alignSelf: "center",
  tintColor: null,
}
export const $infoCardIconAlert: ImageStyle = {
  tintColor: colors.alert,
}
export const $infoCardIconMessage: ImageStyle = {
  tintColor: "white",
}
export const $infoCardText: TextStyle = {
  alignSelf: "center",
  color: colors.successText,
  fontSize: 22,
}
export const $infoCardTextMistakes: TextStyle = {
  alignSelf: "center",
  color: colors.error,
  fontSize: 22,
}
export const $markRow: ViewStyle = {
  flexDirection: "row",
}
export const $verticalSeparator: ViewStyle = {
  width: 20,
}
export const $image: ImageStyle = {
  marginVertical: 20,
  tintColor: colors.alert,
}
export const $absentContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
}
export const $absentText: TextStyle = {
  textAlign: "center",
  fontSize: 24,
  color: colors.alert,
}
export const $markText: TextStyle = {
  textAlign: "right",
  textAlignVertical: "center",
  fontSize: 16,
  color: colors.elementBodyText,
  marginTop: 2,
  marginRight: 2,
}
export const $lateText: TextStyle = {
  color: colors.lateText,
}
export const $prensentText: TextStyle = {
  color: colors.successText,
}
