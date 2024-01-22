import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  getParent,
  hasParent,
  types,
} from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import _ from "lodash"
import { ParentStore } from "./ParentStore"
import { api } from "app/services/api"
import { AttendanceStore, AttendanceModel } from "./Attendance"
import { GroupModel } from "./Group"
import { EventModel } from "./EventModel"
import { NewsModel } from "./NewsModel"
import { TranscriptModel } from "./TranscriptModel"
import { MessageStore, MessageStoreModel } from "./MessageModel"
import { FutureAttendanceModel } from "./FutureAttendanceModel"

/**
 * This represents a children.
 */
export const ChildModel = types
  .model("Child")
  .props({
    status: types.optional(types.enumeration(["idle", "pending", "done", "error"]), "idle"),
    id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    gender: types.string,
    image: types.maybeNull(types.string),
    groups: types.optional(types.array(GroupModel), []),
    attendances: types.optional(types.array(AttendanceModel), []),
    futureAttendances: types.optional(types.array(FutureAttendanceModel), []),
    messages: types.optional(types.array(MessageStoreModel), []),
    attendanceUpdated: types.optional(types.boolean, false),
    hasNewMessages: types.maybeNull(types.number),
    hasNewAttendances: types.maybeNull(types.number),
    hasNewNews: types.maybeNull(types.number),
    hasNewTranscripts: types.maybeNull(types.number),
    events: types.optional(types.array(EventModel), []),
    news: types.optional(types.array(NewsModel), []),
    birthdate: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    schoolLevel: types.maybeNull(types.string),
    schoolScores: types.maybeNull(types.string),
    lastSurat: types.maybeNull(types.number),
    lastAyah: types.maybeNull(types.number),
    subscriptions: types.maybeNull(types.string),
    contactEmail: types.maybeNull(types.string),
    eligibleForSport: types.maybeNull(types.number),
    parentRelationship: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    sickness: types.maybeNull(types.string),
    transcripts: types.optional(types.array(TranscriptModel), []),
  })
  .actions(withSetPropAction)
  .views((store) => ({
    // has user already submited the file info?
    // if none of the values are missing return true
    // else false

    get profileCompleted() {
      const { parentRelationship, address, schoolLevel, schoolScores, lastSurat, lastAyah } = store

      if (parentRelationship && address && schoolLevel && schoolScores && lastSurat && lastAyah) {
        return true
      }
      return false
    },
    get isLoading() {
      return store.status === "pending"
    },
    get lastAttendance() {
      // TODO : WIP
      return _.head(store.attendances)
    },
    get pastAttendances() {
      // TODO : WIP
      return _.tail(store.attendances)
    },
    get nextEvents() {
      // TODO : WIP
      return store.events
        .filter(function (a) {
          a.dateTimestamp.setHours(0, 0, 0, 0)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return a.dateTimestamp.getTime() >= today.getTime()
        })
        .sort(function (o) {
          return o.dateTimestamp.getTime()
        })
    },
    get prevEvents() {
      // TODO : WIP
      return store.events
        .filter(function (a) {
          a.dateTimestamp.setHours(0, 0, 0, 0)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return a.dateTimestamp.getTime() < today.getTime()
        })
        .sort(function (o) {
          return o.dateTimestamp.getTime()
        })
    },
    get getNews() {
      // TODO : WIP
      return store.news.slice().sort(function (a, b) {
        return a.dateTimestamp.getTime()
      })
    },
  }))

  .actions((store) => ({
    setStatus(value?: "idle" | "pending" | "done" | "error") {
      store.setProp("status", value)
    },
  }))
  .actions((store) => ({
    setHasNewMessages(count = 1) {
      store.hasNewMessages = count

      if (hasParent(store, 2)) {
        ;(getParent(store, 2) as ParentStore).setHasNewNotification()
      }
    },
  }))
  .actions((store) => ({
    updateHasNewAttendances() {
      // TODO : WIP
      store.hasNewAttendances = store.attendances.reduce(function (accumulator, currentValue) {
        return accumulator + (currentValue.attendanceStatus === "new" ? 1 : 0)
      }, 0)
      if (store.hasNewAttendances > 0) {
        if (hasParent(store, 2)) {
          ;(getParent(store, 2) as ParentStore).setHasNewNotification()
        }
      }
    },
    async setMessagesSeen() {
      // TODO : WIP
      store.setStatus("pending")
      try {
        const result = await api.setMessagesSeen(store.id)

        if (result.kind === "ok") {
          store.setHasNewMessages(0)
          store.setStatus("done")
        } else {
          console.log("error ", result)
          store.setStatus("error")
        }
      } catch (err) {
        console.log("error ", err)
        store.setStatus("error")
      }
    },
    async setNewsSeen() {
      // TODO : WIP
      store.setStatus("pending")
      try {
        const result = await api.setNewsSeen(store.id)

        if (result.kind === "ok") {
          store.hasNewNews = 0
          if (store.hasNewNews > 0) {
            if (hasParent(store, 2)) {
              ;(getParent(store, 2) as ParentStore).setHasNewNotification()
            }
          }
          store.setStatus("done")
        } else {
          console.log("error ", result)
          store.setStatus("error")
        }
      } catch (err) {
        console.log("error ", err)
        store.setStatus("error")
      }
    },
  }))
  .actions((store) => ({
    setAttendanceUpdated(value: boolean) {
      store.attendanceUpdated = value
    },
    setAttendances(value: AttendanceStore[] | any) {
      if (store.attendances) {
        if (value) {
          store.attendances.replace(value as any)
        } else {
          store.attendances.clear()
        }
      } else {
        store.attendances = value as any
      }
      store.updateHasNewAttendances()
    },
    setFutureAttendances(value: FutureAttendanceModel[]) {
      if (store.futureAttendances) {
        if (value) {
          store.futureAttendances.replace(value as any)
        } else {
          store.futureAttendances.clear()
        }
      } else {
        store.futureAttendances = value as any
      }
    },
    setMessages(value: MessageStore[]) {
      if (store.messages) {
        if (value) {
          store.messages.replace(value as any)
        } else {
          store.messages.clear()
        }
      } else {
        store.messages = value as any
      }
    },
    setEvents(value: EventModel[]) {
      if (store.events) {
        if (value) {
          store.events.replace(value as any)
        } else {
          store.events.clear()
        }
      } else {
        store.events = value as any
      }
    },
    setTranscripts(value: TranscriptModel[]) {
      if (store.transcripts) {
        if (value) {
          store.transcripts.replace(value as any)
        } else {
          store.transcripts.clear()
        }
      } else {
        store.transcripts = value as any
      }
    },
    setNews(value: NewsModel[]) {
      if (store.news) {
        if (value) {
          store.news.replace(value as any)
        } else {
          store.news.clear()
        }
      } else {
        store.news = value as any
      }
      store.setNewsSeen()
    },
  }))

  .actions((store) => ({
    // ... other actions

    async loadAttendances() {
      store.setStatus("pending")

      try {
        const result = await api.getAttendances(store.id)

        if (result.kind === "ok") {
          store.setAttendances(result.attendances)
          store.setFutureAttendances(result.futureAttendances)
          store.setStatus("done")
        } else {
          console.log("error ", result)
          store.setStatus("error")
        }
      } catch (err) {
        console.log("error ", err)
        store.setStatus("error")
      }
    },

    async loadMessages(updateSeen = false) {
      store.setStatus("pending")

      try {
        const result = await api.getMessages(store.id)

        if (result.kind === "ok") {
          if (result.messages.length !== store.messages.length) {
            store.setHasNewMessages()
          }
          store.setMessages(result.messages)
          store.setStatus("done")
        } else {
          console.log("error ", result)
          store.setStatus("error")
        }
      } catch (err) {
        console.log("error ", err)
        store.setStatus("error")
      }

      if (updateSeen) {
        if (store.hasNewMessages > 0) {
          store.setMessagesSeen()
        }
      }
    },

    async sendMsg(msg) {
      store.setStatus("pending")

      try {
        const result = await api.sendMsg(store.id, msg)

        if (result.kind === "ok") {
          store.setMessages(result.messages)
          store.setStatus("done")
          return true
        } else {
          console.log("error ", result)
          store.setStatus("error")
          return false
        }
      } catch (err) {
        console.log("error ", err)
        store.setStatus("error")
        return false
      }
    },

    async loadEvents() {
      store.setStatus("pending")

      try {
        const result = await api.getEvents(store.id)

        if (result.kind === "ok") {
          store.setEvents(result.events)
          store.setStatus("done")
        } else {
          console.log("error ", result)
          store.setStatus("error")
        }
      } catch (err) {
        console.log("error ", err)
        store.setStatus("error")
      }
    },

    async loadNews() {
      store.setStatus("pending")

      try {
        const result = await api.getNews(store.id)
        if (result.kind === "ok") {
          store.setNews(result.news)
          store.setStatus("done")
        } else {
          console.log("error ", result)
          store.setStatus("error")
        }
      } catch (err) {
        console.log("error ", err)
        store.setStatus("error")
      }
    },

    async loadTranscripts() {
      store.setStatus("pending")

      try {
        const result = await api.getTranscripts(store.id)

        if (result.kind === "ok") {
          store.setTranscripts(result.transcripts)
          store.setStatus("done")
        } else {
          console.log("error ", result)
          store.setStatus("error")
        }
      } catch (err) {
        console.log("error ", err)
        store.setStatus("error")
      }
    },

    async updateProfile(data) {
      store.setStatus("pending")

      try {
        const result = await api.updateProfile(data)

        if (result.kind === "ok") {
          const {
            firstName,
            lastName,
            gender,
            image,
            birthdate,
            phone,
            schoolLevel,
            schoolScores,
            lastSurat,
            lastAyah,
            subscriptions,
            contactEmail,
            eligibleForSport,
            parentRelationship,
            address,
            sickness,
          } = result.store

          store.firstName = firstName
          store.lastName = lastName
          store.gender = gender
          store.image = image
          store.birthdate = birthdate
          store.phone = phone
          store.schoolLevel = schoolLevel
          store.schoolScores = schoolScores
          store.lastSurat = lastSurat
          store.lastAyah = lastAyah
          store.subscriptions = subscriptions
          store.contactEmail = contactEmail
          store.eligibleForSport = eligibleForSport
          store.parentRelationship = parentRelationship
          store.address = address
          store.sickness = sickness
          store.setStatus("done")
          return true
        } else {
          console.log("error ", result)
          store.setStatus("error")
          return false
        }
      } catch (err) {
        console.log("error ", err)
        store.setStatus("error")
        return false
      }
    },
  }))

export interface Child extends Instance<typeof ChildModel> {}
export interface ChildSnapshotOut extends SnapshotOut<typeof ChildModel> {}
export interface ChildSnapshotIn extends SnapshotIn<typeof ChildModel> {}
