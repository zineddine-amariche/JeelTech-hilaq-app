import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import { ComingsoonScreen } from "app/screens"
import { useHeader } from "app/utils/useHeader"
import { translate } from "app/i18n"
import RightHeaderAction from "app/appcomponents/RightActionComponent"
import { Text } from "app/components"
import { colors } from "app/theme"
import { EventsScreen } from "app/screens/EventsScreen/EventsScreen"
import { TranscriptsScreen } from "app/screens/TranscriptsScreen/TranscriptsScreen"

// Define the screen params
type RootStackParamList = {
  transcripts: undefined
  punishments: undefined
  awards: undefined
  events: undefined
}

// Create the Tab Navigator
const Tab = createMaterialTopTabNavigator<RootStackParamList>()

export const StateTopTabNavigator = (props) => {
  const onNavigate = () => {
    props.navigation.navigate("Student", { screen: "Children" })
  }

  useHeader(
    {
      title: translate("tab.stats"),
      titleMode: "flex",
      onRightPress: onNavigate,
      RightActionComponent: (() => <RightHeaderAction navigation={props.navigation} />)(),
    },
    [onNavigate],
  )

  const screens = [
    {
      name: "transcripts",
      component: TranscriptsScreen,
      options: {
        tabBarLabel: ({ focused }) => (
          <TabLabel focused={focused} label={translate("tab.transcripts")} />
        ),
      },
    },
    {
      name: "events",
      component: EventsScreen,
      options: {
        tabBarLabel: ({ focused }) => (
          <TabLabel focused={focused} label={translate("tab.events")} />
        ),
      },
    },
    {
      name: "awards",
      component: ComingsoonScreen,
      options: {
        tabBarLabel: ({ focused }) => (
          <TabLabel focused={focused} label={translate("tab.awards")} />
        ),
      },
    },
    {
      name: "punishments",
      component: ComingsoonScreen,
      options: {
        tabBarLabel: ({ focused }) => (
          <TabLabel focused={focused} label={translate("tab.punishments")} />
        ),
      },
    },
  ]

  return (
    <Tab.Navigator
      initialRouteName="transcripts"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.appText },
        tabBarActiveTintColor: colors.appText,
        tabBarInactiveTintColor: colors.topTabBarInactiveText,
        tabBarStyle: { backgroundColor: colors.backgroundBottom },
      }}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Tab.Navigator>
  )
}

const TabLabel = ({ focused, label }) => {
  const color = focused ? colors.appText : colors.topTabBarInactiveText
  return (
    // set dots at the end of text if no space and prevent line break
    <Text
      size="sm"
      preset="formLabel"
      style={{ color }}
      numberOfLines={1} // Prevent line break
      ellipsizeMode="tail" // Add dots at the end of the text
    >
      {label}
    </Text>
  )
}
