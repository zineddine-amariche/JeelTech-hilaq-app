import * as React from "react"
import { View } from "react-native"
import { EventCardProps } from "./EventCard.props"
import { translate, TxKeyPath } from "../../i18n"
import moment from "moment"
import * as Styles from "./styles"
import { Text } from "app/components"

/**
 * EventCard.
 */
export const EventCard: React.FunctionComponent<EventCardProps> = (props) => {
  const { titleText, subtitle, nextOrPresence, gender, date, dateTimestamp, style } = props
  const dateText = dateTimestamp ? moment(dateTimestamp).format("dddd D MMMM YYYY") : date

  const isNextAndGender = nextOrPresence === "next" ? "next_" + gender + "_" : ""
  return (
    <View style={[Styles.$root, style]}>
      <View style={Styles.$body}>
        <View style={Styles.$top}>
          {nextOrPresence !== "next" && (
            <Text style={Styles.$dateText} text={dateText} numberOfLines={1} ellipsizeMode="tail" />
          )}
          <Text
            style={Styles.$titleText}
            text={translate(("events." + isNextAndGender + titleText) as TxKeyPath)}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </View>
        <View style={Styles.$bottom}>
          <Text
            style={[
              Styles.$presenceText,
              nextOrPresence === "next"
                ? Styles.$nextText
                : nextOrPresence === "present"
                ? Styles.$presentText
                : Styles.$absentText,
            ]}
            text={
              nextOrPresence === "next"
                ? dateText
                : nextOrPresence != null
                ? translate(("attendances." + nextOrPresence + "_" + gender) as TxKeyPath)
                : ""
            }
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </View>
      </View>
    </View>
  )
}
