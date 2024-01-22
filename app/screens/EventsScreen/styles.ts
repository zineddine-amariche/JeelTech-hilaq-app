import { spacing } from "app/theme"
import { TextStyle, ViewStyle } from "react-native"

export const $full: ViewStyle = { flex: 1, backgroundColor: "transparent" }
export const $screen: ViewStyle = {
  flexGrow: 1,
  width: "100%",
  padding: spacing.sm,
  backgroundColor: "transparent",
}
export const $container: ViewStyle = {
  flex: 1,
  width: "100%",
}
export const $eventCard: ViewStyle = {
  marginVertical: 10,
}
export const $cardsHeader: ViewStyle = { paddingTop: 10 }
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
