import { translate } from "app/i18n"
import { useState } from "react"
import * as Yup from "yup"

import { Alert } from "react-native"
import { useStores } from "app/models"

export interface initialStateProps {
  email: string
  password: string
}

export function useLogin() {
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const {
    parentStore: { setStatus, login },
  } = useStores()

  const handleHidePassword = () => {
    setIsAuthPasswordHidden(!isAuthPasswordHidden)
  }

  const initialState: initialStateProps = {
    email: "",
    password: "",
  }

  const onLogin = async (values: initialStateProps) => {
    const { password, email } = values
    login(email, password)
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().required(translate("loginScreen.emailSchema.require")),
    password: Yup.string()
      .max(25, translate("loginScreen.passwordSchema.max"))
      .required(translate("loginScreen.passwordSchema.require"))
      .min(4, translate("loginScreen.passwordSchema.min")),
  })

  function resetPassword() {
    Alert.alert(
      translate("loginScreen.passwordResetAlert"),
      translate("loginScreen.passwordResetAlertMessage"),
      [
        {
          text: translate("common.ok"),
        },
      ],
    )
  }

  const ErrorLogin = () => {
    Alert.alert(translate("loginScreen.errorLogin"), translate("loginScreen.errorLoginMessage"), [
      {
        text: translate("common.ok"),
        onPress: async () => {
          setStatus("done")
        },
      },
    ])
  }

  return {
    validationSchema,
    initialState,
    handleHidePassword,
    onLogin,
    resetPassword,
    ErrorLogin,
    isAuthPasswordHidden,
  }
}
