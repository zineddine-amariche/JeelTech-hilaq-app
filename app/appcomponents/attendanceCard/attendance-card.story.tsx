import * as React from "react"
import { View, Alert } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AttendanceCard } from "./attendanceCard"
import { color } from "../../theme"

declare let module

const $viewstyle = {
  flex: 1,
  backgroundColor: color.appBG,
}

storiesOf("AttendanceCard", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Behavior", () => (
    <Story>
      <UseCase noPad text="default" usage="The default usage">
        <View style={$viewstyle}>
          <AttendanceCard
            titleTx="demo.parentName"
            subtitleTx="demo.parentName"
            onPress={() => Alert.alert("pressed")}
          />
        </View>
      </UseCase>
    </Story>
  ))
