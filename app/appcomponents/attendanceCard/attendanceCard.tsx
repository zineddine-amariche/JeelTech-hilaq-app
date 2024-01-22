import * as React from "react"
import { View } from "react-native"
import { AttendanceCardProps } from "./attendanceCard.props"
import { TxKeyPath } from "../../i18n"
import { TouchableOpacity } from "react-native"
import moment from "moment"
import * as styles from "./card-style"
import { Icon, Text } from "app/components"

/**
 * AttendanceCard.
 */
export const AttendanceCard: React.FunctionComponent<AttendanceCardProps> = (props) => {
  const {
    onPress,
    subjectName,
    appointmentDate,
    appointmentDateTimestamp,
    gender,
    present,
    hasAward,
    hasMessage,
    hasAlert,
    isNew,
    category,
    style,
  } = props
  const dateText = appointmentDateTimestamp
    ? moment(appointmentDateTimestamp).format("dddd D MMMM YYYY")
    : appointmentDate

  return (
    <View style={[category !== 1 && styles.$dim, styles.$root, style]}>
      <TouchableOpacity style={styles.$body} onPress={onPress}>
        {isNew ? <View style={styles.$isNewKnob}></View> : null}
        <View style={[styles.$top]}>
          <Text style={styles.$dateText} text={dateText} numberOfLines={1} ellipsizeMode="tail" />
          <Text
            style={styles.$titleText}
            text={subjectName}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </View>
        {category !== 2 ? (
          <View style={styles.$bottom}>
            <View style={styles.$badges}>
              {hasAlert && (
                <Icon containerStyle={styles.$badgeContainer} style={styles.$badge} icon="alert" />
              )}
              {hasAward && (
                <Icon containerStyle={styles.$badgeContainer} style={styles.$badge} icon="award" />
              )}
              {hasMessage && (
                <Icon
                  containerStyle={styles.$badgeContainer}
                  style={styles.$badge}
                  icon="message"
                />
              )}
            </View>
            <Text
              style={[
                styles.$presenceText,
                present === "late"
                  ? styles.$lateText
                  : present === "present"
                  ? styles.$presentText
                  : styles.$absentText,
              ]}
              tx={("attendances." + present + "_" + gender) as TxKeyPath}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  )
}
