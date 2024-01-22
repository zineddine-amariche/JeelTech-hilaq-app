/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type {
  AdminMessage,
  ApiConfig,
  Attendance,
  Child,
  GetAttendancesResult,
  GetEventsResult,
  GetMessagesResult,
  GetNewsResult,
  GetTranscriptsResult,
  GetTranscriptUrl,
  LoginResult,
  LogoutResult,
  Message,
  Parent,
  SetAttendanceSeenResult,
  SetMessagesSeenResult,
  SetNewsSeenResult,
  UpdatePassword,
  UpdateProfile,
} from "./api.types"
import { DEFAULTS, KEYS } from "app/utils/globals"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import { load } from "app/utils/storage"
import { MessageStore } from "app/models/MessageModel"
import { EventModel } from "app/models/EventModel"
import { TranscriptModel } from "app/models/TranscriptModel"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    try {
      this.apisauce = create({
        baseURL: this.config.url,
        timeout: this.config.timeout,
        headers: {
          Accept: "application/json",
        },
      })
    } catch (e) {
      console.tron.log(e.message)
    }
  }

  setAuthorizationHeader = (newToken?: string) => {
    if (newToken) {
      this.apisauce.setHeader("Authorization", `Bearer ${newToken}`)
    } else {
      this.apisauce.deleteHeader("Authorization")
    }
  }

  setSchool = (schoolName?: string) => {
    this.config = Config[schoolName]
    this.apisauce.setBaseURL(this.config.url)
  }

  /**
   * Login
   */
  async login(phone: string, password: string): Promise<LoginResult | GeneralApiProblem> {
    const fcmToken = await load(KEYS.fcmToken)
    // make the api call
    const params = {
      phone,
      password,
      fcmToken,
    }
    const response: ApiResponse<any> = await this.apisauce.post(`/parent/login`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", accessToken: response.data.access_token }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Logout
   */
  async logout(): Promise<LogoutResult | GeneralApiProblem> {
    const fcmToken = await load(KEYS.fcmToken)
    // make the api call
    const params = {
      fcmToken,
    }
    const response: ApiResponse<any> = await this.apisauce.post(`/parent/logout`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    return { kind: "ok" }
  }

  /**
   * Gets a parent.
   */
  async getParent(): Promise<
    { kind: "ok"; parent: Parent; adminMessage: AdminMessage } | GeneralApiProblem
  > {
    const params = {
      fromDate: DEFAULTS.attendancesFromDate,
    }
    // make the api call
    // TODO : Set type of ApiResponse<any> to ApiResponse<ApiParentResponse>
    const response: ApiResponse<any> = await this.apisauce.get(`/parent/getParent`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const converGroup = (raw) => {
      return {
        name: raw.name,
        level: raw.level,
        program: raw.program,
      }
    }

    const convertChild = (raw) => {
      return {
        id: "" + raw.id,
        firstName: raw.first_name,
        lastName: raw.last_name,
        gender: raw.gender,
        image: raw.profile_picture,
        groups: raw.groups.map(converGroup),
        hasNewAttendances: raw.has_new_attendances,
        hasNewMessages: raw.has_new_messages,
        hasNewNews: raw.has_new_news,
        hasNewTranscripts: raw.has_new_transcripts,
        birthdate: raw.birthdate,
        phone: raw.phone,
        schoolLevel: raw.school_level,
        schoolScores: raw.school_scores,
        lastSurat: raw.last_surat,
        lastAyah: raw.last_ayah,
        subscriptions: raw.subscriptions,
        contactEmail: raw.contact_email,
        eligibleForSport: raw.eligible_for_sport,
        parentRelationship: raw.parent_relationship,
        address: raw.address,
        sickness: raw.sickness,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data
      const resultParent: Parent = {
        id: "" + rawData.id,
        firstName: rawData.first_name,
        lastName: rawData.last_name,
        children: rawData.children.map(convertChild),
      }
      return { kind: "ok", parent: resultParent, adminMessage: rawData.message }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * getAttendances
   */

  async getAttendances(childId: string): Promise<GetAttendancesResult> {
    const params = {
      childId: childId,
      fromDate: DEFAULTS.attendancesFromDate,
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/parent/getAttendances`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertAttendance = (raw) => {
      return {
        id: "" + raw.id,
        appointmentDate: raw.appointment_date,
        subjectName: raw.subject_name,
        present: raw.present,
        progress: raw.progress,
        mistakes: raw.mistakes,
        fromSurat: raw.from_surat,
        fromSuratNumber: raw.from_surat_number,
        fromAyahNumber: raw.from_ayah_number,
        toSurat: raw.to_surat,
        toSuratNumber: raw.to_surat_number,
        toAyahNumber: raw.to_ayah_number,
        attendanceMark: raw.attendance_mark,
        behaviourMark: raw.behaviour_mark,
        messageToParent: raw.message_to_parent,
        hasAward: raw.has_award,
        punished: raw.punished,
        attendanceStatus: raw.attendance_status,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawAttendances = response.data.attendances
      const resultAttendances: Attendance[] = rawAttendances.map(convertAttendance)
      return { kind: "ok", attendances: resultAttendances }
    } catch {
      return { kind: "bad-data" }
    }
  }
  /**
   * setAttendances
   */

  async setAttendanceSeen(
    attendanceId: string,
  ): Promise<SetAttendanceSeenResult | GeneralApiProblem> {
    const params = {
      attendanceId: attendanceId,
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/parent/setAttendanceSeen`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  }

  /**
   * setMessagesSeen
   */

  async setMessagesSeen(studentId: string): Promise<SetMessagesSeenResult> {
    const params = {
      studentId: studentId,
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/parent/setMessagesSeen`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  }
  /**
   * setNewsSeen
   */

  async setNewsSeen(studentId: string): Promise<SetNewsSeenResult> {
    const params = {
      studentId: studentId,
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/parent/setNewsSeen`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  }

  /**
   * getMessages
   */

  async getMessages(childId: string): Promise<GetMessagesResult> {
    const params = {
      childId: childId,
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/parent/getMessages`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertMessage = (raw) => {
      return {
        id: "" + raw.id,
        messageDate: raw.message_date,
        messageBody: raw.message_body,
        flow: raw.flow,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawMessages = response.data.messages
      const resultMessages: MessageStore[] = rawMessages.map(convertMessage)
      return { kind: "ok", messages: resultMessages }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * send msg
   */

  async sendMsg(childId: string, messageBody: string): Promise<GetMessagesResult> {
    const params = {
      childId: childId,
      messageBody,
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/parent/sendMessage`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertMessage = (raw) => {
      return {
        id: "" + raw.id,
        messageDate: raw.message_date,
        messageBody: raw.message_body,
        flow: raw.flow,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawMessages = response.data.messages
      const resultMessages: MessageStore[] = rawMessages.map(convertMessage)
      return { kind: "ok", messages: resultMessages }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * getEvents
   */

  async getEvents(childId: string): Promise<GetEventsResult> {
    const params = {
      childId: childId,
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/parent/getEvents`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertEvent = (raw) => {
      return {
        id: "" + raw.id,
        type: raw.type,
        date: raw.date,
        presence: raw.presence,
        eventStatus: raw.event_status,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawEvents = response.data.events
      const resultEvents: EventModel[] = rawEvents.map(convertEvent)
      return { kind: "ok", events: resultEvents }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * getNews
   */

  async getNews(childId: string): Promise<GetNewsResult> {
    const params = {
      childId: childId,
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/parent/getNews`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertNews = (raw) => {
      return {
        id: "" + raw.id,
        title: raw.title,
        body: raw.body,
        date: raw.date,
        picture: raw.picture,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawNews = response.data.news
      const resultNews: Types.News[] = rawNews.map(convertNews)
      return { kind: "ok", news: resultNews }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * getTranscripts
   */

  async getTranscripts(childId: string): Promise<GetTranscriptsResult> {
    const params = {
      childId: childId,
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/parent/getTranscripts`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertTranscript = (raw) => {
      return {
        id: "" + raw.id,
        title: raw.title,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawTranscripts = response.data.seasons
      const resultTranscripts: TranscriptModel[] = rawTranscripts.map(convertTranscript)
      return { kind: "ok", transcripts: resultTranscripts }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * getTranscriptUrl
   */

  async getTranscriptUrl(childId: string, seasonId: string): Promise<GetTranscriptUrl> {
    const params = {
      childId: childId,
      seasonId: seasonId,
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get("/parent/getTranscriptUrl", params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", url: response.data.url }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * update child file
   */
  async updateProfile(data): Promise<UpdateProfile> {
    const response: ApiResponse<any> = await this.apisauce.post(`/parent/updateProfile`, data)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultChild = {
        id: "" + response.data.child.id,
        firstName: response.data.child.first_name,
        lastName: response.data.child.last_name,
        gender: response.data.child.gender,
        image: response.data.child.profile_picture,
        birthdate: response.data.child.birthdate,
        phone: response.data.child.phone,
        schoolLevel: response.data.child.school_level,
        schoolScores: response.data.child.school_scores,
        lastSurat: response.data.child.last_surat,
        lastAyah: response.data.child.last_ayah,
        subscriptions: response.data.child.subscriptions,
        contactEmail: response.data.child.contact_email,
        eligibleForSport: response.data.child.eligible_for_sport,
        parentRelationship: response.data.child.parent_relationship,
        address: response.data.child.address,
        sickness: response.data.child.sickness,
      }
      return { kind: "ok", child: resultChild }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * update account password
   */
  async updatePassword(data): Promise<UpdatePassword> {
    const response: ApiResponse<any> = await this.apisauce.post(`/parent/updatePassword`, data)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", updatePassword: response.data }
    } catch {
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
