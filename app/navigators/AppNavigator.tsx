/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { useStores } from "app/models"
import { Loading } from "app/appcomponents/Loading"
import { StudentNavigator, StudentTabParamList } from "./StudentNavigator"
import { DrawerChildNavigator } from "./DrawerChildNavigation"
import notifee, { EventType } from "@notifee/react-native"
import {
  notificationClicked,
  requestUserPermissionForNotification,
} from "app/services/notificationsServices"
import { api } from "app/services/api"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Children: undefined
  AttendanceDetail: undefined
  TermsScreen: undefined
  Student: NavigatorScreenParams<StudentTabParamList>
  // 🔥 Your screens go here
  Settings: undefined
  UpdatePassword: undefined
  SettingsLanguges: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    parentStore,
    parentStore: {
      setupAuth,
      isAuthenticated,
      school,
      locale,
      setCurrentChild,
      setCurrentAttendance,
    },
  } = useStores()

  /* Handle notification clicks */
  const navigation = useNavigation()

  useEffect(() => {
    if (school) {
      api.setSchool(school)
      setupAuth()
    }
    setCurrentChild(null)
    setCurrentAttendance(null)
    requestUserPermissionForNotification()
    const checkInitialNotification = async () => {
      // check if the app was opened (from closed state) via a notifee notification
      const initialNotification = await notifee.getInitialNotification()
      if (initialNotification) {
        notificationClicked(initialNotification, navigation, parentStore)
      }
    }
    checkInitialNotification()
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        notificationClicked(detail, navigation, parentStore)
      }
    })
    return notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        notificationClicked(detail, navigation, parentStore)
      }
    })
  }, [])
  /* End Handle notification clicks */

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={
        !locale ? "Settings" : isAuthenticated ? "Children" : school ? "Login" : "Welcome"
      }
    >
      {!locale ? (
        <Stack.Screen name="Settings" component={Screens.SettingsScreen} />
      ) : isAuthenticated ? (
        <>
          <Stack.Screen name="Children" component={DrawerChildNavigator} />
          <Stack.Screen name="Student" component={StudentNavigator} />
          <Stack.Screen name="TermsScreen" component={Screens.TermsScreen} />
          <Stack.Screen name="SettingsLanguges" component={Screens.SettingsLangugesScreen} />
          <Stack.Screen name="UpdatePassword" component={Screens.UpdatePasswordScreen} />
          <Stack.Screen name="AttendanceDetail" component={Screens.AttendanceDetailScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
        </>
      )}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  const {
    parentStore: { isLoading },
  } = useStores()

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />

      {isLoading ? <Loading /> : null}
    </NavigationContainer>
  )
})
