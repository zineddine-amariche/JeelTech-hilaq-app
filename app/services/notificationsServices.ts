import notifee, { AuthorizationStatus } from "@notifee/react-native"
import { translate } from "app/i18n"
import { PermissionsAndroid, Platform } from "react-native"
import messaging from "@react-native-firebase/messaging"
import { KEYS } from "app/utils/globals"
import * as storage from "app/utils/storage"

async function displayNotification(title, body, data) {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: "remote",
    name: "Remote notification",
  })

  // Display a notification
  await notifee.displayNotification({
    title,
    body,
    // we use this if the user presses the notification
    data,
    android: {
      channelId,
      pressAction: {
        id: "default",
      },
    },
  })
}

export const handleGetToken = async () => {
  try {
    const token = await messaging().getToken()
    await storage.save(KEYS.fcmToken, token)
    console.log("fcm token:", token)
  } catch (error) {
    console.log("error", error)
  }
}

export const requestUserPermissionForNotification = async () => {
  if (Platform.OS === "android") {
    // Check if the app has permission for POST_NOTIFICATIONS
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )
    if (!hasPermission) {
      try {
        // Request permission for POST_NOTIFICATIONS
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED || granted == "granted") {
          // Permission granted, get the FCM token
          handleGetToken()
        } else {
          // Permission denied
          console.log("User denied permission for POST_NOTIFICATIONS")
        }
      } catch (error) {
        console.error("Error requesting permission:", error)
      }
    } else {
      // Permission is already granted, get the FCM token
      handleGetToken()
    }
  }

  if (Platform.OS === "ios") {
    const settings = await notifee.requestPermission()

    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      console.log("User denied permissions request")
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

      if (enabled) {
        // Permission granted, get the FCM token
        handleGetToken()
      } else {
        console.log("User denied permission for FCM")
      }
    } else if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      console.log("User granted permissions request")
      // Permission granted, get the FCM token
      handleGetToken()
    } else if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
      console.log("User provisionally granted permissions request")
      // Permission provisionally granted, get the FCM token
      handleGetToken()
    }
  }
  handleGetToken()
}

export const handleShowNotification = async (remoteMessage, isBackground) => {
  const { data } = remoteMessage
  const { type, student } = data

  const title = data.type ? translate("notifications." + data.type + "_title") : data.title
  let bodyMessage = ""
  switch (type) {
    case "new_attendance":
      bodyMessage =
        student !== undefined
          ? translate("notifications.new_attendance_body") + " " + student
          : "اضغط للإطلاع على الحصة"
      break
    case "new_message":
    case "new_news":
      bodyMessage = student || ""
      break
  }

  displayNotification(title, bodyMessage, data)
}

export const notificationClicked = async (details, navigations, parentStore) => {
  const { data } = details.notification
  const filteredChildren = parentStore.children.filter((child) => {
    return parseInt(child.id) === parseInt(data.studentId)
  })

  if (filteredChildren.length === 0) {
    filteredChildren[0] = parentStore.children[0]
  }

  if (filteredChildren.length) {
    parentStore.setCurrentChild(filteredChildren[0])
    parentStore.currentChild.loadMessages(true)
  }

  if (data.type === "new_news") {
    setTimeout(() => {
      navigations.navigate("Student", {
        screen: "News",
        params: { data },
      })
    }, 500)
  }
  if (data.type === "new_attendance") {
    setTimeout(() => {
      navigations.navigate("Student", {
        screen: "Attendances",
        params: { data },
      })
    }, 500)
  }
  if (data.type === "new_message") {
    setTimeout(() => {
      navigations.navigate("Student", {
        screen: "Inbox",
        params: { data },
      })
    }, 500)
  }

  if (details.notification.id) {
    notifee.cancelNotification(details.notification.id)
  }
}
