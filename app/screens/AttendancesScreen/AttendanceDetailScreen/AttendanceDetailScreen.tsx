import * as React from "react"
import { View, Image } from "react-native"
import { Screen, Text, Icon } from "../../../components"
import { colors } from "../../../theme"
import moment from "moment"
import { Observer, observer } from "mobx-react-lite"
import { isRTL, translate, TxKeyPath } from "../../../i18n"
import { useStores } from "app/models"
import { InformationNoteCard } from "app/appcomponents/informationNoteCard/information-note-card"
import { InformationCard } from "app/appcomponents/informationCard/informationCard"
import { Wallpaper } from "app/appcomponents/wallpaper/wallpaper"
const alertImage = require("./alert.png")
import * as styles from "./styles"
import { useHeader } from "app/utils/useHeader"
import { useNavigation } from "@react-navigation/native"
import RightHeaderAction from "app/appcomponents/RightActionComponent"
import { suwarList } from "app/data/suwar"

export const AttendanceDetailScreen: React.FunctionComponent = observer((_props) => {
  const navigation = useNavigation()
  const onNavigate = () => {
    navigation.navigate("Student", { screen: "Children" })
  }
  useHeader(
    {
      titleMode: "flex",
      onRightPress: onNavigate,
      RightActionComponent: (() => <RightHeaderAction navigation={navigation} />)(),
      //LeftActionComponent: (() => <LeftHeaderAction navigation={navigation} />)(),
      onLeftPress: () => navigation.goBack(),
      leftIcon: "back",
      leftTx: "tab.attendances",
    },
    [onNavigate],
  )
  return (
    <Observer>
      {() => {
        const { parentStore } = useStores()
        if (!parentStore.currentAttendance) {
          if (parentStore.currentChild.attendances.length > 0) {
            parentStore.setCurrentAttendance(parentStore.currentChild.attendances[0])
          } else {
            return (
              <View style={styles.$full}>
                <Wallpaper />
              </View>
            )
          }
        }

        const {
          subjectName,
          appointmentDate,
          appointmentDateTimestamp,
          present,
          progress,
          fromSurat,
          fromSuratNumber,
          fromAyahNumber,
          toSurat,
          toSuratNumber,
          toAyahNumber,
          attendanceMark,
          behaviourMark,
          messageToParent,
          hasAward,
          punished,
          mistakes,
        } = parentStore.currentAttendance

        const fromSurahLang = suwarList.find((item) => item.ar === fromSurat)
        const toSurahLang = suwarList.find((item) => item.ar === toSurat)

        const displayFromSurah = isRTL ? fromSurahLang?.ar : fromSurahLang?.en || ""
        const displayToSurah = isRTL ? toSurahLang?.ar : toSurahLang?.en || ""

        const dateText = appointmentDateTimestamp
          ? moment(appointmentDateTimestamp).format("dddd D MMMM YYYY")
          : appointmentDate

        const fromSuratNote =
          fromSurat && fromSurat.length
            ? translate("attendances.from") +
              " " +
              translate("attendances.surat") +
              " " +
              displayFromSurah +
              " "
            : ""
        const fromAyahNote = fromAyahNumber
          ? translate("attendances.alayah") + " " + fromAyahNumber + " "
          : ""
        const toSuratNote =
          toSurat && toSurat.length
            ? translate("attendances.to") +
              " " +
              translate("attendances.surat") +
              " " +
              displayToSurah +
              " "
            : ""
        const toAyahNote = toAyahNumber
          ? translate("attendances.alayah") + " " + toAyahNumber + " " + " "
          : ""

        const progressNote = fromSuratNote + fromAyahNote + toSuratNote + toAyahNote
        return (
          <>
            <Wallpaper />
            <Screen
              preset="fixed"
              contentContainerStyle={styles.$screen}
              backgroundColor={colors.transparent}
            >
              <>
                <View style={styles.$headRow}>
                  <Text text={dateText} style={styles.$headLeftDate} />
                  <Text
                    text={subjectName}
                    preset="bold"
                    style={styles.$headRight}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  />
                </View>
                <View style={styles.$separatorContainer}>
                  <View style={styles.$separator} />
                  {!present.startsWith("absent") && (
                    <Text
                      tx={
                        ("attendances." +
                          present +
                          "_" +
                          parentStore.currentChild.gender) as TxKeyPath
                      }
                      style={[
                        styles.$presenceText,
                        present === "late" ? styles.$lateText : styles.$prensentText,
                      ]}
                    />
                  )}
                </View>
              </>

              {present.startsWith("absent") ? (
                <View style={styles.$absentContainer}>
                  <Image source={alertImage} style={styles.$image} />
                  <Text
                    tx={
                      ("attendances." +
                        present +
                        "_" +
                        parentStore.currentChild.gender) as TxKeyPath
                    }
                    style={styles.$absentText}
                  />
                  {messageToParent != null && messageToParent !== "" && (
                    <InformationCard
                      titleTx="attendances.teacher_note"
                      rightElem={
                        <Icon
                          icon="message"
                          style={{ ...styles.$infoCardIcon, ...styles.$infoCardIconMessage }}
                        />
                      }
                      style={styles.$informationCard}
                      bodyText={messageToParent}
                    />
                  )}
                </View>
              ) : (
                <View>
                  {hasAward > 0 && (
                    <InformationCard
                      titleTx="attendances.aquired a golden card"
                      rightElem={<Icon icon="goldenCard" style={styles.$infoCardIcon} />}
                      style={styles.$informationCard}
                    />
                  )}
                  {punished === 1 && (
                    <InformationCard
                      titleTx={
                        attendanceMark === 0 ? "attendances.punished_0" : "attendances.punished"
                      }
                      leftElem={
                        <Icon
                          icon="alert"
                          style={{ ...styles.$infoCardIcon, ...styles.$infoCardIconAlert }}
                        />
                      }
                      style={styles.$informationCard}
                    />
                  )}
                  {present === "late" && (
                    <InformationCard
                      titleTx="attendances.alert late"
                      leftElem={
                        <Icon
                          icon="alert"
                          style={{ ...styles.$infoCardIcon, ...styles.$infoCardIconAlert }}
                        />
                      }
                      style={styles.$informationCard}
                    />
                  )}
                  {(progress > 0 || progressNote !== "") && (
                    <InformationCard
                      titleText={
                        progress > 0
                          ? translate("attendances.pages")
                          : punished || attendanceMark === 0
                          ? translate("attendances.progress_punished")
                          : translate("attendances.progress")
                      }
                      leftElem={
                        progress > 0 ? (
                          <Text text={"" + progress} style={styles.$infoCardText} />
                        ) : null
                      }
                      style={styles.$informationCard}
                      bodyText={progressNote}
                    />
                  )}
                  {mistakes > 0 && (
                    <InformationCard
                      titleTx="attendances.mistakes"
                      leftElem={<Text text={"" + mistakes} style={styles.$infoCardTextMistakes} />}
                      style={styles.$informationCard}
                    />
                  )}
                  {behaviourMark != null &&
                  attendanceMark != null &&
                  behaviourMark >= 0 &&
                  attendanceMark > 10 &&
                  punished ? (
                    <View style={styles.$markRow}>
                      <InformationNoteCard
                        titleTx="attendances.behaviour_mark"
                        style={styles.$informationCard}
                        bodyMainText={
                          translate(("attendances.behaviour_mark_" + behaviourMark) as TxKeyPath, {
                            defaultValue: "" + behaviourMark,
                          }) as string
                        }
                        bodyText={translate(
                          ("attendances.behaviour_mark_body_" + behaviourMark) as TxKeyPath,
                          {
                            defaultValue: "20\\",
                          },
                        )}
                        bodyStyle={behaviourMark < 10 ? { color: colors.error } : {}}
                      />
                      <View style={styles.$verticalSeparator}></View>
                      <InformationNoteCard
                        titleTx="attendances.attendance_mark"
                        style={styles.$informationCard}
                        bodyMainText={"" + attendanceMark}
                        bodyText="20\"
                        bodyStyle={attendanceMark < 10 ? { color: colors.error } : {}}
                      />
                    </View>
                  ) : (
                    <View>
                      {behaviourMark != null && behaviourMark >= 0 && (
                        <InformationCard
                          titleTx="attendances.behaviour_mark"
                          leftElem={
                            <View style={styles.$markRow}>
                              <Text
                                text={translate(
                                  ("attendances.behaviour_mark_body_" + behaviourMark) as TxKeyPath,
                                  {
                                    defaultValue: "20\\",
                                  },
                                )}
                                style={styles.$markText}
                              />
                              <Text
                                text={translate(
                                  ("attendances.behaviour_mark_" + behaviourMark) as TxKeyPath,
                                  {
                                    defaultValue: "" + behaviourMark,
                                  },
                                )}
                                style={[
                                  styles.$infoCardText,
                                  behaviourMark < 10 ? { color: colors.error } : {},
                                ]}
                              />
                            </View>
                          }
                          style={styles.$informationCard}
                        />
                      )}
                      {attendanceMark != null && attendanceMark >= 0 && !punished && (
                        <InformationCard
                          titleTx="attendances.attendance_mark"
                          leftElem={
                            attendanceMark === 0 ? (
                              <Text tx="attendances.no_hifd" style={styles.$markText} />
                            ) : (
                              <View style={styles.$markRow}>
                                <Text text={isRTL ? "/20" : "20/"} style={styles.$markText} />
                                <Text
                                  text={"" + attendanceMark}
                                  style={[
                                    styles.$infoCardText,
                                    attendanceMark < 10 ? { color: colors.error } : {},
                                  ]}
                                />
                              </View>
                            )
                          }
                          style={styles.$informationCard}
                        />
                      )}
                    </View>
                  )}
                  {messageToParent != null && messageToParent !== "" && (
                    <InformationCard
                      titleTx="attendances.teacher_note"
                      rightElem={
                        <Icon
                          icon="message"
                          style={{ ...styles.$infoCardIcon, ...styles.$infoCardIconMessage }}
                        />
                      }
                      style={styles.$informationCard}
                      bodyText={messageToParent}
                    />
                  )}
                </View>
              )}
            </Screen>
          </>
        )
      }}
    </Observer>
  )
})
