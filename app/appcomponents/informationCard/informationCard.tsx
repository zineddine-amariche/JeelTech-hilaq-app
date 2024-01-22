import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { InformationCardProps } from "./informationCard.props"
import { colors, metrics } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "app/components"

/**
 * InformationCard.
 */
export const InformationCard: React.FunctionComponent<InformationCardProps> = (props) => {
  const { titleText, titleTx, bodyText, bodyTx, rightElem, leftElem, style } = props
  const title = titleText || (titleTx && translate(titleTx as TxKeyPath)) || ""
  const body = bodyText || (bodyTx && translate(bodyTx as TxKeyPath)) || null

  return (
    <View style={{ ...$root, ...style }}>
      <View style={$body}>
        <View style={$top}>
          {leftElem ? <View style={$leftElem}>{leftElem}</View> : null}
          <Text
            style={$titleText}
            text={title}
            numberOfLines={1}
            preset="bold"
            ellipsizeMode="tail"
          />
          {rightElem ? <View style={$rightElem}>{rightElem}</View> : null}
        </View>
        {body ? <Text style={$bodyText} text={body} /> : null}
      </View>
    </View>
  )
}

// static styles
const $root: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}
const $body: ViewStyle = {
  alignSelf: "baseline",
  backgroundColor: colors.elementBG,
  borderRadius: metrics.elementRadius,
  paddingHorizontal: 20,
  minHeight: 50,
}
const $top: ViewStyle = {
  width: "100%",
  flexDirection: "row-reverse",
  minHeight: 50,
}
const $titleText: TextStyle = {
  textAlignVertical: "center",
  flex: 1,
  textAlign: "left",
  fontSize: 16,
  // fontFamily: typography.secondary.medium,
  color: colors.elementText,
  alignSelf: "center",
}
const $bodyText: TextStyle = {
  textAlignVertical: "bottom",
  textAlign: "left",
  fontSize: 16,
  color: colors.elementBodyText,
  marginBottom: 15,
}
const $rightElem: ViewStyle = {
  minWidth: 20,
  marginLeft: 15,
  alignContent: "center",
  justifyContent: "center",
}
const $leftElem: ViewStyle = {
  minWidth: 20,
  marginLeft: 15,
  alignContent: "center",
  justifyContent: "center",
}
