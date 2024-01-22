
import { Instance, types } from "mobx-state-tree"

export const NewsModel = types
  .model("News")
  .props({
    id: types.identifier,
    title: types.string,
    body: types.string,
    date: types.string,
    dateTimestamp: types.maybeNull(types.Date),
    picture: types.maybeNull(types.string),
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    dateTimestamp: snapshot.date === undefined ? null : new Date(snapshot.date),
  }));

export interface NewsModel extends Instance<typeof NewsModel> {}
