/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { ChildSnapshotIn } from "app/models/Child"
import { EventModel } from "app/models/EventModel"
import { MessageStore } from "app/models/MessageModel"
import { NewsModel } from "app/models/NewsModel"
import { TranscriptModel } from "app/models/TranscriptModel"
import { GeneralApiProblem } from "./apiProblem"

export type LoginResult = {
  kind: "ok"
  accessToken: string
}
export type LogoutResult = {
  kind: "ok"
}
export interface AdminMessage {
  type: string
  title: string
  body: string
}
export interface Parent {
  id: string
  firstName: string
  lastName: string
  children: ChildSnapshotIn[]
}
export interface Child {
  id: string
  firstName: string
  lastName: string
  gender: string
  groups?: Group[]
  image: string
  hasNewAttendances?: number
  hasNewMessages?: number
  hasNewNews?: number
  hasNewTranscripts?: number
  birthdate: string
  phone: string
  schoolLevel: string
  schoolScores: string
  lastSurat: number
  lastAyah: number
  subscriptions: string
  contactEmail: string
  eligibleForSport: number
  parentRelationship: string
  address: string
  sickness: string
}
export interface Group {
  name: string
  level: string
  program: string
}

export interface ApiParentResponse {
  status: string
  parent: Parent
  children: Child[]
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export type SetAttendanceSeenResult = { kind: "ok" } 

export interface Attendance {
  id: string
  appointmentDate: string
  subjectName: string
  present: string
  progress: number
  mistakes: number
  fromSurat: string
  fromSuratNumber: number
  fromAyahNumber: number
  toSurat: string
  toSuratNumber: number
  toAyahNumber: number
  attendanceMark: number
  behaviourMark: number
  messageToParent: string
  hasAward: number
  punished: number
  attendanceStatus: string
}


export interface Message {
  id: string
  messageDate: string
  messageBody: string
  flow: string
}

export interface Password {
  updatePassword: string
  success: string

}


export type GetAttendancesResult = { kind: "ok"; attendances: Attendance[] } | GeneralApiProblem
export type SetMessagesSeenResult = { kind: "ok" } | GeneralApiProblem
export type SetNewsSeenResult = { kind: "ok" } | GeneralApiProblem
export type GetMessagesResult = { kind: "ok"; messages: MessageStore[] } | GeneralApiProblem
export type GetEventsResult = { kind: "ok"; events: EventModel[] } | GeneralApiProblem
export type GetNewsResult = { kind: "ok"; news: NewsModel[] } | GeneralApiProblem
export type GetTranscriptsResult = { kind: "ok"; transcripts: TranscriptModel[] } | GeneralApiProblem
export type GetTranscriptUrl = { kind: "ok"; url: string } | GeneralApiProblem
export type UpdateProfile = { kind: "ok"; child: Child } | GeneralApiProblem
export type UpdatePassword = { kind: "ok"; updatePassword: Password } | GeneralApiProblem
