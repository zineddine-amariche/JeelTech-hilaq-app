import { isRTL } from "app/i18n"
import { colors, metrics, spacing, typography } from "app/theme"
import { TextStyle, ViewStyle, ImageStyle, Platform } from "react-native"

export const $container: ViewStyle = {
  backgroundColor: colors.transparent,
  paddingHorizontal: spacing.xs,
  alignContent: "center",
  justifyContent: "center",
  flex: 1,
}
export const $footerContainer: ViewStyle = {
  backgroundColor: colors.transparent,
  paddingHorizontal: spacing.xxs,
}
export const LOGO: ImageStyle = {
  alignSelf: "center",
  maxWidth: "100%",
  width: 180,
  height: 180,
}
export const $siContainer: ViewStyle = {
  flexDirection: "row-reverse",
  alignItems: "center",
  marginBottom: 8,
}
export const $siTextCon: ViewStyle = {
  flexDirection: "column",
  alignItems: "flex-end",
  marginLeft: 18,
}
export const $studentImage: ImageStyle = {
  height: 70,
  width: 70,
  resizeMode: "cover",
  borderRadius: 100 / 2,
}
export const $studentImageReq: ImageStyle = {
  backgroundColor: colors.alert,
  borderColor: colors.alert,
  borderWidth: 3,
}
export const $inputTitle: TextStyle = {
  fontSize: 17,
  color: colors.appText,
  paddingTop: 8,
  paddingBottom: 10,
  textAlign: "left",
}
export const $inputView: ViewStyle = {
  backgroundColor: colors.clickableElementBG,
  borderRadius: metrics.clickableElementRadius,
}

export const $inputViewDisabled: ViewStyle = {
  backgroundColor: colors.disabledInput,
  borderRadius: metrics.elementRadius,
}
export const $inputText: TextStyle = {
  color: colors.clickableElementText,
  paddingHorizontal: 10,
  writingDirection: isRTL ? "rtl" : "ltr",
  height: 50,
  width: "100%",
  textAlignVertical: "center",
  paddingTop: Platform.OS == "ios" ? 15 : 1, // Adjust this value to vertically center the text
  fontFamily: typography.primary.normal,
}
export const $inputTextLeft: TextStyle = {
  color: colors.clickableElementText,
  paddingHorizontal: 10,
  textAlign: "left",
  height: 50,
  width: "100%",
  textAlignVertical: "center",
  paddingTop: Platform.OS == "ios" ? 15 : 0, // Adjust this value to vertically center the text
}
export const $mainButton: ViewStyle = {
  backgroundColor: colors.primaryButton,
  marginTop: 20,
  borderRadius: 16,
}
export const $inputBtn: ViewStyle = {
  backgroundColor: colors.clickableElementBG,
  height: 50,
  width: "100%",
  paddingVertical: 0,
  paddingHorizontal: 0,
}
export const $mainButtonText: TextStyle = {
  color: colors.clickableElementText,

  // fontFamily: typography.primary.semiBold,
}
export const $secondaryButton: ViewStyle = {
  backgroundColor: colors.secondaryButton,
  marginTop: 14,
  borderRadius: 16,
}
export const $secondaryButtonText: TextStyle = {
  color: colors.secondaryButtonText,
  // fontFamily: typography.fonts.Tajawal.semiBold,
}
export const $elementsContainer: ViewStyle = {
  paddingVertical: spacing["lg"],
  paddingHorizontal: spacing["lg"],
}
export const $footerText: TextStyle = {
  color: colors.appText,
  paddingHorizontal: spacing[5],
  textAlign: "center",
}
export const $loadingView: ViewStyle = {
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
export const $indicator: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: 250,
}
export const $personText: TextStyle = {
  textAlign: "left",
  marginHorizontal: spacing["sm"],
  fontSize: 20,
}

export const $button: ViewStyle = {
  alignSelf: "flex-start",
  margin: 20,
  flexDirection: "row",
}
export const $ddCon: ViewStyle = {
  height: 50,
  backgroundColor: colors.clickableElementBG,
  borderRadius: metrics.clickableElementRadius,
}
export const $picker: ViewStyle = {
  height: "100%",
  width: "100%",
}
export const $pickerItem: TextStyle = {
  fontFamily: typography.primary.medium,
}
export const $reqTxt: TextStyle = {
  color: colors.alert,
  fontFamily: typography.primary.light,
}
export const $floatingEditTo: ViewStyle = {
  position: "absolute",
  width: 50,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
  ...(isRTL ? { left: 20 } : { right: 20 }),
  bottom: 20,
  borderRadius: 100 / 2,
  backgroundColor: colors.primaryButton,
}
export const $floatingBtn: ImageStyle = {
  resizeMode: "contain",
  width: 50,
  height: 50,
}
export const $textError: TextStyle = {
  color: colors.alert,
  fontFamily: typography.primary.normal,
}

export const $inputError: ViewStyle = {
  borderColor: colors.alert,
  borderWidth: 2,
}
