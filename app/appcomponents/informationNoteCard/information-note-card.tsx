import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { InformationNoteCardProps } from "./information-note-card.props"
import { colors, metrics } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "app/components"

/**
 * InformationNoteCard.
 */
export const InformationNoteCard: React.FunctionComponent<InformationNoteCardProps> = (props) => {
  const { titleText, titleTx, bodyMainText, bodyMainTx, bodyText, bodyTx, bodyStyle, style } = props
  const title = titleText || (titleTx && translate(titleTx as TxKeyPath)) || ""
  const bodyMain = bodyMainText || (bodyMainTx && translate(bodyMainTx as TxKeyPath)) || null
  const body = bodyText || (bodyTx && translate(bodyTx as TxKeyPath)) || null

  return (
    <View style={{ ...$root, ...style }}>
      <View style={$body}>
        <View style={$top}>
          <Text style={$titleText} text={title} numberOfLines={1} ellipsizeMode="tail" />
        </View>
        <View style={$bottom}>
          {body ? <Text style={$bodyText} text={body} /> : null}
          {bodyMain ? <Text style={{ ...$bodyMainText, ...bodyStyle }} text={bodyMain} /> : null}
        </View>
      </View>
    </View>
  )
}

// static styles
const $root: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
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
  flexDirection: "row",
  minHeight: 50,
}
const $bottom: ViewStyle = {
  flexDirection: "row",
  marginTop: -5,
  marginBottom: 10,
  alignSelf: "center",
}
const $titleText: TextStyle = {
  textAlignVertical: "center",
  flex: 1,
  textAlign: "center",
  fontSize: 16,
  // fontFamily: typography.secondary.medium,
  color: colors.elementText,
  alignSelf: "center",
}
const $bodyMainText: TextStyle = {
  textAlignVertical: "center",
  textAlign: "right",
  fontSize: 22,
  color: colors.successText,
}
const $bodyText: TextStyle = {
  textAlignVertical: "center",
  textAlign: "right",
  fontSize: 16,
  color: colors.elementBodyText,
  marginTop: 2,
  marginRight: 2,
}
