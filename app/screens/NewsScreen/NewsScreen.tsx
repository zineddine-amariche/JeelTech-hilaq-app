import * as React from "react"
import {
  View,
  ViewStyle,
  RefreshControl,
  TextStyle,
  Modal,
  BackHandler,
  Image,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  FlatList,
} from "react-native"
import { Button, Icon, Screen, Text } from "../../components"
import { colors, spacing } from "app/theme"

import { observer } from "mobx-react-lite"
import ImageViewer from "react-native-image-zoom-viewer"
import { useStores } from "app/models"
import { NewsCard } from "app/appcomponents/NewsCard/NewsCard"
import AppLayout from "app/appcomponents/appLayout"
import { useHeader } from "app/utils/useHeader"
import { translate } from "app/i18n"
import RightHeaderAction from "app/appcomponents/RightActionComponent"
import { NewsItem } from "app/appcomponents/NewsCard/NewsCard.props"
import { useNavigation } from "@react-navigation/native"
import { onNavigate } from "app/utils/navigations"

export const NewsScreen: React.FunctionComponent = observer((props) => {
  const navigation = useNavigation()
  const { parentStore } = useStores()
  const news: NewsItem[] = parentStore?.currentChild?.getNews
  const [showFullImage, setFullImage] = React.useState(null)
  const [showTitle, setTitle] = React.useState(null)

  const closeModal = () => {
    setFullImage(null)
    return true
  }

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", closeModal)
    return () => BackHandler.removeEventListener("hardwareBackPress", closeModal)
  }, [])

  React.useEffect(() => {
    parentStore?.currentChild?.loadNews()
  }, [])

  useHeader(
    {
      title: translate("tab.news"),
      titleMode: "flex",
      rightIcon: "menu",
      onRightPress: onNavigate,
      RightActionComponent: (() => <RightHeaderAction navigation={navigation} />)(),
    },
    [onNavigate],
  )

  return (
    <AppLayout>
      <Screen preset="fixed" backgroundColor={colors.transparent} contentContainerStyle={$screen}>
        <View style={$container}>
          {news !== undefined && news.length > 0 ? (
            <>
              <FlatList<NewsItem>
                data={news}
                refreshControl={
                  <RefreshControl
                    refreshing={parentStore.currentChild.isLoading}
                    onRefresh={() => {
                      return parentStore.currentChild.loadNews()
                    }}
                  />
                }
                renderItem={({ item }: { item: NewsItem }) => {
                  const newsDateTimestamp = new Date(item.date)

                  return (
                    <NewsCard
                      style={NEWS_CARD}
                      newsTitle={item.title}
                      newsBody={item.body}
                      newsDate={item.date}
                      newsDateTimestamp={newsDateTimestamp}
                      picture={item.picture}
                      onImagePress={() => {
                        setFullImage(item.picture)
                        setTitle(item.title)
                      }}
                    />
                  )
                }}
              />
            </>
          ) : (
            <View style={$textContainer}>
              <Text tx={"tab.news_empty_list"} style={$text} />
            </View>
          )}
        </View>
      </Screen>
      <Modal visible={showFullImage !== null} onRequestClose={closeModal}>
        <ImageViewer
          backgroundColor={colors.appBG}
          renderImage={(props) => <Image {...props} />}
          renderHeader={() => {
            return (
              <View style={$buttonContainer}>
                <TouchableOpacity style={$button} onPress={closeModal}>
                  <Icon icon="close" style={{ width: 10, height: 10 }} />
                </TouchableOpacity>
              </View>
            )
          }}
          footerContainerStyle={{ width: "100%" }}
          renderFooter={() => {
            return (
              <View
                style={{
                  paddingHorizontal: spacing.xs,
                  paddingTop: spacing.xs,
                  paddingBottom: spacing.xs,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 20,
                  }}
                  text={showTitle}
                />
              </View>
            )
          }}
          imageUrls={[
            {
              url: showFullImage,
            },
          ]}
          enableSwipeDown={true}
          saveToLocalByLongPress={false}
          onSwipeDown={closeModal}
          renderIndicator={() => null}
        />
      </Modal>
    </AppLayout>
  )
})

const $screen: ViewStyle = {
  flex: 1,
  width: "100%",
  padding: spacing.xs,
  backgroundColor: "transparent",
}
const $container: ViewStyle = {
  flex: 1,
  width: "100%",
  marginTop: 10,
}
const NEWS_CARD: ViewStyle = {
  marginBottom: 20,
}

const $textContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
}
const $text: TextStyle = {
  fontSize: 16,
  textAlign: "center",
  lineHeight: 24,
}
const $buttonContainer: ViewStyle = {
  width: "100%",
  height: 60,
  overflow: "hidden",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingHorizontal: spacing.md,
  marginTop: Platform.OS === "android" ? 0 : spacing.lg,
}

const $button: ViewStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  width: 30,
  height: 30,
  borderRadius: 60,
  alignItems: "center",
  justifyContent: "center",
}

export const $flatlist: ViewStyle = {
  flex: 1,
}
