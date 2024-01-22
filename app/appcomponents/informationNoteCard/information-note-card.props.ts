import { ViewStyle, TextStyle } from "react-native"

export interface InformationNoteCardProps {
  /**
   * i18n
   */
  titleTx?: string

  /**
   * non-i18n
   */
  titleText?: string

  bodyMainTx?: string
  bodyMainText?: string

  bodyTx?: string
  bodyText?: string
  bodyStyle?: TextStyle

  /**
   * Container style overrides.
   */
  style?: ViewStyle
}
