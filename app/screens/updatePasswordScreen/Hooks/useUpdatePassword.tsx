import * as Yup from "yup"
import { useEffect, useMemo, useState } from "react"
import { translate } from "app/i18n"
import { Icon, TextFieldAccessoryProps } from "app/components"
import { colors } from "app/theme"
import { useStores } from "app/models"

export interface initialStateProps {
  old_password: string
  new_password: string
  confirm_newPassword: string
}

export function useUpdatePassword() {
  const [hidePass, setHidePass] = useState(false)
  const [hidePass2, setHidePass2] = useState(false)
  const [hidePass3, setHidePass3] = useState(false)

  const {
    parentStore: { setupdatePassword },
  } = useStores()

  const handleHidePassword = () => {
    setHidePass(!hidePass)
  }
  const handleHidePassword2 = () => {
    setHidePass2(!hidePass2)
  }
  const handleHidePassword3 = () => {
    setHidePass3(!hidePass3)
  }
  const initialState: initialStateProps = {
    old_password: "",
    new_password: "",
    confirm_newPassword: "",
  }

  const onSubmit = async (values: initialStateProps) => {
    const { new_password, old_password } = values
    let object = {
      old_password,
      new_password,
    }
    setupdatePassword(object)
  }

  let validationSchema = Yup.object().shape({
    old_password: Yup.string()
      .max(25, translate("updatePasswordScreen.old_passwordErrors.max"))
      .required(translate("updatePasswordScreen.old_passwordErrors.require"))
      .min(6, translate("updatePasswordScreen.old_passwordErrors.min")),
    new_password: Yup.string()
      .max(25, translate("updatePasswordScreen.new_passwordErrors.max"))
      .required(translate("updatePasswordScreen.new_passwordErrors.require"))
      .min(6, translate("updatePasswordScreen.new_passwordErrors.min")),
    confirm_newPassword: Yup.string()
      .max(25, translate("updatePasswordScreen.confirm_newPasswordErrors.max"))
      .required(translate("updatePasswordScreen.confirm_newPasswordErrors.require"))
      .min(6, translate("updatePasswordScreen.confirm_newPasswordErrors.min"))
      .oneOf(
        [Yup.ref("new_password"), null],
        translate("updatePasswordScreen.confirm_newPasswordErrors.oneOf"),
      ),
  })

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={hidePass ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={handleHidePassword}
          />
        )
      },
    [hidePass],
  )

  const newPasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={hidePass2 ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={handleHidePassword2}
          />
        )
      },
    [hidePass2],
  )

  const confirmPasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={hidePass3 ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={handleHidePassword3}
          />
        )
      },
    [hidePass3],
  )

  return {
    initialState,
    validationSchema,
    onSubmit,
    hidePass,
    hidePass2,
    hidePass3,
    handleHidePassword,
    handleHidePassword2,
    handleHidePassword3,
    PasswordRightAccessory,
    newPasswordRightAccessory,
    confirmPasswordRightAccessory,
  }
}
