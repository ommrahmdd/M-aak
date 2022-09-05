import React, { useEffect, useRef } from "react";
import "./projects.css";
import gsap, { Power3 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
export default function Projects() {
  let imgAfter = CSSRulePlugin.getRule(".project__imgBox::after");
  let projectsGridRef = useRef();

  useEffect(() => {
    gsap.to([...projectsGridRef.current.children], {
      opacity: 1,
      duration: 0.6,
      ease: Power3.easeInOut,
      stagger: 0.3,
    });
    gsap.to(imgAfter, {
      duration: 1.3,
      ease: Power3.easeInOut,
      width: "0%",
      delay: 0.4,
    });
  }, []);

  return (
    <div className="projects" dir="rtl">
      <div className="container">
        <div className="projects__grid" ref={projectsGridRef}>
          <div className="projects__grid-box">
            <div className="project__imgBox">
              <img
                src={require("./../../assest/activity_3.jpg")}
                alt="project image"
              />
            </div>
            <div>
              <h5>مشروع التعاونية</h5>
              <p>
                لا يختلف اثنان على أن إنشاء التعاونيات بالمغرب في المناطق
                الجبلية يشكل دخلا لابأس به يسد حاجيات أهل القرية، خصوصا إذا كانت
                مواكبة للتعاونية وترويج منتجاتها بشكل أفضل سيجعل المشروع ناجحا.
                وتماشيا مع أهداف الجمعية ومشاريعها نقوم بإنشاء تعاونية في كل
                قرية حطت فيها قوافلنا من أجل اعتماد أبناء القرية على أنفسهم
                والتقليل من الهجرة إلى المدن بسبب الفقر المجحف المحيط به.
              </p>
            </div>
          </div>
          <div className="projects__grid-box">
            <div className="project__imgBox">
              <img
                src={require("./../../assest/g-1.jpg")}
                alt="project image"
              />
            </div>
            <div>
              <h5>مشروع حفر الآبار</h5>
              <p>
                في الوقت الذي يظهر فيه الماء داخل بيتك جزءًا من تفاصيل حياة
                عادية.. تفتحه أّنّى تشاء وكيف ما ترغب، تتحوّل هذه الأداة إلى حلم
                المئات من القرويين المغاربة الذين يقطعون كيلومترات قاسية حتى
                يظفروا بما يضمن لهم شربة ماء ويتيح إطفاء ظمأ بهائمهم ويمكّنهم من
                غسل أوانيهم القليلة.. وإذا ما تبّقى شيء ما، يمكنهم الاستحمام وهم
                يحسبون كم إناء ماء استقبلته أجسادهم. جمعية أنا معاك خصصت جزءاً
                من مشاريعها لحفر الآبار في القرى التي لا تتوفر على مياه صالحة
                للشرب أو في القرى البعيدة عنها المياه وتزويدها بالطاقة الشمسية
                وجميع الموارد المخصصة في هكذا مشاريع.
              </p>
            </div>
          </div>
          <div className="projects__grid-box">
            <div className="project__imgBox">
              <img
                src={require("./../../assest/g-3.jpg")}
                alt="project image"
              />
            </div>
            <div>
              <h5>مشروع بناء المكتبات</h5>
              <p>
                الكتب هي ثروة العالم المخزونة، وأفضل إرث للأجيال والأمم. هكذا
                نرى أهمية الكتب خصوصا في المناطق النائية بالمغرب التي لا تعرف
                القراءة إلا قلة قليلة منهم بسبب العزوف عن الدراسة في سن مبكر
                بسبب بعد المدارس البعيدة عن القرية. لذلك قررت جمعية أنا معاك
                إنشاء مكاتب للمطالعة في كل قافلة قامت بها في القرى المغربية من
                أجل محاربة الأمية لسكان القرية.
              </p>
            </div>
          </div>
          <div className="projects__grid-box">
            <div className="project__imgBox">
              <img
                src={require("./../../assest/g-2.jpg")}
                alt="project image"
              />
            </div>
            <div>
              <h5>مشروع كسوة الأطفال</h5>
              <p>
                فيفي إطار حملتنا للمشاريع الرمضانية خصصنا مشروع (فرحة عيد) كسوة
                ملابس العيد. وهذا المشروع يهدف لإدخال السرور على قلوب الأطفال
                الأيتام والفقراء والمرضى عبر توفير ملابس العيد والألعاب بالمناطق
                الجبلية الوعرة، وجاء هذا المشروع تزامناً مع قرب أيام عيد الفطر
                المبارك ليساهم في مشاركة أقرانهم من الأطفال فرحة العيد، وليساهم
                في رسم الابتسامة على وجوههم في هذه المناسبة خصوصا أنهم ينتمون
                إلى المناطق النائية بالمملكة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
