import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { AppStackScreenProps } from "../navigators"
import { useHeader } from "app/utils/useHeader"
import { useStores } from "app/models"
import AppLayout from "app/appcomponents/appLayout"

const warshSchoolLogo = require("../../assets/schools/warsh_school_logo.png")
const cheaaninSchoolLogo = require("../../assets/schools/cheaanin_school_logo.png")
const benaissaSchoolLogo = require("../../assets/schools/benaissa_school_logo.png")
const furquanSchoolLogo = require("../../assets/schools/furquan_school_logo.png")
const benbadisSchoolLogo = require("../../assets/schools/benbadis_school_logo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { navigation } = _props

  useHeader({
    titleTx: "loginScreen.chooseSchool",
  })
  const {
    parentStore: { setSchool },
  } = useStores()

  const onClick = async (school) => {
    setSchool(school.name)
    navigation.navigate("Login")
  }

  const list = [
    {
      name: "warsh",
      logo: warshSchoolLogo,
    },
    {
      name: "cheaanin",
      logo: cheaaninSchoolLogo,
    },
    {
      name: "benaissa",
      logo: benaissaSchoolLogo,
    },
    {
      name: "furquan",
      logo: furquanSchoolLogo,
    },
    {
      name: "benbadis",
      logo: benbadisSchoolLogo,
    },
  ]

  return (
    <AppLayout>
      <Screen
        backgroundColor={colors.transparent}
        contentContainerStyle={$screenContentContainer}
        preset="auto"
        safeAreaEdges={["bottom"]}
      >
        <View style={$logosContainer}>
          {list.map((i, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  onClick(i)
                }}
                style={$mainButton}
              >
                <Image source={i.logo} style={$logo} />
              </Pressable>
            )
          })}
        </View>
      </Screen>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text style={$footerText} tx="loginScreen.rights" />
      </View>
    </AppLayout>
  )
})

const $full: ViewStyle = { flex: 1, backgroundColor: colors.background }
const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $logo: ImageStyle = {
  alignSelf: "center",
  maxWidth: "100%",
  width: 100,
  height: 100,
  resizeMode: "cover",
}
const $logosContainer: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-evenly",
}
const $mainButton: ViewStyle = {
  backgroundColor: colors.schoolElementBG,
  alignSelf: "center",
  padding: 10,
  borderRadius: 8,
  marginBottom: 20,
  marginHorizontal: 10,
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
