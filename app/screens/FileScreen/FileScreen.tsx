import * as React from "react"
import { colors } from "app/theme"
import * as Styles from "./styles"
import { eligibleForSport, schoolLevel, subscriptions, suwar } from "app/utils/data"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
import { Platform, TouchableOpacity } from "react-native"
import { useHeader } from "app/utils/useHeader"
import * as ImagePicker from "expo-image-picker"
import { onNavigate } from "app/utils/navigations"
import AppLayout from "app/appcomponents/appLayout"
import { translate, TxKeyPath } from "../../i18n"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Header, Button, Screen, Text, Icon } from "../../components"
import RightHeaderAction from "app/appcomponents/RightActionComponent"
import { trasnformCamelCaseToSnakeCaseObject } from "app/utils/converters"
import { View, Image, TextInput, Alert, ActivityIndicator, ScrollView } from "react-native"
import DropDown from "app/appcomponents/DropDown"

const defaultMaleImg = require("../../appcomponents/childcard/student-male-image.jpg")
const defaultFemaleImg = require("../../appcomponents/childcard/student-female-image.png")

export interface FileScreenProps {
  navigation: any
}

export const FileScreen: React.FunctionComponent<FileScreenProps> = observer((props) => {
  const { parentStore } = useStores()
  const [formObj, changeformObj] = React.useState({
    gender: "",
    firstName: "",
    lastName: "",
    childId: null,
    parentRelationship: null,
    address: "",
    sickness: "",
    phone: "",
    contactEmail: "",
    schoolLevel: "primary_1",
    schoolScores: null,
    lastSurat: null,
    lastAyah: null,
    picture: null,
    subscriptions: "",
    eligibleForSport: null,
    birthdate: "",
    noPicture: false,
  })

  const [date, setDate] = React.useState(new Date())
  const [show, setShow] = React.useState(false)
  const [photo, changePhoto] = React.useState("")
  const [errSet, cErrSet] = React.useState(new Set())
  const [editMode, cEditMode] = React.useState(false)
  const profileCompleted = parentStore.currentChild.profileCompleted

  React.useEffect(() => {
    // get initial data
    const {
      id,
      firstName,
      lastName,
      gender,
      address,
      birthdate,
      phone,
      schoolLevel,
      subscriptions,
      contactEmail,
      eligibleForSport,
      parentRelationship,
      sickness,
      image,
      lastAyah,
      lastSurat,
      schoolScores,
    } = parentStore.currentChild

    if (image) changePhoto(image)
    if (birthdate) setDate(new Date(birthdate))
    const newForm = {
      childId: id,
      parentRelationship: parentRelationship,
      address,
      sickness,
      phone,
      contactEmail: contactEmail,
      schoolLevel: schoolLevel,
      schoolScores: schoolScores,
      lastSurat: lastSurat ? lastSurat.toString() : lastSurat,
      lastAyah: lastAyah ? lastAyah.toString() : lastAyah,
      subscriptions,
      eligibleForSport: eligibleForSport ? eligibleForSport.toString() : eligibleForSport,
      birthdate,
      gender,
      firstName,
      lastName,
      picture: image,
      noPicture: false,
    }

    changeformObj(newForm)

    // if file is not complete set edit mode to true
    if (!profileCompleted) {
      cEditMode(true)
    }
  }, [])

  const handleChoosePhoto = () => {
    Alert.alert(
      translate("file.photoEdit"),
      translate("file.photoEditNote"),
      [
        {
          text: translate("file.photoNotSending"),
          onPress: async () => {
            onFormC(true, "noPicture")
            let newErrSet = new Set(errSet)
            newErrSet.delete("picture")
            cErrSet(newErrSet)
          },
        },
        {
          text: translate("file.photoGallery"),
          onPress: async () => {
            onFormC(false, "noPicture")
            ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0.4,
              base64: true,
            })
              .then((response) => {
                if (!response.cancelled) {
                  const source = {
                    uri: "data:image/jpg;base64," + response.base64,
                  }
                  changePhoto(response.uri)
                  onFormC(source.uri, "picture")
                }
              })
              .catch((error) => {
                console.log("Error selecting image:", error)
              })
          },
        },
        {
          text: translate("file.photoCamera"),
          onPress: async () => {
            onFormC(false, "noPicture")
            ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0.4,
              base64: true,
            })
              .then((response) => {
                if (!response.cancelled) {
                  const source = {
                    uri: "data:image/jpg;base64," + response.base64,
                  }
                  changePhoto(response.uri)
                  onFormC(source.uri, "picture")
                }
              })
              .catch((error) => {
                console.log("Error selecting image:", error)
              })
          },
        },
      ],
      { cancelable: true },
    )
  }
  const refInput = React.useRef(null)

  function onFormC(txt, key) {
    // takes txt and which key value to update
    const formCopy = Object.assign({}, formObj)
    //   const changedVal = { formCopy[key]: }
    const newForm = {
      ...formCopy,
      [key]: txt,
    }
    changeformObj(newForm)
  }
  function alert(title, msg, callback) {
    Alert.alert(translate(`file. ${title}` as TxKeyPath), translate(("file." + msg) as TxKeyPath), [
      {
        text: translate("common.ok"),
        onPress: callback,
      },
    ])
  }

  function formVald() {
    // child id comes from API
    // if no child id return right
    // required fileds
    const reqArr = [
      "parentRelationship",
      "address",
      "schoolLevel",
      "schoolScores",
      "lastSurat",
      "lastAyah",
      "picture",
    ]
    let formValid = true
    // new error set
    const newErSet = new Set()
    // copy to avoid mutating state
    const formObjCopy = Object.assign({}, formObj)
    // parse to int
    formObjCopy["lastSurat"] = parseInt(formObjCopy["lastSurat"])
    formObjCopy["lastAyah"] = parseInt(formObjCopy["lastAyah"])
    formObjCopy["childId"] = parseInt(formObjCopy["childId"])
    formObjCopy["eligibleForSport"] = parseInt(formObjCopy["eligibleForSport"])

    // validate form here
    reqArr.forEach((item) => {
      if (!formObj[item]) {
        console.log("item wasn't filled", item)
        newErSet.add(item)
        formValid = false
      }
    })
    // validate picture
    if (
      formObj["picture"].startsWith("http") &&
      formObj["picture"].includes("images/default") &&
      formObj["noPicture"] === false
    ) {
      newErSet.add("picture")
    }
    // update errSet
    cErrSet(newErSet)
    if (formValid) {
      // make api call here
      try {
        const res = parentStore.currentChild.updateProfile(
          trasnformCamelCaseToSnakeCaseObject(formObjCopy),
        )
        if (res) {
          cEditMode(false)
          alert("sendInfo", "fileUpdatesuccess", () => {
            // if (!profileCompleted) {
            // parentStore.navigateTo("main", {
            //   parentStore: parentStore,
            // })
            // }
          })
        } else alert("sendInfo", "fileUpdateFail", "")
      } catch (e) {
        alert("sendInfo", "fileUpdateFail", "")
      }
    } else {
      return alert("sendInfo", "fileFormFeedback", "")
    }
  }
  function formatDate(date, yearFirst = true) {
    // turn date into format daypicker can use yyyy-mm-dd
    if (date == null) return
    const d = date
    let month = "" + (d.getMonth() + 1)
    let day = "" + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day

    return yearFirst ? [year, month, day].join("-") : [day, month, year].join("-")
  }

  const onDateTimePickerChange = (event, selectedDate) => {
    setShow(false)
    const currentDate = selectedDate || date
    onFormC(formatDate(currentDate), "birthdate")

    setDate(currentDate)
  }

  useHeader(
    {
      title: translate("tab.file"),
      titleMode: "flex",
      rightIcon: "menu",
      onRightPress: onNavigate,
      RightActionComponent: (() => <RightHeaderAction navigation={props.navigation} />)(),
    },
    [onNavigate],
  )

  const [pikersSchoolLevel, setschoolLevel] = React.useState(false)
  const handlePikerSchoolLevel = () => {
    setschoolLevel(!pikersSchoolLevel)
  }
  const [pikerslastSurat, setlastSurat] = React.useState(false)
  const handlePikerlastSurat = () => {
    setlastSurat(!pikerslastSurat)
  }

  return (
    <AppLayout>
      <Screen
        contentContainerStyle={[Styles.$container]}
        preset="fixed"
        backgroundColor={colors.transparent}
      >
        <ScrollView
          contentContainerStyle={[Styles.$elementsContainer, !editMode && { paddingBottom: 70 }]}
        >
          {!profileCompleted && <Header titleTx={"file.completeProfile"} />}

          <View style={[Styles.$siContainer, !editMode && { justifyContent: "center" }]}>
            {editMode ? (
              <TouchableOpacity
                onPress={handleChoosePhoto}
                style={
                  editMode ? { flexDirection: "row", alignItems: "center", width: "100%" } : {}
                }
              >
                <Image
                  source={
                    photo?.length > 0
                      ? { uri: photo }
                      : formObj.gender === "female"
                      ? defaultFemaleImg
                      : defaultMaleImg
                  }
                  style={[Styles.$studentImage, errSet.has("picture") && Styles.$studentImageReq]}
                />
                <View style={Styles.$siTextCon}>
                  <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                    <Text
                      style={[
                        Styles.$inputTitle,
                        { paddingTop: 2, paddingBottom: 6 },
                        errSet.has("picture") && Styles.$textError,
                      ]}
                      tx="file.photoEdit"
                    ></Text>
                    {editMode && <Text style={Styles.$reqTxt}>* </Text>}
                  </View>
                  {formObj.noPicture ? (
                    <Text tx="file.photoNotSending"></Text>
                  ) : (
                    <Text tx="file.photoEditNote"></Text>
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <Image
                source={
                  photo?.length > 0
                    ? { uri: photo }
                    : formObj.gender === "female"
                    ? defaultFemaleImg
                    : defaultMaleImg
                }
                style={Styles.$studentImage}
              />
            )}
          </View>

          {!editMode && (
            <>
              <View>
                <Text style={Styles.$inputTitle} tx="file.firstName"></Text>
                <TextInput
                  multiline={true}
                  numberOfLines={1}
                  selectTextOnFocus={true}
                  style={[Styles.$inputView, Styles.$inputText, Styles.$inputViewDisabled]}
                  value={formObj.firstName}
                  returnKeyType={"next"}
                  editable={false}
                  onSubmitEditing={() => {
                    refInput.current.focus()
                  }}
                />
              </View>
              <View>
                <Text style={Styles.$inputTitle} tx="file.lastName"></Text>
                <TextInput
                  multiline={true}
                  numberOfLines={1}
                  selectTextOnFocus={true}
                  ref={refInput}
                  style={[Styles.$inputView, Styles.$inputText, Styles.$inputViewDisabled]}
                  editable={false}
                  value={formObj.lastName}
                />
              </View>
            </>
          )}

          <View>
            <Text style={Styles.$inputTitle} tx="file.birthdate"></Text>
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
                height: 48,
              }}
            >
              <Button
                style={[
                  Styles.$inputBtn,
                  Styles.$inputView,
                  !editMode && Styles.$inputViewDisabled,
                ]}
                textStyle={[Styles.$inputTextLeft, { fontSize: 17 }]}
                text={formObj.birthdate}
                onPress={async () => {
                  setShow(true)
                }}
                disabled={!editMode}
              />
            </View>
          </View>

          {show && (
            <DateTimePicker
              testID="123"
              value={date}
              is24Hour={true}
              mode={"date"}
              display="default"
              onChange={onDateTimePickerChange}
            />
          )}

          <View>
            <View style={{ flexDirection: "row", marginTop: 3 }}>
              <Text
                style={[Styles.$inputTitle, errSet.has("parentRelationship") && Styles.$textError]}
                tx="file.parentRelationship"
              ></Text>
              {editMode && <Text style={Styles.$reqTxt}>* </Text>}
            </View>
            <TextInput
              multiline={true}
              numberOfLines={1}
              selectTextOnFocus={true}
              ref={refInput}
              style={[
                Styles.$inputView,
                Styles.$inputText,
                errSet.has("parentRelationship") && Styles.$inputError,
                !editMode && Styles.$inputViewDisabled,
              ]}
              onChangeText={(text) => onFormC(text, "parentRelationship")}
              value={formObj.parentRelationship}
              placeholder={"أم، أب..."}
              editable={editMode}
            />
          </View>

          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[Styles.$inputTitle, errSet.has("address") && Styles.$textError]}
                tx="file.address"
              ></Text>
              {editMode && <Text style={Styles.$reqTxt}>* </Text>}
            </View>
            <TextInput
              multiline={true}
              numberOfLines={1}
              selectTextOnFocus={true}
              ref={refInput}
              style={[
                Styles.$inputView,
                Styles.$inputText,
                errSet.has("address") && Styles.$inputError,
                !editMode && Styles.$inputViewDisabled,
              ]}
              onChangeText={(text) => onFormC(text, "address")}
              value={formObj.address}
              editable={editMode}
            />
          </View>

          <View>
            <Text style={Styles.$inputTitle} tx="file.phone"></Text>
            <TextInput
              multiline={true}
              numberOfLines={1}
              selectTextOnFocus={true}
              ref={refInput}
              style={[Styles.$inputView, Styles.$inputText, !editMode && Styles.$inputViewDisabled]}
              onChangeText={(text) => onFormC(text, "phone")}
              value={formObj.phone}
              editable={editMode}
            />
          </View>

          <View>
            <Text style={Styles.$inputTitle} tx="file.contactEmail"></Text>
            <TextInput
              multiline={true}
              numberOfLines={1}
              selectTextOnFocus={true}
              ref={refInput}
              style={[Styles.$inputView, Styles.$inputText, !editMode && Styles.$inputViewDisabled]}
              onChangeText={(text) => onFormC(text, "contactEmail")}
              value={formObj.contactEmail}
              editable={editMode}
            />
          </View>

          <DropDown
            has="schoolLevel"
            tx="file.schoolLevel"
            editMode={editMode}
            errSet={errSet}
            titre={
              formObj.schoolLevel
                ? `${translate(("file." + formObj.schoolLevel) as TxKeyPath)}`
                : ""
            }
            options={schoolLevel}
            onPress={onFormC}
            keys={"schoolLevel"}
          />

          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[Styles.$inputTitle, errSet.has("schoolScores") && Styles.$textError]}
                tx="file.schoolScores"
              ></Text>
              {editMode && <Text style={Styles.$reqTxt}>* </Text>}
            </View>
            <TextInput
              multiline={true}
              numberOfLines={1}
              selectTextOnFocus={true}
              ref={refInput}
              keyboardType="numeric"
              style={[
                Styles.$inputView,
                Styles.$inputText,
                errSet.has("schoolScores") && Styles.$inputError,
                !editMode && Styles.$inputViewDisabled,
              ]}
              onChangeText={(text) => onFormC(text, "schoolScores")}
              value={formObj.schoolScores}
              editable={editMode}
            />
          </View>
          <DropDown
            has="lastAyah"
            tx="file.lastSurat"
            editMode={editMode}
            errSet={errSet}
            titre={formObj.lastSurat != null ? suwar[formObj.lastSurat]?.[1] : ""}
            options={suwar}
            onPress={onFormC}
            keys={"lastSurat"}
          />

          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[Styles.$inputTitle, errSet.has("lastAyah") && Styles.$textError]}
                tx="file.lastAyah"
              ></Text>
              {editMode && <Text style={Styles.$reqTxt}>* </Text>}
            </View>
            <TextInput
              multiline={true}
              numberOfLines={1}
              selectTextOnFocus={true}
              ref={refInput}
              style={[
                Styles.$inputView,
                Styles.$inputText,
                errSet.has("lastAyah") && Styles.$inputError,
                !editMode && Styles.$inputViewDisabled,
              ]}
              keyboardType="numeric"
              onChangeText={(text) => onFormC(text, "lastAyah")}
              value={formObj.lastAyah}
              editable={editMode}
            />
          </View>

          <View>
            <Text style={Styles.$inputTitle} tx="file.sickness"></Text>
            <TextInput
              multiline={true}
              numberOfLines={1}
              selectTextOnFocus={true}
              ref={refInput}
              style={[Styles.$inputView, Styles.$inputText, !editMode && Styles.$inputViewDisabled]}
              onChangeText={(text) => onFormC(text, "sickness")}
              value={formObj.sickness}
              editable={editMode}
            />
          </View>

          <DropDown
            has={null}
            tx="file.eligibleForSport"
            editMode={editMode}
            errSet={null}
            titre={
              formObj.eligibleForSport != null
                ? `${translate(
                    ("file." +
                      (formObj.eligibleForSport === 1 || formObj.eligibleForSport === "1"
                        ? "eligible"
                        : "notEligible")) as TxKeyPath,
                  )}`
                : ""
            }
            options={eligibleForSport}
            onPress={onFormC}
            keys={"eligibleForSport"}
          />

          <DropDown
            has={null}
            errSet={null}
            tx="file.subscriptions"
            editMode={editMode}
            titre={
              formObj.subscriptions != null && formObj.subscriptions != ""
                ? "file." + formObj.subscriptions
                : ""
            }
            options={subscriptions}
            onPress={onFormC}
            keys={"subscriptions"}
          />

          {editMode && (
            <React.Fragment>
              <Button
                style={Styles.$mainButton}
                textStyle={[
                  Styles.$mainButtonText,
                  {
                    color: colors.primaryButtonText,
                  },
                ]}
                tx="file.sendInfo"
                onPress={async () => {
                  formVald()
                }}
              ></Button>
              {profileCompleted && (
                <Button
                  style={Styles.$secondaryButton}
                  textStyle={[
                    Styles.$secondaryButtonText,
                    {
                      color: colors.primaryButtonText,
                      margin: 0,
                    },
                  ]}
                  tx="file.cancelEdit"
                  onPress={async () => {
                    cEditMode(false)
                  }}
                ></Button>
              )}
            </React.Fragment>
          )}
        </ScrollView>

        {!parentStore.currentChild ? (
          <View style={Styles.$loadingView}>
            <ActivityIndicator style={Styles.$indicator} color="white" size="large" />
          </View>
        ) : null}

        {!editMode && (
          <Button onPress={() => cEditMode(true)} style={Styles.$floatingEditTo}>
            <Icon
              icon="edit"
              style={{
                tintColor: colors.primaryButtonText,
                marginTop: Platform.OS == "ios" ? 3 : 0,
              }}
            />
          </Button>
        )}
      </Screen>
    </AppLayout>
  )
})

const Loader = () => {
  return <></>
}

const Edit = () => {
  return <></>
}
