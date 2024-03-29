import { Translations } from "./en"

const ar: Translations = {
  welcomeScreen: {
    postscript:
      "ربما لا يكون هذا هو الشكل الذي يبدو عليه تطبيقك مالم يمنحك المصمم هذه الشاشات وشحنها في هذه الحالة",
    readyForLaunch: "تطبيقك تقريبا جاهز للتشغيل",
    exciting: "اوه هذا مثير",
  },
  errorScreen: {
    title: "هناك خطأ ما",
    friendlySubtitle:
      "هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
    reset: "اعادة تعيين التطبيق",
  },
  emptyStateComponent: {
    generic: {
      heading: "القائمة فارغة",
      content: "لا توجد بيانات.",
      button: "حاول مرّة أخرى",
    },
  },
  demo: {
    title: "تجريبية",
    parentName: "محمد بنفلان",
    firstChildName: "عبد الله بنفلان",
    class: "ورش قسم 1",
    attendance_progress: "من بداية سورة النبأ - إلى نهاية سورة التكوير",
    teacher_note: "يحتاج مراجعة سورة التكوير",
  },
  common: {
    ok: "حسناً",
    cancel: "إلغاء",
    back: "رجوع",
    exit: "خروج",
    hello: "مرحباً",
    changeSchool: "تغيير المدرسة",
    terms: "النظام الداخلي للمدرسة",
    admin_message: "رسالة من إدارة المدرسة",
  },
  errors: {
    invalidPhone: "رقم هاتف غير صحيح",
  },
  loginScreen: {
    phoneNumber: "رقم الهاتف",
    password: "كلمة السر",
    login: "دخول",
    passwordReset: "نسيت كلمة السر؟",
    rights: "جميع الحقوق محفوظة لمدرسة الإمام ورش 2023",
    errorLogin: "حصل خلل حين محاولة الدخول",
    errorLoginMessage: "رجاءاً تأكد من صحة رقم الهاتف أو كلمة السر.",
    passwordResetAlert: "نسيت كلمة السر؟",
    passwordResetAlertMessage: "رجاءاً اتصل بالادارة لطلب كلمة سر جديدة.",
    chooseSchool: "اختر المدرسة",
    emailSchema: {
      require: "البريد الإلكتروني أو رقم الهاتف مطلوب",
    },
    passwordSchema: {
      require: "كلمة المرور مطلوبة",
      min: "كلمة المرور قصيرة جدًا - يجب أن تتكون من 4 أحرف على الأقل.",
      max: "كلمة المرور طويلة جدًا - يجب أن تكون حد أقصى لها 25 حرفًا.",
    },
  },
  childrenScreen: {
    logout_alert_title: "تسجيل الخروج",
    logout_alert_message: "هل أنت متأكد من تسجيل الخروج؟",
    logout_alert_confirm: "نعم، خذني إلى واجهة تسجيل الدخول",
    logout_alert_cancel: "لا، أبقني متصلاً",
    title: "قائمة الأبناء",
  },
  file: {
    photoEdit: "تغير صورة الطالب",
    photoEditNote: "رجاءاً تأكد من وجود خلفية بيضاء",
    photoNotSending: "لا أريد ارسال صورة",
    photoCancel: "رجوع",
    photoCamera: "إلتقاط صورة جديدة",
    photoGallery: "إختيار صورة من الجهاز",
    firstName: "اسم الطالب",
    lastName: "لقب الطالب",
    sendInfo: "إرسال البيانات",
    sickness: "الحالة المرضية إن وجدت",
    address: "العنوان",
    parentRelationship: "قرابة الولي بالطالب",
    phone: "رقم هاتف الطالب إن وُجد",
    birthdate: "تاريخ ميلاد الطالب",
    contactEmail: "تواصل بالبريد الاكتروني",
    schoolLevel: "المستوى التعليمي",
    schoolScores: "المعدل السنوي (../20)",
    lastSurat: "السورة التي يبدأ بها في هذا الموسم",
    lastAyah: "رقم الآية",
    picture: "صورة شخصية",
    subscriptions: "المساهمات",
    eligibleForSport: "الحصة الرياضية للطالب",
    modify: "تعديل",
    cancelEdit: "إلغاء التعديل",
    fileUpdatesuccess: "نجاح إرسال البيانات",
    fileUpdateFail: "حصل خلل  في إرسال البيانات",
    fileFormFeedback: "تأكد من اكمال النمودج",
    primary_1: "الأولى ابتدائي",
    primary_2: "الثانية ابتدائي",
    primary_3: "الثالثة ابتدائي",
    primary_4: "الرابعة ابتدائي",
    primary_5: "الخامسة ابتدائي",
    middle_1: "الأولى متوسط",
    middle_2: "الثانية متوسط",
    middle_3: "الثالثة متوسط",
    middle_4: "الرابعة متوسط",
    secondary_1: "الأولى ثانوي",
    secondary_2: "الثانية ثانوي",
    secondary_3: "الثالثة ثانوي",
    university: "جامعي",
    none: "غير متمدرس",
    contributor: "أقدر على المساهمة",
    not_contributor: "لا أقدر على المساهمة",
    can_contribute_more: "أستطيع المساهمة أكثر",
    eligible: "يقدر على ممارسة الرياضة",
    notEligible: "لا يقدر على ممارسة الرياضة",
    completeProfile: "إستكمال ملف الطالب",
    not_set: "",
  },
  tab: {
    file: "ملف",
    attendances: "حصص",
    inbox: "رسائل",
    stats: "تتبع",
    news: "اخبار",
    events: "برامج",
    transcripts: "كشوف النقاط",
    awards: "امتيازات",
    punishments: "عقوبات",
    administrationMessages: "رسائل الإدارة",
    attendancesMessages: "رسائل الحصص",
    inbox_soon: "ترقبوا قائمة رسائل الإدارة والحصص قريباً إن شاء الله",
    awards_soon: "ترقبوا قائمة الإمتيازات قريباً إن شاء الله",
    news_soon: "ترقبوا قائمة أخبار المدرسة قريباً إن شاء الله",
    attendancesmessages_soon: "ترقبوا قائمة رسائل الحصص قريباً إن شاء الله",
    punishments_soon: "ترقبوا قائمة العقوبات قريباً إن شاء الله",
    news_empty_list: "لا توجد أخبار حالياً،\n اسحب من الأعلى إلى الأسفل للبحث من جديد.",
    events_empty_list: "لا توجد مواعيد حالياً،\n اسحب من الأعلى إلى الأسفل للبحث من جديد.",
    transcripts_empty_list: "لا توجد كشوف نقاط حالياً،\n اسحب من الأعلى إلى الأسفل للبحث من جديد.",
    attendances_empty_list: "لا توجد حصص حالياً،\n اسحب من الأعلى إلى الأسفل للبحث من جديد.",
    messages_empty_list: "لا توجد رسائل حالياً،\n اسحب من الأعلى إلى الأسفل للبحث من جديد.",
    messages_input_placeholder: "كتابة رسالة جديدة إلى إدارة مدرسة ",
  },
  attendances: {
    last_attendance: "آخر حصة ",
    past_attendances: "حصص سابقة",
    today: "اليوم",
    yesterday: "أمس",
    two_days_ago: "قبل يومين",
    absent_male: "غائب",
    absent_justified_male: "غائب (مع تبرير)",
    present_male: "حاضر",
    late_male: "حاضر (مع تأخر)",
    absent_female: "غائبة",
    absent_justified_female: "غائبة (مع تبرير)",
    present_female: "حاضرة",
    late_female: "حاضرة (مع تأخر)",
    "aquired a golden card": "تحصل على بطاقة ذهبية",
    punished_0: "لم يحفظ ومعاقب بالكتابة والحفظ",
    punished: "معاقب بإعادة وكتابة الحفظ",
    mistakes: "عدد الأخطاء",
    "alert late": "إنذار تأخر",
    pages: "صفحات",
    attendance_mark: "علامة الحصة",
    no_hifd: "لم يحفظ",
    behaviour_mark: "درجة الإنضباط",
    teacher_note: "ملاحظة الأستاذ",
    type_1: "حصة حفظ",
    type_2: "حصة مراجعة",
    from: "من",
    to: "إلى",
    surat: "سورة",
    alayah: "الآية",
    progress: "مقدار التقدم",
    progress_punished: "المقدار",
    behaviour_mark_19: "جد منضبط",
    behaviour_mark_16: "منضبط",
    behaviour_mark_12: "متوسط الإنضباط",
    behaviour_mark_8: "قليل الإنضباط",
    behaviour_mark_4: "كثير الحركة",
    behaviour_mark_body_19: "",
    behaviour_mark_body_16: "",
    behaviour_mark_body_12: "",
    behaviour_mark_body_8: "",
    behaviour_mark_body_4: "",
  },
  notifications: {
    new_attendance_title: "حصة جديدة",
    new_attendance_body: "بخصوص ",
    new_message_title: "رسالة من المدرسة القرآنية",
    new_message_body: "بخصوص ",
    new_golden_card_title: "بطاقة ذهبية",
    new_golden_card_body: "",
    new_news_title: "خبر جديد من المدرسة القرآنية",
    new_news_body: "",
    new_events_title: "برنامج جديد",
    new_events_body: "بخصوص ",
  },
  events: {
    next_male_sport: "مؤهل للحصة الرياضية القادمة",
    next_male_trip: "مؤهل للرحلة القادمة",
    next_female_sport: "مؤهلة للحصة الرياضية القادمة",
    next_female_trip: "مؤهلة للرحلة القادمة",
    sport: "حصة رياضية",
    trip: "رحلة",
  },
  transcripts: {
    contributors_message_title: "تنبيه",
    contributors_message:
      "نرجوا من الأولياء القادرين على المساهمة في إشتراكات الثلاثي الثاني القدوم إلى مكتب الإدارة إبتداءا من يوم الجمعة 5 مارس فصاعدا، بين صلاتي المغرب والعشاء.\nوبارك الله في الجميع..",
  },
  settingsScreen: {
    chooseLanguage: "اختر اللغة",
    changeLanguage: "تغيير اللغة",
    setupLanguage: "سيتم إعادة تشغيل التطبيق لتفعيل إعدادت اللغة",
  },
  updatePasswordScreen: {
    updatePassword: " تغيير كلمة السر",
    oldPassword: "أدخل كلمة السر السابقة",
    newPassword: "أدخل كلمة السر الجديدة",
    confirmNewPassword: "تأكيد كلمة السر الجديدة",
    buttonConfirm: "تحديث كلمة السر",
    message_alert_title_success: "رسالة من الادارة",
    message_alert_ٍsous_title_success: "تم تغيير كلمة السر بنجاح",
    message_alert_ٍsous_title_failed: "فشل تحديث كلمة السر",
    cancel_alert_message_failed: "خروج",
    cancel_alert_message_success: "خروج",
    validate_alert_message_failed: "حسنا",
    validate_alert_message_success: "حسنا",
    old_passwordErrors: {
      require: "كلمة المرور القديمة مطلوبة",
      min: "كلمة المرور القديمة قصيرة جدًا - يجب أن تتكون من 6 أحرف على الأقل.",
      max: "كلمة المرور القديمة طويلة جدًا - يجب أن تكون حد أقصى لها 25 حرفًا.",
    },
    new_passwordErrors: {
      require: "كلمة المرور الجديدة مطلوبة",
      min: "كلمة المرور الجديدة قصيرة جدًا - يجب أن تتكون من 6 أحرف على الأقل.",
      max: "كلمة المرور الجديدة طويلة جدًا - يجب أن تكون حد أقصى لها 25 حرفًا.",
    },
    confirm_newPasswordErrors: {
      require: "تأكيد كلمة المرور الجديدة مطلوب",
      min: "تأكيد كلمة المرور الجديدة قصيرة جدًا - يجب أن تتكون من 6 أحرف على الأقل.",
      max: "تأكيد كلمة المرور الجديدة طويلة جدًا - يجب أن تكون حد أقصى لها 25 حرفًا.",
      oneOf: "يجب أن تتطابق كلمات المرور",
    },
  },
  settings_side_menu: {
    settings: "الإعدادات",
    updatePassword: "تغيير كلمة السر",
    logout: "تسجيل الخروج",
  },
}

export default ar
