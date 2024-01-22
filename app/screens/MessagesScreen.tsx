import * as React from "react"
import {
  View,
  ViewStyle,
  RefreshControl,
  TextStyle,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { FlatList, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import AppLayout from "app/appcomponents/appLayout"
import { Icon, Screen, Text } from "app/components"
import { colors, metrics, spacing } from "app/theme"
import { useStores } from "app/models"
import { MessageCard } from "app/appcomponents/messageCard/messageCard"
import { isRTL, translate } from "app/i18n"

export const MessagesScreen: React.FunctionComponent = observer((props) => {
  const { parentStore } = useStores()
  const [parentMsg, cParentMsg] = React.useState("")
  const [msgInput, cMsgInput] = React.useState(false)
  const [msgInputFoc, cMsgInputFoc] = React.useState(false)

  const sendMsg = async () => {
    // send msg

    if (parentMsg.length === 0) return
    try {
      const res = await parentStore?.currentChild?.sendMsg(parentMsg)
      console.log("res", res)
      if (res) {
        cParentMsg("")
      } else {
        console.log("something went wrong")
      }
    } catch (e) {
      console.log("something went wrong", e)
    }
  }

  const emptyList =
    parentStore.currentChild === null || parentStore?.currentChild?.messages.length === 0
  const flatList = React.useRef(null)

  React.useEffect(() => {
    if (parentMsg.length > 0) {
      cMsgInput(true)
    } else if (!msgInputFoc && parentMsg.length === 0) {
      cMsgInput(false)
    }
  }, [parentMsg, msgInputFoc])

  React.useEffect(() => {
    parentStore?.currentChild?.loadMessages(true)
  }, [])

  const {
    parentStore: { school },
  } = useStores()


  let schoolName = school == "warsh" ? '':''

  return (
    <AppLayout>
      <KeyboardAvoidingView
        keyboardVerticalOffset={130}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={$full}
      >
        <Screen preset="fixed" style={$screen} backgroundColor={colors.transparent}>
          <View style={$container}>
            <View style={$flatList}>
              <FlatList
                ref={flatList}
                onContentSizeChange={() => {
                  flatList?.current?.scrollToOffset({ animated: true, offset: 0 })
                }}
                ListHeaderComponent={() =>
                  emptyList ? <Text tx={"tab.messages_empty_list"} style={$text} /> : null
                }
                refreshControl={
                  <RefreshControl
                    refreshing={parentStore?.currentChild?.isLoading}
                    onRefresh={() => {
                      return parentStore?.currentChild?.loadMessages(true)
                    }}
                  />
                }
                inverted
                contentContainerStyle={[$flatList, emptyList ? $centerList : {}]}
                data={parentStore?.currentChild?.messages}
                renderItem={({ item, index }) => (
                  <MessageCard
                    style={$messageCard}
                    messageBody={item.messageBody}
                    messageDateTimestamp={item.messageDate}
                    parent={item.flow === "out"}
                  />
                )}
              />
            </View>
          </View>
        </Screen>

        <View style={$msgView}>
          {msgInput && (
            <TouchableOpacity onPress={sendMsg}>
              <Icon
                icon="sendArrow"
                style={{ tintColor: colors.primaryButton }}
                containerStyle={$msgIcon}
              />
            </TouchableOpacity>
          )}

          <TextInput
            multiline={true}
            style={[$inputView, $inputText, parentMsg.length > 0 && $inputTextActive]}
            editable={true}
            value={parentMsg}
            onChangeText={cParentMsg}
            placeholder={translate(`tab.messages_input_placeholder`) } // We don't need to add the school name because we already know the school we are in
            onFocus={() => {
              cMsgInputFoc(true)
              cMsgInput(true)
            }}
            onBlur={() => {
              cMsgInputFoc(false)
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </AppLayout>
  )
})

const $full: ViewStyle = { flex: 1, backgroundColor: "transparent" }
const $screen: ViewStyle = {
  flexGrow: 1,
  width: "100%",
  padding: spacing.lg,
  backgroundColor: "transparent",
}
const $container: ViewStyle = {
  width: "100%",
}
const $messageCard: ViewStyle = {
  marginVertical: 10,
}
const $flatList: ViewStyle = {
  justifyContent: "flex-end",
}
const $centerList: ViewStyle = {
  justifyContent: "center",
}
const $text: TextStyle = {
  fontSize: 16,
  textAlign: "center",
  lineHeight: 24,
}
const $inputView: ViewStyle = {
  backgroundColor: colors.clickableElementBG,
  borderRadius: metrics.clickableElementRadius,
  height: 45,
  alignItems: "center",
  paddingTop: Platform.OS == "ios" ? 11 : 0,
  marginLeft: Platform.OS == "ios" ? 15 : 10,
}
const $msgView: ViewStyle = {
  backgroundColor: colors.clickableElementBG,
  borderRadius: metrics.clickableElementRadius,
  flexDirection: "row-reverse",
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 19,
  marginBottom: 16,
}
const $msgIcon: ViewStyle = {
  marginRight: 15,
}
const $inputTextActive: TextStyle = {
  color: colors.clickableElementText,
  paddingRight: 15,
}

const $inputText: TextStyle = {
  flex: 1,
  color: colors.placeholderText,
  // fontFamily: typography.fonts.primary.regular,
  paddingRight: 15,
  fontSize: 16,
  writingDirection: isRTL ? "rtl" : "ltr",
  width: "100%",
  textAlignVertical: "center",
}
