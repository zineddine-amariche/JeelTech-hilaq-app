// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: "#EFE8DE",
  backgroundTop: "#EFE8DE",
  backgroundBottom: "#DBC9B3",
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,

  /* App Colors */
  loadingBackground: "rgba(0, 0, 0, .3)",
  placeholderText: "#989898",
  dimDarkBG: "rgba(0, 0, 0, 0.2)",
  primaryButton: "#A27632",
  secondaryButton: "#8D806B",
  selectedButton: "#473B28",
  appBG: "#DCCAB4",
  elementBG: "rgba(0, 0, 0, 0.05)", // "#C8BCAD",
  clickableElementBG: "#FFFFFF",
  tabBarBG: "rgba(0, 0, 0, 0.1)",
  badgeTint: "#B0936B",
  messageBG: "rgba(255,255,255,0.7)",
  topTabBarBG: "rgba(255,255,255,0.3)",
  topTabBarIndicatorBG: "#000000", // 3D3D3D
  schoolElementBG: "#F7F7F7",

  primaryButtonText: "#FFFFFF",
  secondaryButtonText: "#FFFFFF",
  selectedButtonText: "#473B28",
  appText: "#000000",
  elementText: "#000000",
  elementBodyText: "#4B4B4B",
  clickableElementText: "#000000",
  messageBodyText: "#000000",
  messageBodyLink: "#A27632",
  messageDateText: "#5A5A5A",
  messageBodyTextLight: "#ffffff",
  messageBodyLinkLight: "#E4DACB",
  messageDateTextLight: "#e5e5e5",
  successText: "#088100",
  topTabBarActiveText: "#000000",
  topTabBarInactiveText: "#616161",

  alert: "#B24444",
  lateText: "#CB8800",
  nextText: "#005EA1",

  notificationKnob: "rgba(178,68,68,0.80)",

  disabledInput: "rgba(255, 255, 255, 0.7)",
}
