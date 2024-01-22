import { ViewStyle } from "react-native"
import { IStateTreeNode, IType } from "mobx-state-tree"

export interface AttendanceCardProps {
  subjectName: string
  appointmentDate?: string
  appointmentDateTimestamp?:
    | number
    | Date
    | (Date & IStateTreeNode<IType<number | Date, number, Date>>)
  gender?: string
  present?: string
  /*
  progress: number
  progressNote: string
  attendanceMark: number
  behaviourMark: number
  messageToParent: string
  */
  hasAward?: boolean
  hasMessage?: boolean
  hasAlert?: boolean
  isNew?: boolean
  mistakes?: number
  category?: number // 0: previous attendances, 1: latest attendance, 2: future attendaces

  onPress?(): void

  /**
   * Container style overrides.
   */
  style?: ViewStyle
}
