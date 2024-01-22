
import { Instance, types } from "mobx-state-tree"

export const EventModel = types
.model("Event")
.props({
  id: types.identifier,
  type: types.optional(types.string, ""),
  date: types.string,
  dateTimestamp: types.Date,
  presence: types.maybeNull(types.string),
  eventStatus: types.maybeNull(types.string),
})
.preProcessSnapshot((snapshot) => ({
  ...snapshot, // copy all that is there
  dateTimestamp: snapshot.date === undefined ? null : Date.parse(snapshot.date), // transform person from undefined to null if needed
}))

export interface EventModel extends Instance<typeof EventModel> {}
