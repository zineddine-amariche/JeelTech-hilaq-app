import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Button, EmptyState, Icon, Screen, Text } from "../components"
import { colors, spacing } from "../theme"
import { Wallpaper } from "app/appcomponents/wallpaper/wallpaper"
import { AppStackScreenProps } from "../navigators"
import { useHeader } from "app/utils/useHeader"
import { useStores } from "app/models"
import { delay } from "app/utils/delay"
import { translate } from "app/i18n"
import { Child } from "../models/Child"
import { ChildCard } from "app/appcomponents/childcard/ChildCard"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"

const notificationImage = require("../assets/notification.png")

interface ChildrenScreenProps extends AppStackScreenProps<"Children"> {}

export const ChildrenScreen: FC<ChildrenScreenProps> = observer(function ChildrenScreen(_props) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const { navigation } = _props

  const { parentStore } = useStores()


  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await parentStore.getUserInfo()
      setIsLoading(false)
    })()
  }, [parentStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([parentStore.getUserInfo(), delay(750)])
    setRefreshing(false)
  }

  const openDrawer = () => {
    navigation.getParent("ChildDrawer").openDrawer()
  }

  useHeader(
    {
      title:
        translate("common.hello") +
        " " +
        parentStore.info.firstName +
        " " +
        parentStore.info.lastName,
      titleMode: "flex",
      // rightTx: "common.exit",
      rightIcon: "menu",
      onRightPress: openDrawer,
    },
    [openDrawer],
  )
  return (
    <View style={$full}>
      <Wallpaper />
      {parentStore.adminMessage?.type === "update_obligatory" ? (
        <View style={$container}>
          <Image source={notificationImage} style={$image} />
          <Text style={$textTitle} text={parentStore.adminMessage.title} />
          <Text style={$textBody} text={parentStore.adminMessage.body} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {parentStore.adminMessage !== null && (
            <Button
              style={$botton}
              preset="white"
              tx="common.admin_message"
              textStyle={{ color: colors.notificationKnob }}
              onPress={() => {
                Alert.alert(parentStore.adminMessage.title, parentStore.adminMessage.body, [
                  {
                    text: translate("common.ok"),
                  },
                ])
              }}
              LeftAccessory={() => (
                <Icon
                  icon="bell"
                  style={{ tintColor: colors.notificationKnob, marginEnd: spacing.sm }}
                />
              )}
            ></Button>
          )}
          <Screen
            backgroundColor={colors.transparent}
            contentContainerStyle={$screenContentContainer}
            preset="fixed"
            safeAreaEdges={["bottom"]}
          >
            <FlatList<Child>
              data={parentStore.children}
              extraData={parentStore.children.length}
              contentContainerStyle={[
                $flatListContentContainer,
                parentStore.children.length <= 3 && $centerElements,
              ]}
              refreshing={refreshing}
              onRefresh={manualRefresh}
              ItemSeparatorComponent={() => <View style={{ height: spacing.xl }} />}
              ListEmptyComponent={
                isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <EmptyState preset="noButton" style={$emptyState} />
                )
              }
              renderItem={({ item }) => (
                <ChildCard
                  subtitleText={
                    /* " برنامج " + */ item.groups.length && item.groups[0]
                      ? item.groups[0].program +
                        " " +
                        (item.groups[0].program === "الناشئة" ? item.groups[0].level + " " : "") +
                        item.groups[0].name
                      : ""
                  }
                  key={item.id}
                  titleText={item.firstName + " " + item.lastName}
                  onPress={() => {
                    parentStore.setCurrentChild(item)
                    // TODO : WIP loadAttendances
                    // item.loadAttendances()
                    if (!item.profileCompleted) {
                      navigation.navigate("Student", { screen: "FileScreen" })
                    } else {
                      navigation.navigate("Student", { screen: "Attendances" })
                    }
                  }}
                  gender={item.gender}
                  cardImage={item.image}
                  notificationKnob={
                    !item.profileCompleted ||
                    item.hasNewAttendances > 0 ||
                    item.hasNewMessages > 0 ||
                    item.hasNewNews > 0 ||
                    item.hasNewTranscripts > 0
                  }
                />
              )}
            />
          </Screen>
        </View>
      )}
      <View style={[$bottomContainer, $bottomContainerInsets]}>
        {parentStore.children.length === 0 && (
          <Button
            style={{ marginBottom: spacing.sm }}
            tx="emptyStateComponent.generic.button"
            onPress={manualRefresh}
          />
        )}
        <Button
          style={{ marginBottom: spacing.sm }}
          preset="secondary"
          tx="common.terms"
          onPress={() => {
            _props.navigation.navigate("TermsScreen")
          }}
        />
        {/* <Text style={$footerText} tx="loginScreen.rights" /> */}
      </View>
    </View>
  )
})

// #region Styles
const $botton: ViewStyle = {
  alignSelf: "flex-start",
  position: "absolute",
  top: spacing.md,
  left: spacing.md,
  zIndex: 2,
}
const $centerElements: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}
const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxl,
  paddingBottom: spacing.lg,
  overflow: "visible",
}
const $emptyState: ViewStyle = {
  justifyContent: "center",
  flex: 1,
}
const $full: ViewStyle = {
  flex: 1,
  backgroundColor: colors.transparent,
  overflow: "visible",
}
const $screenContentContainer: ViewStyle = {
  flex: 1,
  overflow: "visible",
}
const $bottomContainer: ViewStyle = {
  backgroundColor: colors.backgroundBottom,
  paddingHorizontal: spacing.md,
  justifyContent: "space-around",
}
const $footerText: TextStyle = {
  color: colors.appText,
  textAlign: "center",
}
const $container: ViewStyle = {
  alignContent: "center",
  justifyContent: "center",
  flex: 1,
  paddingHorizontal: spacing.lg,
}
const $image: ImageStyle = {
  marginBottom: 20,
  alignSelf: "center",
}
const $textTitle: TextStyle = {
  textAlign: "center",
}
const $textBody: TextStyle = {
  fontSize: 20,
  textAlign: "center",
}
