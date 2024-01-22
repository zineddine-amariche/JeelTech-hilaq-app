import React, { useEffect } from "react"
import { View } from "react-native"
import { Screen, Text } from "../../components"
import { colors } from "../../theme"
import { FlatList } from "react-native"
import { observer } from "mobx-react-lite"
import { AttendanceStoreModel, FutureAttendanceModel } from "../../models/Attendance"
import { translate } from "app/i18n"

import moment from "moment"
import { useStores } from "../../models"
import * as Styles from "./styles"
import { AttendanceCard } from "app/appcomponents/attendanceCard/attendanceCard"
import { useHeader } from "app/utils/useHeader"
import AppLayout from "app/appcomponents/appLayout"
import RightHeaderAction from "app/appcomponents/RightActionComponent"
import "moment/locale/ar-dz"
import { useNavigation } from "@react-navigation/native"

export const AttendancesScreen: React.FunctionComponent = observer(() => {
  const navigation = useNavigation()
  const { parentStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await parentStore.currentChild.loadAttendances()
      setIsLoading(false)
    })()
  }, [parentStore])

  const futureAttendances: (typeof FutureAttendanceModel | any)[] =
    parentStore?.currentChild?.futureAttendances

  const lastAttendance: typeof AttendanceStoreModel = parentStore?.currentChild?.lastAttendance

  const pastAttendances: (typeof AttendanceStoreModel)[] =
    parentStore?.currentChild?.pastAttendances

  const onNavigate = () => {
    navigation.navigate("Student", { screen: "Children" })
  }

  useHeader(
    {
      title: translate("tab.attendances"),
      titleMode: "flex",
      rightIcon: "menu",
      onRightPress: onNavigate,
      RightActionComponent: (() => <RightHeaderAction navigation={navigation} />)(),
    },
    [onNavigate],
  )

  return (
    <AppLayout>
      <Screen
        preset="auto"
        backgroundColor={colors.transparent}
        contentContainerStyle={Styles.$screen}
        onRefresh={() => {
          parentStore?.currentChild?.loadAttendances()
        }}
        refresh={parentStore?.currentChild?.isLoading}
      >
        <View style={Styles.$container}>
          {futureAttendances !== undefined && futureAttendances.length > 0 && (
            <>
              <Text text="حصص قادمة : بعد 3 أيام" style={Styles.$cardsHeader} />
              <FlatList
                data={futureAttendances}
                scrollEnabled={false}
                renderItem={({ item }: typeof AttendanceStoreModel) => (
                  <AttendanceCard
                    style={Styles.$attendanceCard}
                    subjectName={item.subjectName}
                    appointmentDateTimestamp={item.appointmentDateTimestamp}
                    category={2}
                  />
                )}
              />
            </>
          )}

          {lastAttendance !== undefined && (
            <>
              <Text
                text={
                  translate("attendances.last_attendance") +
                  (moment(lastAttendance.appointmentDateTimestamp).isSame(moment(), "day")
                    ? translate("attendances.today")
                    : moment(lastAttendance.appointmentDateTimestamp).isSame(
                        moment().subtract(1, "days"),
                        "day",
                      )
                    ? translate("attendances.yesterday")
                    : moment(lastAttendance.appointmentDateTimestamp).isSame(
                        moment().subtract(2, "days"),
                        "day",
                      )
                    ? translate("attendances.two_days_ago")
                    : moment(lastAttendance.appointmentDateTimestamp).fromNow()) +
                  (parentStore.currentChild.attendanceUpdated === true ? " " : "")
                }
                preset="subheading"
                style={{ textAlign: "left" }}
              />
              <AttendanceCard
                style={Styles.$attendanceCard}
                subjectName={lastAttendance.subjectName}
                appointmentDateTimestamp={lastAttendance.appointmentDateTimestamp}
                category={1}
                gender={parentStore.currentChild.gender}
                present={lastAttendance.present}
                hasMessage={
                  lastAttendance.messageToParent != null && lastAttendance.messageToParent !== ""
                }
                hasAward={lastAttendance.hasAward > 0}
                hasAlert={lastAttendance.punished > 0}
                isNew={lastAttendance.attendanceStatus === "new"}
                mistakes={lastAttendance.mistakes}
                onPress={() => {
                  parentStore.setCurrentAttendance(lastAttendance)
                  navigation.navigate("AttendanceDetail")

                  parentStore.currentChild.setAttendanceUpdated(false)

                  if (parentStore.currentAttendance.attendanceStatus === "new") {
                    parentStore.currentAttendance.setAttendanceSeen(function () {
                      parentStore.currentChild.setAttendanceUpdated(true)
                    })
                  }
                }}
              />
            </>
          )}

          {pastAttendances !== undefined && pastAttendances.length > 0 && (
            <>
              <Text
                text={
                  translate("attendances.past_attendances") +
                  (parentStore.currentChild.attendanceUpdated === true ? " " : "")
                }
                preset="subheading"
                style={{ textAlign: "left" }}
              />

              <FlatList
                data={pastAttendances}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <AttendanceCard
                    style={Styles.$attendanceCard}
                    subjectName={item.subjectName}
                    appointmentDateTimestamp={item.appointmentDateTimestamp}
                    category={0}
                    gender={parentStore.currentChild.gender}
                    present={item.present}
                    hasMessage={item.messageToParent != null && item.messageToParent !== ""}
                    hasAward={item.hasAward > 0}
                    hasAlert={item.punished > 0}
                    isNew={item.attendanceStatus === "new"}
                    mistakes={item.mistakes}
                    onPress={() => {
                      parentStore.setCurrentAttendance(item)
                      // parentStore.navigateTo("attendanceDetail")
                      navigation.navigate("AttendanceDetail")
                      parentStore.currentChild.setAttendanceUpdated(false)

                      if (parentStore.currentAttendance.attendanceStatus === "new") {
                        parentStore.currentAttendance.setAttendanceSeen(function () {
                          parentStore.currentChild.setAttendanceUpdated(true)
                        })
                      }
                    }}
                  />
                )}
              />
            </>
          )}
          {(futureAttendances == undefined || futureAttendances.length == 0) &&
          lastAttendance == undefined &&
          (pastAttendances == undefined || pastAttendances.length == 0) ? (
            <View style={Styles.$container}>
              <View style={Styles.$textContainer}>
                <Text tx={"tab.attendances_empty_list"} style={Styles.$text} />
              </View>
            </View>
          ) : null}
        </View>
      </Screen>
    </AppLayout>
  )
})
