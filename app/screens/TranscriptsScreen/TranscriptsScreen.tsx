import * as React from "react"
import {
  View,
  RefreshControl,
  Modal,
  ScrollView,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native"
import { Button, Icon, Screen, Text } from "../../components"
import { colors } from "../../theme"
import { observer } from "mobx-react-lite"
import Pdf from "react-native-pdf"
import { useStores } from "app/models"
import * as Styles from "./styles"
import AppLayout from "app/appcomponents/appLayout"
import { TranscriptModel } from "app/models/TranscriptModel"

export const TranscriptsScreen: React.FunctionComponent = observer(() => {
  const { parentStore } = useStores()
  const transcripts: TranscriptModel[] = parentStore.currentChild?.transcripts
  const [currentTranscript, setCurrentTranscript] = React.useState(null)

  const loadTranscripts = async () => {
    await parentStore.currentChild?.loadTranscripts()
  }

  React.useEffect(() => {
    ;(async function load() {
      await loadTranscripts()
    })()
  }, [parentStore])

  const handleTranscript = (values: object) => {
    setCurrentTranscript(values)
  }

  return (
    <AppLayout>
      {transcripts !== undefined && transcripts.length > 0 ? (
        <Screen
          preset="fixed"
          style={Styles.$screen}
          backgroundColor={colors.transparent}
          refresh={parentStore.currentChild?.isLoading}
          onRefresh={() => parentStore.currentChild?.loadTranscripts()}
        >
          <FlatList
            data={transcripts}
            renderItem={({ item }) => (
              <Button
                style={Styles.$button}
                preset="default"
                onPress={() => {
                  if (!item.url) {
                    loadTranscripts()
                  }
                  const { id, title, url } = item
                  const obj = {
                    id,
                    title,
                    url,
                  }

                  handleTranscript(obj)
                }}
              >
                <Text style={Styles.$titleText} text={item.title} />
              </Button>
            )}
          />
          <ModalPoints currentTranscript={currentTranscript} handleTranscript={handleTranscript} />
        </Screen>
      ) : (
        <ScrollView
          contentContainerStyle={Styles.$textContainer}
          refreshControl={
            <RefreshControl
              refreshing={parentStore.currentChild?.isLoading}
              onRefresh={() => {
                return parentStore.currentChild?.loadTranscripts()
              }}
            />
          }
        >
          <Text tx={"tab.transcripts_empty_list"} style={Styles.$text} />
        </ScrollView>
      )}
    </AppLayout>
  )
})

const ModalPoints = ({ currentTranscript, handleTranscript }) => {
  const PdfResource = { uri: currentTranscript?.url, cache: true }
  return (
    <Modal visible={currentTranscript != null} onRequestClose={() => handleTranscript(null)}>
      <SafeAreaView style={Styles.$containerModal}>
        <Button style={Styles.$buttonBack} preset="default" onPress={() => handleTranscript(null)}>
          <Icon icon="exit" style={Styles.$Icon} />
        </Button>
        {currentTranscript && currentTranscript.url ? (
          <Pdf
            trustAllCerts={false}
            source={PdfResource}
            style={Styles.$pdf}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`)
            }}
          />
        ) : (
          <ActivityIndicator style={Styles.$indicator} color="black" size="large" />
        )}
      </SafeAreaView>
    </Modal>
  )
}
