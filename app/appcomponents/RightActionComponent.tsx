import React from "react"
import { Platform, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useStores } from "app/models"
import { View } from "react-native"
import { Text } from "app/components"
import { spacing } from "app/theme"

interface RightActionProps extends TouchableOpacityProps {
  firstName?: string
  lastName?: string
  subtitleText?: string
  navigation?: any
}

const RightHeaderAction: React.FC<RightActionProps> = ({ navigation, ...restProps }) => {
  const { parentStore } = useStores()
  const isIos = Platform.OS === "ios"

  const { firstName, lastName, groups } = parentStore.currentChild ?? {
    firstName: "",
    lastName: "",
    groups: "",
  }

  let subtitleText =
    /* " برنامج " + */ groups?.length && groups[0]
      ? groups[0]?.program +
        " " +
        (groups[0]?.program === "الناشئة" ? groups[0]?.level + " " : "") +
        groups[0]?.name
      : ""
  const handlePress = () => {
    navigation.navigate("Children")
  }

  return (
    <TouchableOpacity onPress={handlePress} {...restProps} style={$container}>
      <View style={$subTitle}>
        <Text preset="subheading" size="sm">{`${firstName} ${lastName}`}</Text>
        {subtitleText ? (
          <Text preset="default" size="xxs" numberOfLines={1} ellipsizeMode="tail">
            {subtitleText}
          </Text>
        ) : null}
      </View>
      <MaterialCommunityIcons
        name="menu"
        size={24}
        color="black"
        style={isIos ? { paddingLeft: 8 } : { paddingRight: 8 }}
      />
    </TouchableOpacity>
  )
}

export default RightHeaderAction

const $container: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  flexShrink: 1,
  marginRight: spacing.md,
}

const $subTitle: ViewStyle = {
  alignItems: "flex-end",
  flexShrink: 1,
}
