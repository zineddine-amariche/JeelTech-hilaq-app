import * as React from "react"
import { View, ViewStyle, TextStyle, Image, ImageStyle } from "react-native"
import { NewsCardProps } from "./NewsCard.props"
import { colors } from "../../theme"
import Hyperlink from "react-native-hyperlink"
import { TouchableOpacity } from "react-native"
import moment from "moment"
import { Text } from "app/components"

/**
 * NewsCard.
 */
export const NewsCard: React.FunctionComponent<NewsCardProps> = (props) => {
  const { onImagePress, newsTitle, newsBody, newsDate, newsDateTimestamp, style, picture } = props
  const dateText = newsDateTimestamp
    ? moment(newsDateTimestamp).format("dddd D MMMM YYYY")
    : newsDate
  return (
    <View style={[$root, style]}>
      <View style={$newsCard}>
        {picture && (
          <TouchableOpacity style={$newsCard} onPress={onImagePress}>
            <Image source={{ uri: picture }} style={$image} />
          </TouchableOpacity>
        )}
        <View style={$textCon}>
          <Text preset="bold" style={$titleText} text={newsTitle} />
          <Hyperlink linkDefault={true} linkStyle={$bodyLink}>
            <Text style={$bodyText}>{newsBody}</Text>
          </Hyperlink>
          <Text style={$dateText} text={dateText} />
        </View>
      </View>
    </View>
  )
}

// static styles
const $root: ViewStyle = {
  flexDirection: "row",
}
const $bodyText: TextStyle = {
  textAlignVertical: "top",
  flex: 1,
  textAlign: "left",

  fontSize: 14,
  color: colors.messageBodyText,
  lineHeight: 23,
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
const $newsCard: ViewStyle = {
  flex: 1,
  backgroundColor: colors.messageBG,
  marginHorizontal: 8,
  minHeight: 60,
}
const $titleText: TextStyle = {
  textAlignVertical: "top",
  flex: 1,
  textAlign: "left",
  fontSize: 19,
  color: colors.messageBodyText,
  marginBottom: 5,
}
const $image: ImageStyle = {
  height: 176,
  resizeMode: "cover",
  margin: 3,
}
const $textCon: ViewStyle = {
  padding: 10,
}
