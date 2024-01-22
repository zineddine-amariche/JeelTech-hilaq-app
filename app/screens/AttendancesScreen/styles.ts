import { spacing, typography } from "app/theme"
import { TextStyle, ViewStyle } from "react-native"

export const $screen: ViewStyle = {
  flexGrow: 1,
  width: "100%",
  padding: spacing["md"],
  backgroundColor: "transparent",
}
export const $container: ViewStyle = {
  flex: 1,
  width: "100%",
}
export const $attendanceCard: ViewStyle = {
  marginVertical: 10,
  marginHorizontal: 5,
}
export const $cardsHeader: TextStyle = {
  paddingTop: 10,
  fontFamily: typography.primary.bold,
}

export const $textContainer: ViewStyle = {
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
}
export const $text: TextStyle = {
  fontSize: 16,
  textAlign: "center",
  lineHeight: 24,
}
