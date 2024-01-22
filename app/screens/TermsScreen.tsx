import AppLayout from "app/appcomponents/appLayout"
import { Screen } from "app/components"
import { isRTL, translate } from "app/i18n"
import { AppStackScreenProps } from "app/navigators"
import { colors, spacing, typography } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import * as React from "react"
import { View, ViewStyle, useWindowDimensions } from "react-native"
import RenderHtml, { defaultSystemFonts } from "react-native-render-html"

interface TermsScreenProps extends AppStackScreenProps<"Welcome"> {}

export const TermsScreen: React.FunctionComponent<TermsScreenProps> = (_props) => {
  const { width } = useWindowDimensions()
  const { navigation } = _props

  const renderersProps = {
    ul: {
      enableExperimentalRtl: true,
    },
  }

  let Fonts = typography.primary.medium
  let Font = typography.fonts.tajawal.normal

  const $systemFonts = [...defaultSystemFonts, Fonts, Font]

  const $tagsStyles = {
    // We need to reverse default styles for RTL
    ul: { paddingLeft: 0, paddingRight: 20, marginTop: 5, marginBottom: 5 },
    ol: { paddingLeft: 0, paddingRight: 20 },
    div: { fontSize: 18, fontFamily: Font, textAlign: !isRTL ? "right" : "left", lineHeight: 28 },
    li: { marginBottom: 5 },
  }
  const $classesStyles = {
    title: { fontSize: 23, fontFamily: Fonts, textAlign: !isRTL ? "right" : "left" },
    bold: { fontFamily: Fonts, textAlign: !isRTL ? "right" : "left" },
  }
  const onNavigate = () => {
    navigation.goBack()
  }

  useHeader(
    {
      title: translate("common.terms"),
      titleMode: "flex",
      rightTx: "common.back",
      rightIcon: "back",
      onRightPress: onNavigate,
    },
    [onNavigate],
  )

  return (
    <AppLayout>
      <Screen
        preset="auto"
        contentContainerStyle={$screen}
        backgroundColor={colors.transparent}
        safeAreaEdges={["bottom"]}
      >
        <View style={$container}>
          <RenderHtml
            systemFonts={$systemFonts}
            contentWidth={width}
            source={source}
            renderersProps={renderersProps}
            tagsStyles={$tagsStyles}
            classesStyles={$classesStyles}
          />
        </View>
      </Screen>
    </AppLayout>
  )
}

const $screen: ViewStyle = {
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: spacing.lg,
}

const $container: ViewStyle = {
  alignContent: "center",
  justifyContent: "center",
  flex: 1,
  width: "100%",
}

