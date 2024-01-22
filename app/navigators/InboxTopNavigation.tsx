import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ComingsoonScreen, MessagesScreen } from "app/screens"
import { useHeader } from "app/utils/useHeader"
import { translate } from "app/i18n"
import RightHeaderAction from "app/appcomponents/RightActionComponent"
import { Text } from "app/components"
import { colors } from "app/theme"

// Define the screen params
type RootStackParamList = {
  MessagesScreen: undefined
  attendancesMessages: undefined
}

// Create the Tab Navigator
const Tab = createMaterialTopTabNavigator<RootStackParamList>()

export const InboxTopTabNavigator = (props) => {
  const onNavigate = () => {
    props.navigation.navigate("Student", { screen: "Children" })
  }

  useHeader(
    {
      title: translate("tab.inbox"),
      titleMode: "flex",
      onRightPress: onNavigate,
      RightActionComponent: (() => <RightHeaderAction navigation={props.navigation} />)(),
    },
    [onNavigate],
  )

  const screens = [
    {
      name: "MessagesScreen",
      component: MessagesScreen,
      options: {
        tabBarLabel: ({ focused }) => (
          <TabLabel focused={focused} label={translate("tab.administrationMessages")} />
        ),
      },
    },
    {
      name: "attendancesMessages",
      component: ComingsoonScreen,
      options: {
        tabBarLabel: ({ focused }) => (
          <TabLabel focused={focused} label={translate("tab.attendancesMessages")} />
        ),
      },
    },
  ]

  return (
    <Tab.Navigator
      initialRouteName="MessagesScreen"
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
    <Text size="sm" preset="formLabel" style={{ marginRight: 20, color }}>
      {label}
    </Text>
  )
}
