import { Text } from "app/components"
import { TxKeyPath, translate } from "app/i18n"
import { colors, metrics, spacing, typography } from "app/theme"
import * as React from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
  Platform,
} from "react-native"
const defaultMaleImg = require("./student-male-image.jpg")
const defaultFemaleImg = require("./student-female-image.png")

const cardHeight = Platform.OS === "ios" ? 88 : 100

// static styles
const $root: ViewStyle = {
  height: cardHeight,
  justifyContent: "center",
  alignItems: "center",
}
const $cardContainer: ViewStyle = {
  flexDirection: "row",
}
const $card: ViewStyle = {
  flex: 1,
  backgroundColor: colors.clickableElementBG,
  justifyContent: "flex-start",
  marginLeft: 20,
  shadowColor: "#000000",
  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowRadius: 3,
  shadowOpacity: 0.2,
  elevation: 5,
  borderRadius: metrics.clickableElementRadius,
}
const $body: ViewStyle = {
  marginRight: spacing.md,
  marginLeft: cardHeight - 8,
  marginVertical: spacing.md,
}
const $titleText: TextStyle = {
  textAlign: "left",
  fontSize: 20,
  fontFamily: typography.fonts.tajawal.bold,
  color: colors.clickableElementText,
}
const $subtitleText: TextStyle = {
  textAlign: "left",
  fontSize: 16,
  color: colors.clickableElementText,
  // fontFamily: typography.fonts.tajawal.medium,
}
const $imageContainer: ViewStyle = {
  position: "absolute",
  width: cardHeight,
  height: cardHeight,
  borderRadius: cardHeight / 2,
  borderColor: colors.clickableElementBG,
  backgroundColor: colors.palette.neutral100,
  left: 0,
  top: -8,
  shadowColor: "#000000",
  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowRadius: 3,
  shadowOpacity: 0.5,
  elevation: 6,
}
const $image: ImageStyle = {
  height: cardHeight - 8,
  width: cardHeight - 8,
  resizeMode: "cover",
  borderRadius: (cardHeight - 8) / 2,
  alignSelf: "center",
  marginTop: 4,
}
const $notificationKnob: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  height: 10,
  width: 10,
  backgroundColor: colors.notificationKnob,
  borderRadius: 10,
}

export interface ChildCardProps {
  /**
   * i18n
   */
  titleTx?: string

  /**
   * non-i18n
   */
  titleText?: string

  /**
   * i18n
   */
  subtitleTx?: string

  /**
   * non-i18n
   */
  subtitleText?: string

  /**
   * image
   */
  cardImage?: string

  gender?: string

  notificationKnob?: boolean

  /**
   * What happens when you press the card
   */
  onPress?(): void

  /**
   * Container style overrides.
   */
  style?: ViewStyle
}

/**
 * ChildCard.
 */
export const ChildCard: React.FunctionComponent<ChildCardProps> = (props) => {
  const {
    onPress,
    titleText,
    titleTx,
    subtitleText,
    subtitleTx,
    cardImage,
    gender,
    style,
    notificationKnob,
  } = props
  const title = titleText || (titleTx && translate(titleTx as TxKeyPath)) || ""
  const subtitle = subtitleText || (subtitleTx && translate(subtitleTx as TxKeyPath)) || ""

  return (
    <View style={{ ...$root, ...style }}>
      <View style={$cardContainer}>
        <View style={$card}>
          <TouchableOpacity style={$body} onPress={onPress}>
            {notificationKnob ? <View style={$notificationKnob}></View> : null}
            <Text style={$titleText} text={title} numberOfLines={1} ellipsizeMode="tail" />
            <Text style={$subtitleText} text={subtitle} numberOfLines={1} ellipsizeMode="tail" />
          </TouchableOpacity>
        </View>
        <View style={$imageContainer}>
          <Image
            source={
              cardImage != null
                ? { uri: cardImage }
                : gender === "female"
                ? defaultFemaleImg
                : defaultMaleImg
            }
            style={$image}
          />
        </View>
      </View>
    </View>
  )
}
