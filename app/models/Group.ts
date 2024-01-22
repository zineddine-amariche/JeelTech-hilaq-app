import { types } from "mobx-state-tree"

export const GroupModel = types.model("ParentStore").props({
  name: types.optional(types.string, ""),
  level: types.optional(types.string, ""),
  program: types.optional(types.string, ""),
})

