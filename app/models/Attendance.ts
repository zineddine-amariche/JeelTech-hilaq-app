import { api } from "app/services/api"
import { types, getParent, hasParent, Instance } from "mobx-state-tree"
import { Child } from "./Child"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AttendanceModel = types
  .model("AttendanceStore")

  .props({
    // ... other properties
    status: types.optional(types.enumeration(["idle", "pending", "done", "error"]), "idle"),
    id: types.identifier,
    appointmentDate: types.string,
    appointmentDateTimestamp: types.Date,
    subjectName: types.string,
    present: types.maybeNull(types.string),
    progress: types.maybeNull(types.number),
    mistakes: types.maybeNull(types.number),
    fromSurat: types.maybeNull(types.string),
    fromSuratNumber: types.maybeNull(types.number),
    fromAyahNumber: types.maybeNull(types.number),
    toSurat: types.maybeNull(types.string),
    toSuratNumber: types.maybeNull(types.number),
    toAyahNumber: types.maybeNull(types.number),
    attendanceMark: types.maybeNull(types.number),
    behaviourMark: types.maybeNull(types.number),
    messageToParent: types.maybeNull(types.string),
    hasAward: types.maybeNull(types.number),
    punished: types.maybeNull(types.number),
    attendanceStatus: types.maybeNull(types.string),
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot, // copy all that is there
    present: snapshot.present === null ? "absent" : snapshot.present,
    appointmentDateTimestamp:
      snapshot.appointmentDate === undefined ? null : Date.parse(snapshot.appointmentDate), // transform person from undefined to null if needed
  }))
  .actions(withSetPropAction)
  // .views((store) => ({
  //   get environment() {
  //     return getEnv(store) as Environment
  //   },
  // }))
  .actions((store) => ({
    setStatus(value?: "idle" | "pending" | "done" | "error") {
      store.setProp("status", value)
    },
    updateAttendanceStatus() {
      store.attendanceStatus = "seen"
      if (hasParent(store, 2)) {
        ;(getParent(store, 2) as Child).updateHasNewAttendances()
      }
    },
  }))

  .actions((store) => ({
    async setAttendanceSeen(callback) {
      store.setStatus("pending")

      try {
        const result = await api.setAttendanceSeen(store.id)

        if (result.kind === "ok") {
          store.updateAttendanceStatus()
          store.setStatus("done")
          callback()
        } else {
          console.log("error ", result)
          store.setStatus("error")
        }
      } catch (err) {
        console.log("error ", err)
        store.setStatus("error")
      }
      return null
    },
  }))

export interface Attendance extends Instance<typeof AttendanceModel> {}
export type AttendanceStore = typeof AttendanceModel
