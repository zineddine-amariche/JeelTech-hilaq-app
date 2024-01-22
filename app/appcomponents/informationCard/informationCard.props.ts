import { ViewStyle } from "react-native"

export interface InformationCardProps {
  /**
   * i18n
   */
  titleTx?: string

  /**
   * non-i18n
   */
  titleText?: string

  bodyTx?: string
  bodyText?: string

  rightElem?: any
  leftElem?: any

  /**
   * Container style overrides.
   */
  style?: ViewStyle
}
