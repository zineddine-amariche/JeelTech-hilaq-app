// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import {
  Tajawal_200ExtraLight as tajawalExtraLight,
  Tajawal_300Light as tajawalLight,
  Tajawal_400Regular as tajawalRegular,
  Tajawal_500Medium as tajawalMedium,
  Tajawal_700Bold as tajawalBold,
  Tajawal_800ExtraBold as tajawalExtraBold,
  Tajawal_900Black as tajawalBlack,
} from "@expo-google-fonts/tajawal"

export const customFontsToLoad = {
  tajawalExtraLight,
  tajawalLight,
  tajawalRegular,
  tajawalMedium,
  tajawalBold,
  tajawalExtraBold,
  tajawalBlack,
}

const fonts = {
  tajawal: {
    // Cross-platform Google font.
    extraLight: "tajawalExtraLight",
    light: "tajawalLight",
    normal: "tajawalRegular",
    medium: "tajawalMedium",
    bold: "tajawalBold",
    extraBold: "tajawalExtraBold",
    black: "tajawalBlack",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.tajawal,
}
