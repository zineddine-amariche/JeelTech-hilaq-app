import React, { useMemo, useRef } from "react"
import { Button, Icon, TextField, TextFieldAccessoryProps } from "app/components"
import { colors, spacing } from "app/theme"
import { Formik } from "formik"
import { initialStateProps, useLogin } from "../Hooks/useLogin"
import {  TextInput, ViewStyle } from "react-native"
import { isRTL } from "app/i18n"

const LoginForm = () => {
  const {
    onLogin,
    initialState,
    validationSchema,
    isAuthPasswordHidden,
    resetPassword,
    handleHidePassword,
  } = useLogin()
  const authPasswordInput = useRef<TextInput>()

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={handleHidePassword}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={(values, formikAction) => {
        onLogin(values as initialStateProps)
        formikAction.setSubmitting(false)
        formikAction.resetForm()
      }}
    >
      {({ values, errors, handleChange, handleBlur, touched, handleSubmit }) => {
        const { email, password } = values
        return (
          <>
            <TextField
              containerStyle={$margin}
              selectTextOnFocus={true}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
              value={email}
              keyboardType="phone-pad"
              returnKeyType={"next"}
              autoCapitalize="none"
              autoCorrect={false}
              labelTx="loginScreen.phoneNumber"
              placeholderTx="loginScreen.phoneNumber"
              helper={errors.email}
              status={errors.email ? "error" : undefined}
              onSubmitEditing={() => authPasswordInput.current?.focus()}
              name="email"
            />
            <TextField
              name="password"
              selectTextOnFocus={true}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
              ref={authPasswordInput}
              value={password}
              containerStyle={$margin}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              status={errors.email ? "error" : undefined}
              helper={errors.password}
              secureTextEntry={isAuthPasswordHidden}
              labelTx="loginScreen.password"
              placeholderTx="loginScreen.password"
              LeftAccessory={isRTL ? PasswordRightAccessory : undefined}
              RightAccessory={!isRTL ? PasswordRightAccessory : undefined}
            />
            <Button
              testID="login-button"
              tx="loginScreen.login"
              style={$margin}
              preset="primary"
              onPress={handleSubmit}
            />
            <Button
              tx="loginScreen.passwordReset"
              style={$margin}
              preset="secondary"
              onPress={resetPassword}
            />
          </>
        )
      }}
    </Formik>
  )
}

export default LoginForm

const $margin: ViewStyle = {
  marginTop: spacing.md,
}
