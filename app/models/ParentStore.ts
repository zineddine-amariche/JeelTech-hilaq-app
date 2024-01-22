import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Child, ChildModel } from "./Child"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "app/services/api"
import { Attendance, AttendanceModel } from "./Attendance"
import * as storage from "../utils/storage"

// TODO : chinge this to be like AdminMessage
const UserInfo = types.model("UserInfo", {
  id: types.identifier,
  firstName: types.string,
  lastName: types.string,
})

interface AdminMessage {
  type: string
  title: string
  body: string
}

export const ParentStoreModel = types
  .model("ParentStore")
  .props({
    locale: types.maybeNull(types.string),
    school: types.maybeNull(types.string),
    status: types.optional(types.enumeration(["idle", "pending", "done", "error"]), "idle"),
    authToken: types.maybe(types.string),
    authPhone: "",
    info: types.optional(UserInfo, { id: "", firstName: "", lastName: "" }),
    hasNewNotification: types.optional(types.boolean, false),
    adminMessage: types.maybeNull(types.frozen<AdminMessage>()),
    children: types.array(ChildModel), //types.optional(types.array(ChildStoreModel), []),
    currentChild: types.maybeNull(types.safeReference(ChildModel)),
    currentAttendance: types.maybeNull(types.safeReference(AttendanceModel)),
    updatePassword: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      if (store.authPhone.length === 0) return "can't be blank"
      //if (store.authPhone.length < 6) return "must be at least 6 characters"
      //if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authPhone)) return "must be a valid phone number"
      return ""
    },
  }))
  .actions((store) => ({
    setCurrentAttendance(currentAttendance: Attendance) {
      store.currentAttendance = currentAttendance
    },
  }))
  .actions((store) => ({
    setSchool(value: string | null) {
      store.school = value
      api.setSchool(value ?? "warsh")
    },
    setAuthPhone(value: string) {
      store.authPhone = value.replace(/ /g, "")
    },

    setCurrentChild(currentChild: Child) {
      store.currentChild = currentChild
      store.setCurrentAttendance(null)
    },
  }))
  .actions((store) => ({
    setStatus(value?: "idle" | "pending" | "done" | "error") {
      store.setProp("status", value)
    },
    setHasNoNewNotification() {
      store.setProp("hasNewNotification", false)
    },
    isPasswordUpdated(value) {
      store.setProp("updatePassword", value)
    },
  }))
  .actions((store) => ({
    async getUserInfo() {
      store.setStatus("pending")

      try {
        const result = await api.getParent()
        if (result.kind === "ok") {
          store.setProp("info", {
            id: result.parent.id,
            firstName: result.parent.firstName,
            lastName: result.parent.lastName,
          })
          store.setProp("adminMessage", result.adminMessage)
          store.setProp("children", result.parent.children)
          store.setStatus("done")
          return true
        } else {
          store.setStatus("error")
          return false
        }
      } catch (err) {
        store.setStatus("error")
        return false
      }
    },
    setHasNewNotification() {
      store.setProp("hasNewNotification", true)
      setTimeout(() => {
        store.setHasNoNewNotification()
      }, 500)
    },
  }))
  .views((store) => ({
    get isLoading() {
      return store.status === "pending"
    },
  }))
  .actions((store) => ({
    // eslint-disable-next-line generator-star-spacing
    async setupAuth() {
      if (store.authToken) {
        api.setAuthorizationHeader(store.authToken)
        if (await store.getUserInfo()) {
          return store.authToken
        } else {
          store.setProp("authToken", "")
          return null
        }
      } else {
        return null
      }
    },
  }))
  .actions((store) => ({
    // eslint-disable-next-line generator-star-spacing

    async setupdatePassword(data) {
      store.setStatus("pending")

      const result = await api.updatePassword(data)

      try {
        if (result.kind === "ok") {
          if (result.updatePassword.success) {
            store.setStatus("done")
            store.setProp("updatePassword", "true")
          } else {
            store.setStatus("error")
            store.setProp("updatePassword", "false")
          }
        }
      } catch {
        store.setStatus("error")
      }
      return null

      // if (store.authToken) {
      //   api.setSchool(store.school ?? "warsh")
      //   api.setAuthorizationHeader(store.authToken)
      //   if (await store.getUserInfo()) {
      //     return store.authToken
      //   } else {
      //     store.setProp("authToken", "")
      //     return null
      //   }
      // } else {
      //   return null
      // }
    },
  }))
  .actions((store) => ({
    // eslint-disable-next-line generator-star-spacing
    async login(email, password) {
      store.setStatus("pending")
      try {
        const result = await api.login(email, password)

        if (result.kind === "ok") {
          store.setProp("authToken", result.accessToken)
          if (await store.setupAuth()) {
            store.setStatus("done")
            return store.authToken
          } else {
            store.setStatus("error")
            return null
          }
        } else {
          store.setStatus("error")
          return null
        }
      } catch (err) {
        store.setStatus("error")
      }
      return null
    },
    // eslint-disable-next-line generator-star-spacing
    async logout() {
      store.setStatus("pending")

      try {
        const result = await api.logout()

        if (result.kind === "ok" || result.kind === "unauthorized") {
          store.setProp("authToken", undefined)
          store.setProp("authPhone", "")
          store.setProp("info", { id: "", firstName: "", lastName: "" })
          store.setProp("children", [])
          store.setProp("currentChild", null)
          store.setProp("currentAttendance", null)
          store.setStatus("done")
          return true
        } else {
          store.setStatus("error")
          return null
        }
      } catch (err) {
        store.setStatus("error")
      }
      return null
    },
    setLocale(newLocale: string | null) {
      store.locale = newLocale
      if (newLocale) {
        storage.saveString("locale", newLocale)
      } else {
        storage.remove("locale")
      }
    },
  }))

export interface ParentStore extends Instance<typeof ParentStoreModel> {}
export interface ParentStoreSnapshot extends SnapshotOut<typeof ParentStoreModel> {}
