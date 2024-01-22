import { IStateTreeNode, IType } from "mobx-state-tree"
import { ViewStyle } from "react-native"

export interface EventCardProps {
  titleText: string
  subtitle?: string
  nextOrPresence?: string
  gender?: string
  date?: string
  dateTimestamp?: number | Date | (Date & IStateTreeNode<IType<number | Date, number, Date>>)

  /**
   * Container style overrides.
   */
  style?: ViewStyle
}
