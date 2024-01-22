import { Instance, types } from "mobx-state-tree";

export const FutureAttendanceModel = types
  .model({
    status: types.optional(types.enumeration(["idle", "pending", "done", "error"]), "idle"),
    type: types.number,
    date: types.string,
    dateTimestamp: types.Date,
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot, // copy all that is there
    dateTimestamp: snapshot.date === undefined ? null : Date.parse(snapshot.date), // transform person from undefined to null if needed
  }))


export interface FutureAttendanceModel extends Instance<typeof FutureAttendanceModel> {}
