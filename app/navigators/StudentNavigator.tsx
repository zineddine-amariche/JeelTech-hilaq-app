import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, useTheme } from "@react-navigation/native"
import { FileScreen } from "app/screens/FileScreen/FileScreen"
import React from "react"
import { Image, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon, Text } from "../components"
import { translate } from "../i18n"
import { ComingsoonScreen, MessagesScreen, NewsScreen } from "../screens"
import { AttendancesScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { InboxTopTabNavigator } from "./InboxTopNavigation"
import { StateTopTabNavigator } from "./StateTopNavigation"
import { tabIcons } from "./tab-icons"

export type StudentTabParamList = {
  Attendances: undefined
  FileScreen: undefined
  Inbox: undefined
  State: undefined
  News: undefined
  AttendanceDetail:undefined
  UpdatePasswordScreen:undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
          {/* <Stack.Screen name="AttendanceDetail" component={Screens.AttendanceDetailScreen} /> */}

export type StudentTabScreenProps<T extends keyof StudentTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<StudentTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<StudentTabParamList>()

export function StudentNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.appText,
        tabBarInactiveTintColor: colors.topTabBarInactiveText,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Attendances"
        component={AttendancesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel focused={focused} label={translate("tab.attendances")} />
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabIcons.attendances}
              style={{ tintColor: focused ? colors.appText : colors.topTabBarInactiveText }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Inbox"
        component={InboxTopTabNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel focused={focused} label={translate("tab.inbox")} />
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabIcons.inbox}
              style={{ tintColor: focused ? colors.appText : colors.topTabBarInactiveText }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="State"
        component={StateTopTabNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel focused={focused} label={translate("tab.stats")} />
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabIcons.stats}
              style={{ tintColor: focused ? colors.appText : colors.topTabBarInactiveText }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel focused={focused} label={translate("tab.news")} />
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabIcons.news}
              style={{ tintColor: focused ? colors.appText : colors.topTabBarInactiveText }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="FileScreen"
        component={FileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel focused={focused} label={translate("tab.file")} />
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabIcons.file}
              style={{ tintColor: focused ? colors.appText : colors.topTabBarInactiveText }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

const CustomTabLabel = ({ focused, label }) => {
  return (
    <Text
      size="xs"
      preset={focused ? "bold" : "default"}
      style={{ color: focused ? colors.appText : colors.topTabBarInactiveText, marginBottom: 10 }}
    >
      {label}
    </Text>
  )
}
