import { api } from "app/services/api"
import { getParent, Instance, types } from "mobx-state-tree"
import { ChildModel } from "./Child"

export const TranscriptModel = types
  .model("Transcript")
  .props({
    id: types.identifier,
    title: types.string,
    url: types.maybeNull(types.string),
  })
  .actions((store) => ({
    // eslint-disable-next-line generator-star-spacing
    async loadTranscriptUrl() {
      const childModel = getParent(store, 2) as Instance<typeof ChildModel>
      childModel.setStatus("pending")
      try {
        const result = await api.getTranscriptUrl(childModel.id, store.id)

        if (result.kind === "ok") {
          store.url = result.url
          childModel.setStatus("done")
        } else {
          console.log("error ", result)
          childModel.setStatus("error")
        }
      } catch (err) {
        console.log("error ", err)
        childModel.setStatus("error")
      }
    },
  }))

export interface TranscriptModel extends Instance<typeof TranscriptModel> {}
