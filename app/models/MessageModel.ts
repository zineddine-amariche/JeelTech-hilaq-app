import { types, getEnv } from "mobx-state-tree"
// import { Environment } from "../environment"

export const MessageStoreModel = types
  .model("MessageStore")
  .props({
    status: types.optional(types.enumeration(["idle", "pending", "done", "error"]), "idle"),
    id: types.identifier,
    messageDate: types.string,
    messageDateTimestamp: types.Date,
    messageBody: types.string,
    flow: types.string
  })
  .preProcessSnapshot(snapshot => ({
    ...snapshot, // copy all that is there
    messageDateTimestamp:
      snapshot.messageDate === undefined ? null : Date.parse(snapshot.messageDate), // transform person from undefined to null if needed
  }))
//   .views(self => ({
//     get environment() {
//       return getEnv(self) as Environment
//     },
//   })) // eslint-disable-line @typescript-eslint/no-unused-vars

type MessageStoreType = typeof MessageStoreModel.Type
export interface MessageStore extends MessageStoreType { }
