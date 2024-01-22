import { Text } from "app/components"
import React, { useState } from "react"
import { View, TouchableOpacity, Modal, StyleSheet, ScrollView } from "react-native"
import {
  $inputTitle,
  $inputView,
  $inputViewDisabled,
  $reqTxt,
  $textError,
} from "app/screens/FileScreen"
import { colors, typography } from "app/theme"

const DropDown = ({ editMode, tx, errSet, has, titre, options, onPress, keys }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleSelect = (value) => {
    setModalVisible(false)
    onPress(value, keys)
  }
  const HandlClosed = () => {
    setModalVisible(false)
  }

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={[$inputTitle, errSet && errSet.has(has) && $textError]} tx={tx}></Text>
        {editMode && <Text style={$reqTxt}>* </Text>}
      </View>
      <TouchableOpacity
        disabled={!editMode ? true : false}
        style={[$inputView, !editMode && $inputViewDisabled]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.inputText} tx={keys == "subscriptions" ? titre : null}>
          {titre}
        </Text>
      </TouchableOpacity>
      <DropdownSelectModal
        modalVisible={modalVisible}
        setModalVisible={HandlClosed}
        options={options}
        handleSelect={handleSelect}
        keys={keys}
      />
    </>
  )
}

export default DropDown

const DropdownSelectModal = ({ modalVisible, setModalVisible, keys, options, handleSelect }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={setModalVisible}
    >
      <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={setModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {keys == "lastSurat" ? (
              <DropModeSuwar options={options} handleSelect={handleSelect} />
            ) : (
              <DropMode options={options} handleSelect={handleSelect} />
            )}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const DropModeSuwar = ({ options, handleSelect }) => {
  return options.map((item, index) => (
    <TouchableOpacity
      key={"" + item[1]}
      style={[styles.option, index < 2 ? styles.noTopBorder : styles.withTopBorder]}
      onPress={() => handleSelect((index + 0).toString())}
    >
      <Text>{"" + item[1]}</Text>
    </TouchableOpacity>
  ))
}

const DropMode = ({ options, handleSelect }) => {
  return options.map((item, index) => (
    <TouchableOpacity
      key={item.value}
      style={[styles.option, index < 2 ? styles.noTopBorder : styles.withTopBorder]}
      onPress={() => handleSelect(item.value)}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  ))
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    maxHeight: "60%", // Set the height of the modal to 60% of the screen
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    paddingVertical: 10,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  option: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  noTopBorder: {
    borderTopWidth: null, // or 0
  },
  withTopBorder: {
    borderTopWidth: 1,
    borderColor: colors.separator,
  },
  inputText: {
    color: colors.clickableElementText,
    paddingHorizontal: 10,
    textAlign: "left",
    height: 50,
    width: "100%",
    textAlignVertical: "center",
    paddingTop: Platform.OS == "ios" ? 15 : 1, // Adjust this value to vertically center the text
    fontFamily: typography.primary.normal,
  },
})
