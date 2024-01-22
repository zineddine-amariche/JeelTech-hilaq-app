import React from "react"

import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer"
import * as Screens from "app/screens"
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { Alert, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon, Text } from "app/components"
import { isRTL, translate } from "app/i18n"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"

const ChildDrawer = createDrawerNavigator()

const ChildDrawerContent = ({ navigation }) => {
  const { parentStore } = useStores()

  const logout = () => {
    Alert.alert(
      translate("childrenScreen.logout_alert_title"),
      translate("childrenScreen.logout_alert_message"),
      [
        {
          text: translate("childrenScreen.logout_alert_cancel"),
          style: "cancel",
        },
        {
          text: translate("childrenScreen.logout_alert_confirm"),
          onPress: async () => {
            parentStore.logout()
          },
        },
      ],
      { cancelable: false },
    )
  }
  const $containerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <View style={[$container, $containerInsets]}>
      <View style={$header}>
        <Text weight="medium" size="md">
          {translate("common.hello") +
            " " +
            parentStore.info.firstName +
            " " +
            parentStore.info.lastName}
        </Text>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Icon
            size={25}
            icon={"back"}
            color={colors.appText}
            style={isRTL ? { transform: [{ rotate: "180deg" }] } : {}}
          />
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingTop: spacing.lg,
          backgroundColor: colors.background,
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={$itemContainer}
          onPress={() => {
            navigation.navigate("SettingsLanguges")
          }}
        >
          <Icon size={25} icon={"components"} color={colors.appText} />
          <Text tx="settings_side_menu.settings" weight="medium" size="md" style={$itemText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={$itemContainer}
          onPress={() => {
            navigation.navigate("UpdatePassword")
          }}
        >
          <Icon size={25} icon={"view"} color={colors.appText} />
          <Text
            tx="settings_side_menu.updatePassword"
            weight="medium"
            size="md"
            style={$itemText}
          />
        </TouchableOpacity>

        <TouchableOpacity style={$itemContainer} onPress={logout}>
          <Icon size={25} icon={"exit"} color={colors.appText} />
          <Text tx="settings_side_menu.logout" weight="medium" size="md" style={$itemText} />
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  )
}

export function DrawerChildNavigator() {
  return (
    <ChildDrawer.Navigator
      id="ChildDrawer"
      drawerContent={(props) => <ChildDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          backgroundColor: colors.transparent,
          width: "86%",
        },
      }}
    >
      <ChildDrawer.Screen name="ChildDrawer" component={Screens.ChildrenScreen} />
    </ChildDrawer.Navigator>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.appBG,
}
const $header: ViewStyle = {
  height: 56,
  backgroundColor: colors.appBG,
  paddingHorizontal: spacing.md,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const $itemContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 10,
  paddingHorizontal: 20,
}

const $itemText: TextStyle = {
  marginLeft: 20,
}
