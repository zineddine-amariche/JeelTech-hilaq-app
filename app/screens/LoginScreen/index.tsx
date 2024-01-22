import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { Wallpaper } from "app/appcomponents/wallpaper/wallpaper"
import { useHeader } from "app/utils/useHeader"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { useLogin } from "./Hooks/useLogin"
import LoginForm from "./components/LoginForm"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const { ErrorLogin } = useLogin()

  const [schoolLogo, setSchoolLogo] = useState(null)

  const {
    parentStore: { school, status },
  } = useStores()

  const { navigation } = _props
  const back = () => {
    navigation.navigate("Welcome")
  }

  useHeader(
    {
      rightTx: "common.changeSchool",
      rightIcon: "back",
      onRightPress: back,
    },
    [back],
  )

  useEffect(() => {
    if (status === "error") {
      ErrorLogin()
    }
  }, [status])

  useEffect(() => {
    if (school === "warsh") {
      setSchoolLogo(require("../../../assets/schools/warsh_school_logo.png"))
    } else if (school === "cheaanin") {
      setSchoolLogo(require("../../../assets/schools/cheaanin_school_logo.png"))
    } else if (school === "benaissa") {
      setSchoolLogo(require("../../../assets/schools/benaissa_school_logo.png"))
    } else if (school === "furquan") {
      setSchoolLogo(require("../../../assets/schools/furquan_school_logo.png"))
    } else if (school === "benbadis") {
      setSchoolLogo(require("../../../assets/schools/benbadis_school_logo.png"))
    }
  }, [school])

  return (
    <View style={$full}>
      <Wallpaper />
      <Screen
        backgroundColor={colors.transparent}
        contentContainerStyle={$screenContentContainer}
        preset="auto"
        safeAreaEdges={["bottom"]}
      >
        {school === "benaissa" ? (
          <View style={$logoContainer}>
            {schoolLogo && <Image source={schoolLogo} style={$logoInContainer} />}
          </View>
        ) : (
          schoolLogo && <Image source={schoolLogo} style={$logo} />
        )}
        <LoginForm />
      </Screen>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text style={$footerText} tx="loginScreen.rights" />
      </View>
    </View>
  )
})

const $logo: ImageStyle = {
  alignSelf: "center",
  maxWidth: "100%",
  width: 180,
  height: 180,
}
const $logoInContainer: ImageStyle = {
  alignSelf: "center",
  maxWidth: "100%",
  width: 140,
  height: 140,
}
const $logoContainer: ImageStyle = {
  alignSelf: "center",
  backgroundColor: colors.schoolElementBG,
  padding: 10,
  borderRadius: 20,
}
const $full: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $screenContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  backgroundColor: colors.backgroundBottom,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}
const $footerText: TextStyle = {
  color: colors.appText,
  textAlign: "center",
}