const source = {
  html: `
  <div dir="rtl">
    <div  class="title">النظام الداخلي للمدرسة:</div>
    <ul>
      <li>
        يتحمل الولي مسؤولية الطالب خارج المدرسة وفي غير أوقات الحلقات.
      </li>
      <li>
        ضرورة إلتزام الطالب بالأخلاق الحسنة والمعاملة الجيدة لطاقم الإدارة والمعلمين، ومع زملاءه في
        المدرسة.
      </li>
      <li>
        اختيار اللباس المحتشم واللائق بحلقات القرآن الكريم، والمحافظة على المحفظة والأدوات التي تقدمها
        الإدارة للطالب عند تسجيله بالمدرسة.
      </li>
      <li>
        الاعتياد على لبس القميص للذكور والحجاب الشرعي للإناث عند قدومهم إلى الحلقات.
      </li>
      <li>
        مقدار الحفظ بالنسبة لبرنامج الصغار يجب أن لا يقل عن صفحة واحدة خلال الأسبوع، أما برنامج
        الناشئة فلا يقل عن صفحتين خلال الأسبوع، أما الكبار فهم غير ملزمين بمقدار معين نظرا لارتباطاتهم
        وانشغالاتهم.
      </li>
      <li>
        يجتاز الطلبة امتحانات في آخر كل ثلاثي في مقدار حفظهم وفي برنامج اليوم العلمي، ثم تقدم لهم كشوف
        نقاط.
      </li>
      <li>
        المداومة على الحضور وعدم الغياب أو التأخر أمر مهم جدا، ومن اضطر إلى الغياب لأمور ضرورية أو
        طارئة فعليه تبرير الغياب بحضور الولي أو اتصاله بالادارة.
      </li>
    </ul>
    <div class="title">برنامج التحفيزات:</div>
    <ul>
      <li>
        <span class="bold">
          تقديم حلويات ومشروبات
        </span>
        في آخر كل حصة للطلبة المتخلقين والمنضبطين خلال الحلقة (خاص ببرنامج الصغار).
      </li>
      <li>
        <span class="bold">
          البطاقات الذهبية:
        </span>
        تقدم بطاقة ذهبية للطالب(ة) الذي حفظ أكثر من المقدار المطالب به خلال الأسبوع وبجودة عالية:
        <ul>
          <li>
            الصغار (أقل من 10 أحزاب) 2 صفحات النقطة أكبر من 18.
          </li>
          <li>
            الصغار (أكثر من 10 أحزاب) 3 صفحات النقطة أكبر من 18.
          </li>
        </ul>
        <ul>
          <li>
            الناشئة (المستوى 1 و2) 3 صفحات النقطة أكبر من 18.
          </li>
          <li>
            الناشئة (المستوى 3 و4) 4 صفحات النقطة أكبر من 18.
          </li>
          <li>
            الناشئة (المستوى 5 و6) 5 صفحات النقطة أكبر من 18.
          </li>
        </ul>
      </li>
      <li>
        <span class="bold">
          شهادة الحافظ زائد مبلغ مالي:
        </span>
        تقدم للطلبة الذين حازوا على 4 بطاقات ذهبية متتالية.
      </li>
      <li>
        <span class="bold">
          نقدم مبلغا ماليا
        </span>
        للطلبة الذين حازوا على 6 بطاقات ذهبية غير متتالية.
      </li>
      <li>
        إذا جمع الطالب(ة) 4 شهادات متتالية يقدم له
        <span class="bold">
          درع الحافظ زائد مبلغ مالي زائد هدية
        </span>
        .
      </li>
      <li>
        إذا جمع الطالب(ة) 6 شهادات غير متتالية يقدم له مبلغ مالي زائد هدية.
      </li>
      <li>
        <span class="bold">
          شجرة المتميزين الشهرية:
        </span>
        عرض أسماء الطلبة والطالبات الأوائل من كل قسم شهريا على شجرة المتميزين.
      </li>
      <li>
        <span class="bold">الرحلات الترفيهية والتثقيفية:</span>
        نختار الطلبة الأوائل من كل برنامج ومستوى لاصطحابهم في رحلة آخر كل ثلاثي بعد تقديم كشوف النقاط
      </li>
      <li>
        <span class="bold">
          البرنامج الرياضي الأسبوعي:
        </span>
        يتم اختيار الطلبة الأوائل من كل قسم أسبوعيا لمشاركته في حصة رياضة ترفيهية في قاعات مجهزة ( كرة
        القدم للذكور من برنامج الناشئة/ السباحة لبرنامج الصغار وأقسام الناشئات).
      </li>
      <li>
        <span class="bold">
          الجوائز الموسمية:
        </span>
        هي عبارة عن جوائز قيمة تحدد للطلبة في بداية الموسم الدراسي، يتحصل عليها الطلبة المجتهدون الذين
        بلغوا الهدف المأمول لها في آخر الموسم.
      </li>
    </ul>
    <div class="title">نظام العقوبات:</div>
    <ul>
      <li>
        إذا لم يحفظ الطالب(ة) المقدار المقرر عليه خلال الأسبوع
        <span class="bold">
          يقوم بكتابته على كراس العقوبات
        </span>
        ثم يعيد عرضه في الأسبوع الموالي.
        <ul>
          <li>
            المقدار المقرر على الصغار "صفحة على الأقل في الأسبوع".
          </li>
          <li>
            المقدار المقرر على الناشئة "صفحتين على الأقل في الأسبوع".
          </li>
        </ul>
      </li>
      <li>
        إذا لم يقم الطالب(ة) بتنفيذ العقوبة، تخصم له نقطتين من نتيجة الحصة.
      </li>
      <li>
        إذا لم يحفظ الطالب(ة) المقدار المقرر عليه أسبوعين على التوالي
        <span class="bold">
          يفصل إن لم يعرضه كاملا في الأسبوع الثالث
        </span>
        .
      </li>
      <li>
        إذا كان حفظ الطالب(ة) من
        <span class="bold">
          برنامج الصغار أقل من صفحتين ونصف خلال الشهر يفصل من المدرسة
        </span>
        .
      </li>
      <li>
        إذا كان حفظ الطالب(ة) من
        <span class="bold">
          برنامج الناشئة أقل من خمس صفحات خلال الشهر يفصل من المدرسة
        </span>
        .
      </li>
      <li>
        إذا غاب الطالب(ة)
        <span class="bold">
          4 غيابات متتالية لبرنامج الصغار / و6 غيابات متتالية لبرنامج الناشئة يفصل من المدرسة
        </span>
        .
      </li>
      <li>
        إذا غاب الطالب(ة)
        <span class="bold">
          6 غيابات غير متتالية لبرنامج الصغار / و8 غيابات غير متتالية لبرنامج الناشئة يفصل من المدرسة
        </span>
        .
      </li>
      <li>
        إذا تكرر
        <span class="bold">
          تأخر الطالب(ة) عن الحصة 4 مرات متتالية
        </span>
        يوجه له إنذار بالفصل.
      </li>
      <li>
        إذا صدر من الطالب(ة)
        <span class="bold">
          سوء أدب ينبه في الأولى، إذا تكرر منه ذلك يفصل من المدرسة
        </span>
        .
      </li>
      <li>
        يتحمل الولي
        <span class="bold">
          تكلفة الأدوات والوسائل
        </span>
        التابعة للمدرسة التي
        <span class="bold">
          يتلفها الطالب(ة)
        </span>
        .
      </li>
    </ul>
  </div>
  `,
}
