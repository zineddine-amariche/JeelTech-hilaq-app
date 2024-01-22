import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import AppLayout from "app/appcomponents/appLayout"
import { colors, spacing } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import { useNavigation } from "@react-navigation/native"
import { isRTL, translate } from "app/i18n"
import * as Animatable from "react-native-animatable"
import { Formik } from "formik"
import { initialStateProps, useUpdatePassword } from "./Hooks/useUpdatePassword"
import { useStores } from "app/models"

interface UpdatePasswordScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"UpdatePassword">> {}

export const UpdatePasswordScreen: FC<UpdatePasswordScreenProps> = observer(
  function UpdatePasswordScreen() {
    const navigation = useNavigation()

    const onNavigate = () => {
      navigation.goBack()
    }

    useHeader({
      titleTx: "updatePasswordScreen.updatePassword",
      rightIcon: "back",
      titleMode: "flex",
      onRightPress: onNavigate,
    })
    const {
      parentStore: { status, updatePassword, isPasswordUpdated },
    } = useStores()

    useEffect(() => {
      if (updatePassword === "true") {
        Alert.alert(
          translate("updatePasswordScreen.message_alert_title_success"),
          translate("updatePasswordScreen.message_alert_ٍsous_title_success"),
          [
            {
              text: translate("updatePasswordScreen.cancel_alert_message_success"),
              style: "cancel",
              onPress: async () => {
                isPasswordUpdated("")
                navigation.goBack()
              },
            },
            {
              text: translate("updatePasswordScreen.validate_alert_message_success"),
              onPress: async () => {
                isPasswordUpdated("")
              },
            },
          ],
          { cancelable: false },
        )
      } else if (updatePassword === "false") {
        Alert.alert(
          translate("updatePasswordScreen.message_alert_title_success"),
          translate("updatePasswordScreen.message_alert_ٍsous_title_failed"),
          [
            {
              text: translate("updatePasswordScreen.cancel_alert_message_failed"),
              style: "cancel",
              onPress: async () => {
                isPasswordUpdated("")
                navigation.goBack()
              },
            },
            {
              text: translate("updatePasswordScreen.validate_alert_message_failed"),
              onPress: async () => {
                isPasswordUpdated("")
              },
            },
          ],
          { cancelable: false },
        )
      }
    }, [status, updatePassword])

    const {
      initialState,
      validationSchema,
      onSubmit,
      hidePass,
      hidePass2,
      hidePass3,
      PasswordRightAccessory,
      newPasswordRightAccessory,
      confirmPasswordRightAccessory,
    } = useUpdatePassword()

    return (
      <AppLayout>
        <Screen
          backgroundColor={colors.transparent}
          contentContainerStyle={$screenContentContainer}
          preset="fixed"
          safeAreaEdges={["bottom"]}
        >
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={(values, formikAction) => {
              onSubmit(values as initialStateProps)
              formikAction.setSubmitting(false)
              formikAction.resetForm()
            }}
          >
            {({ values, errors, handleChange, handleBlur, touched, handleSubmit }) => {
              const { old_password, new_password, confirm_newPassword } = values
              return (
                <>
                  <View style={{ flex: 1 }}>
                    <TextField
                      selectTextOnFocus={true}
                      onBlur={handleBlur("old_password")}
                      onChangeText={handleChange("old_password")}
                      value={old_password}
                      containerStyle={$margin}
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect={false}
                      secureTextEntry={hidePass}
                      labelTx="updatePasswordScreen.oldPassword"
                      placeholderTx="loginScreen.password"
                      LeftAccessory={isRTL ? PasswordRightAccessory : undefined}
                      RightAccessory={!isRTL ? PasswordRightAccessory : undefined}
                    />
                    {errors.old_password && touched.old_password ? (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={$errorText}>{errors.old_password}</Text>
                      </Animatable.View>
                    ) : null}
                    <TextField
                      selectTextOnFocus={true}
                      onBlur={handleBlur("new_password")}
                      onChangeText={handleChange("new_password")}
                      value={new_password}
                      containerStyle={$margin}
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect={false}
                      secureTextEntry={hidePass2}
                      labelTx="updatePasswordScreen.newPassword"
                      placeholderTx="loginScreen.password"
                      LeftAccessory={isRTL ? newPasswordRightAccessory : undefined}
                      RightAccessory={!isRTL ? newPasswordRightAccessory : undefined}
                    />
                    {errors.new_password && touched.new_password ? (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={$errorText}>{errors.new_password}</Text>
                      </Animatable.View>
                    ) : null}
                    <TextField
                      selectTextOnFocus={true}
                      onBlur={handleBlur("confirm_newPassword")}
                      onChangeText={handleChange("confirm_newPassword")}
                      value={confirm_newPassword}
                      containerStyle={$margin}
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect={false}
                      secureTextEntry={hidePass3}
                      labelTx="updatePasswordScreen.confirmNewPassword"
                      placeholderTx="loginScreen.password"
                      LeftAccessory={isRTL ? confirmPasswordRightAccessory : undefined}
                      RightAccessory={!isRTL ? confirmPasswordRightAccessory : undefined}
                    />
                    {errors.confirm_newPassword && touched.confirm_newPassword ? (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={$errorText}>{errors.confirm_newPassword}</Text>
                      </Animatable.View>
                    ) : null}
                  </View>

                  <Button
                    style={{ marginBottom: spacing.sm }}
                    preset="secondary"
                    tx="updatePasswordScreen.buttonConfirm"
                    onPress={async () => {
                      handleSubmit()
                    }}
                  />
                </>
              )
            }}
          </Formik>
        </Screen>
      </AppLayout>
    )
  },
)

const $screenContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
  flex: 1,
}
const $margin: ViewStyle = {
  marginTop: spacing.md,
}

const $errorText: TextStyle = {
  color: colors.error,
}
