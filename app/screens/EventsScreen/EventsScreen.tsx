import * as React from "react"
import { View, RefreshControl, ScrollView, FlatList } from "react-native"
import { Screen, Text } from "../../components"
import { colors } from "../../theme"
import { observer, Observer } from "mobx-react-lite"
import { useStores } from "app/models"
import * as Styles from "./styles"
import { EventModel } from "app/models/EventModel"
import { EventCard } from "app/appcomponents/eventCard/EventCard"
import AppLayout from "app/appcomponents/appLayout"

export const EventsScreen: React.FunctionComponent = observer(() => {
  const { parentStore } = useStores()
  const nextEvents: EventModel[] = parentStore.currentChild?.nextEvents
  const prevEvents: EventModel[] = parentStore.currentChild?.prevEvents

  React.useEffect(() => {
    parentStore.currentChild?.loadEvents()
  }, [])

  return (
    <Observer>
      {() => (
        <AppLayout>
          {nextEvents !== undefined && nextEvents.length > 0 ? (
            <Screen
              preset="scroll"
              style={Styles.$screen}
              backgroundColor={colors.transparent}
              refreshControl={
                <RefreshControl
                  refreshing={parentStore.currentChild?.isLoading}
                  onRefresh={() => {
                    return parentStore.currentChild?.loadEvents()
                  }}
                />
              }
            >
              <View style={Styles.$container}>
                <>
                  <Text text="البرامج القادمة" style={Styles.$cardsHeader} />
                  <FlatList
                    data={nextEvents}
                    renderItem={({ item }) => (
                      <EventCard
                        style={Styles.$eventCard}
                        titleText={item.type}
                        date={item.date}
                        dateTimestamp={item.dateTimestamp}
                        nextOrPresence={"next"}
                        gender={parentStore.currentChild?.gender}
                      />
                    )}
                  />
                </>
                {prevEvents !== undefined && prevEvents.length > 0 && (
                  <>
                    <Text text="البرامج السابقة" style={Styles.$cardsHeader} />
                    <FlatList
                      data={prevEvents}
                      renderItem={({ item }) => (
                        <EventCard
                          style={Styles.$eventCard}
                          titleText={item.type}
                          date={item.date}
                          dateTimestamp={item.dateTimestamp}
                          nextOrPresence={item.presence}
                          gender={parentStore.currentChild?.gender}
                        />
                      )}
                    />
                  </>
                )}
              </View>
            </Screen>
          ) : (
            <ScrollView
              contentContainerStyle={Styles.$textContainer}
              refreshControl={
                <RefreshControl
                  refreshing={parentStore.currentChild?.isLoading}
                  onRefresh={() => {
                    return parentStore.currentChild?.loadEvents()
                  }}
                />
              }
            >
              <Text tx={"tab.events_empty_list"} style={Styles.$text} />
            </ScrollView>
          )}
        </AppLayout>
      )}
    </Observer>
  )
})
