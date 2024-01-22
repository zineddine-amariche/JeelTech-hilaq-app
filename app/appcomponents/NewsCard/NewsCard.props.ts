import { IStateTreeNode, IType } from "mobx-state-tree"
import { ViewStyle } from "react-native"

export interface NewsCardProps {
  onImagePress?(): void
  newsTitle: string
  newsBody: string
  newsDate?: string
  newsDateTimestamp?: number | Date | (Date & IStateTreeNode<IType<number | Date, number, Date>>)
  picture?: string
  /**
   * Container style overrides.
   */
  style?: ViewStyle
}


export interface NewsItem {
  id: string;
  title: string;
  body: string;
  date: string;
  dateTimestamp?: number | Date | (Date & IStateTreeNode<IType<number | Date, number, Date>>);
  picture?: string;
}