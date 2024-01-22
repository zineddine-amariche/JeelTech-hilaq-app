import { ViewStyle } from "react-native"
import { IStateTreeNode, IType } from "mobx-state-tree"

export interface MessageCardProps {
  messageBody: string
  messageDate?: string
  messageDateTimestamp?: number | Date | (Date & IStateTreeNode<IType<number | Date, number, Date>>)
  fromAdmin?: boolean
  parent?: boolean,
  /**
   * Container style overrides.
   */
  style?: ViewStyle
}
