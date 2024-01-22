const en = {
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },

  demo: {
    title: "Demo",
    parentName: "Mohammed Binflan",
    firstChildName: "Abdullah Binflan",
    class: "Workshop Department 1",
    attendance_progress: "From the beginning of Surah Al-Naba' to the end of Surah Al-Takwir",
    teacher_note: "Needs revision of Surah Al-Takwir",
  },
  common: {
    ok: "OK",
    cancel: "Cancel",
    back: "Back",
    exit: "Exit",
    hello: "Hello",
    changeSchool: "Change School",
    terms: "School's Internal Regulations",
    admin_message: "Message from School Administration",
  },
  errors: {
    invalidPhone: "Invalid phone number",
  },
  loginScreen: {
    phoneNumber: "Phone number",
    password: "Password",
    login: "Login",
    passwordReset: "Forgot Password?",
    rights: "All rights reserved to Imam Warsh School 2023",
    errorLogin: "An error occurred while attempting to log in",
    errorLoginMessage: "Please check the correctness of the phone number or password.",
    passwordResetAlert: "Forgot password?",
    passwordResetAlertMessage: "Please contact administration to request a new password.",
    chooseSchool: "Choose School",
    emailSchema: {
      require: "email or phone number is required",
    },
    passwordSchema: {
      require: "password is required",
      min: "password is too short - must be at least 4 characters.",
      max: "password is too long - must be a maximum of 25 characters.",
    },
  },
  childrenScreen: {
    logout_alert_title: "Logout",
    logout_alert_message: "Are you sure you want to log out?",
    logout_alert_confirm: "Yes, take me to the login screen",
    logout_alert_cancel: "No, keep me logged in",
    title: "Children's List",
  },
  file: {
    photoEdit: "Change student photo",
    photoEditNote: "Please make sure the background is white",
    photoNotSending: "I don't want to send a photo",
    photoCancel: "Cancel",
    photoCamera: "Take a new photo",
    photoGallery: "Choose a photo from the device",
    firstName: "Student first name",
    lastName: "Student last name",
    sendInfo: "Send data",
    sickness: "Medical condition if any",
    address: "Address",
    parentRelationship: "Student's guardian relationship",
    phone: "Student phone number if available",
    birthdate: "Student birthdate",
    contactEmail: "Contact email",
    schoolLevel: "Educational level",
    schoolScores: "Yearly average score (../20)",
    lastSurat: "Surah to start with this season",
    lastAyah: "Verse number",
    picture: "Profile picture",
    subscriptions: "Contributions",
    eligibleForSport: "Student's eligibility for sports class",
    modify: "Edit",
    cancelEdit: "Cancel edit",
    fileUpdatesuccess: "Data sent successfully",
    fileUpdateFail: "Error in sending data",
    fileFormFeedback: "Make sure to fill in the form",
    primary_1: "1st grade primary school",
    primary_2: "2nd grade primary school",
    primary_3: "3rd grade primary school",
    primary_4: "4th grade primary school",
    primary_5: "5th grade primary school",
    middle_1: "1st grade middle school",
    middle_2: "2nd grade middle school",
    middle_3: "3rd grade middle school",
    middle_4: "4th grade middle school",
    secondary_1: "1st grade high school",
    secondary_2: "2nd grade high school",
    secondary_3: "3rd grade high school",
    university: "University",
    none: "Not enrolled",
    contributor: "I can contribute",
    not_contributor: "I cannot contribute",
    can_contribute_more: "I can contribute more",
    eligible: "Eligible for sports",
    notEligible: "Not eligible for sports",
    completeProfile: "Complete student profile",
    not_set: "",
  },
  tab: {
    file: "Profile",
    attendances: "Attendance",
    inbox: "Messages",
    stats: "Tracking",
    news: "News",
    events: "Events",
    transcripts: "Transcripts",
    awards: "Awards",
    punishments: "Punishments",
    administrationMessages: "Administration messages",
    attendancesMessages: "Attendance messages",
    inbox_soon: "Stay tuned for the administration and attendance messages list soon, God willing",
    awards_soon: "Stay tuned for the awards list soon, God willing",
    news_soon: "Stay tuned for the school news list soon, God willing",
    attendancesmessages_soon: "Stay tuned for the attendance messages list soon, God willing",
    punishments_soon: "Expect the list of punishments soon, God willing",
    news_empty_list: "There are no news currently,\n drag from top to bottom to refresh.",
    events_empty_list: "There are no events currently,\n drag from top to bottom to refresh.",
    transcripts_empty_list:
      "There are no transcripts currently,\n drag from top to bottom to refresh.",
    attendances_empty_list:
      "There are no attendances currently,\n drag from top to bottom to refresh.",
    messages_empty_list: "There are no messages currently,\n drag from top to bottom to refresh.",
    messages_input_placeholder: "Type your message here",
  },
  attendances: {
    last_attendance: "Last attendance was ",
    past_attendances: "Past attendances",
    today: "Today",
    yesterday: "Yesterday",
    two_days_ago: "Two days ago",
    absent_male: "Absent",
    absent_justified_male: "Absent (with justification)",
    present_male: "Present",
    late_male: "Present (late)",
    absent_female: "Absent (female)",
    absent_justified_female: "Absent (female with justification)",
    present_female: "Present (female)",
    late_female: "Present (female late)",
    "aquired a golden card": "Acquired a golden card",
    punished_0: "Did not memorize and punished with writing and memorization",
    punished: "Punished with repetition and writing of memorization",
    mistakes: "Number of mistakes",
    "alert late": "Late warning",
    pages: "Pages",
    attendance_mark: "Attendance mark",
    no_hifd: "Did not memorize",
    behaviour_mark: "Discipline grade",
    teacher_note: "Teacher's note",
    type_1: "Memorization session",
    type_2: "Revision session",
    from: "From",
    to: "To",
    surat: "Surah",
    alayah: "Verse",
    progress: "Progress made",
    progress_punished: "Progress made",
    behaviour_mark_19: "Very disciplined",
    behaviour_mark_16: "Disciplined",
    behaviour_mark_12: "Average discipline",
    behaviour_mark_8: "Little discipline",
    behaviour_mark_4: "Very active",
    behaviour_mark_body_19: "",
    behaviour_mark_body_16: "",
    behaviour_mark_body_12: "",
    behaviour_mark_body_8: "",
    behaviour_mark_body_4: "",
  },
  notifications: {
    new_attendance_title: "New Attendance Session",
    new_attendance_body: "Regarding",
    new_message_title: "Message from Quranic School",
    new_message_body: "Regarding",
    new_golden_card_title: "Golden Card",
    new_golden_card_body: "",
    new_news_title: "New News from Quranic School",
    new_news_body: "",
    new_events_title: "New Program",
    new_events_body: "Regarding",
  },
  events: {
    next_male_sport: "Qualified for the next sports session",
    next_male_trip: "Qualified for the next trip",
    next_female_sport: "Qualified for the next sports session",
    next_female_trip: "Qualified for the next trip",
    sport: "Sports session",
    trip: "Trip",
  },
  transcripts: {
    contributors_message_title: "Alert",
    contributors_message:
      "We kindly request parents who are able to contribute to the second trimester subscriptions to visit the administration office starting from Friday, March 5th, between Maghrib and Isha prayers.\nMay Allah bless you all.",
  },
  settingsScreen: {
    chooseLanguage: "Choose language",
    changeLanguage: "Change language",
    setupLanguage: "The app will be restarted to apply the language settings",
  },
  updatePasswordScreen: {
    updatePassword: "Change Password",
    oldPassword: "Enter your old password",
    newPassword: "Enter the new password",
    confirmNewPassword: "Confirm the new password",
    buttonConfirm: "update password",
    message_alert_title_success: "Message from the Administration",
    message_alert_ٍsous_title_success: "password updated succesfully",
    message_alert_ٍsous_title_failed: "failed to update password ",
    cancel_alert_message_failed: "cancel",
    cancel_alert_message_success: "cancel",
    validate_alert_message_failed: "ok",
    validate_alert_message_success: "ok",
    old_passwordErrors: {
      require: "Old password is required",
      min: "Old password is too short - must be at least 6 characters.",
      max: "Old password is too long - must be a maximum of 25 characters.",
    },
    new_passwordErrors: {
      require: "New password is required",
      min: "New password is too short - must be at least 6 characters.",
      max: "New password is too long - must be a maximum of 25 characters.",
    },
    confirm_newPasswordErrors: {
      require: "Confirm new password is required",
      min: "Confirm new password is too short - must be at least 6 characters.",
      max: "Confirm new password is too long - must be a maximum of 25 characters.",
      oneOf: "Passwords must match.",
    },
  },
  settings_side_menu: {
    settings: "Settings",
    updatePassword: "Change Password",
    logout: "Logout",
  },
}

export default en
export type Translations = typeof en
