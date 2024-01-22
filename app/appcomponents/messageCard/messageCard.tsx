import * as React from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Image,
  Text as ReactNativeText,
} from "react-native"
import { MessageCardProps } from "./messageCard.props"
import { colors } from "../../theme"
import moment from "moment"
import Hyperlink from "react-native-hyperlink"
import { Text } from "app/components"

const schoolLogo = require("../../assets/app_logo.png")

/**
 * MessageCard.
 */
export const MessageCard: React.FunctionComponent<MessageCardProps> = (props) => {
  const { messageBody, messageDate, messageDateTimestamp, fromAdmin, style, parent } = props
  const dateText = messageDateTimestamp
    ? moment(messageDateTimestamp).format("hh:mm dddd D MMMM YYYY ")
    : messageDate

  return (
    <View style={[$root, style]}>
      {!parent && <Image style={$image} source={schoolLogo} />}

      <View style={[$messageCard, parent && $messageCardParent]}>
        <Hyperlink linkDefault={true} linkStyle={[$bodyLink, parent && $parentBodyLink]}>
          <ReactNativeText style={[$bodyText, parent && $parentBodyText]}>
            {messageBody}
          </ReactNativeText>
        </Hyperlink>
        <Text style={[$dateText, parent && $parentDateText]} text={dateText} />
      </View>
    </View>
  )
}

// static styles
const $root: ViewStyle = {
  flexDirection: "row-reverse",
}
const $bodyText: TextStyle = {
  textAlignVertical: "top",
  flex: 1,
  textAlign: "left",
  fontSize: 16,
  color: colors.messageBodyText,
}
const $bodyLink: TextStyle = {
  color: colors.messageBodyLink,
}
const $dateText: TextStyle = {
  textAlignVertical: "center",
  textAlign: "right",
  fontSize: 12,
  color: colors.messageDateText,
}
const $parentBodyText: TextStyle = {
  color: colors.messageBodyTextLight,
}
const $parentBodyLink: TextStyle = {
  color: colors.messageBodyLinkLight,
}
const $parentDateText: TextStyle = {
  color: colors.messageDateTextLight,
}
const $messageCard: ViewStyle = {
  flex: 1,
  backgroundColor: colors.messageBG,
  marginLeft: 75,
  padding: 10,
  minHeight: 60,
  marginRight: 5,
}
const $messageCardParent: ViewStyle = {
  flex: 1,
  backgroundColor: colors.secondaryButton,
  marginRight: 113,
  padding: 10,
  minHeight: 60,
  marginLeft: 5,
}
const $image: ImageStyle = { width: 50, height: 50, resizeMode: "contain", alignSelf: "flex-end" }
