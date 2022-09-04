import React from "react";
import Header from "../../components/header/Header";
import "./home.css";
export default function Home() {
  return (
    <div className="home" dir="rtl">
      <Header />
      <div className="container">
        {/* HANDLE: about section */}
        <section className="row about  my-4">
          <div className="col-md-6 about__box about__right">
            <img
              src={require("./../../assest/about__eye.png")}
              alt="about eye"
            />
            <h4>رؤية الجمعية</h4>
            <p>
              مؤسسة تنموية هدفها التكامل الاجتماعي من خلال العمل الخيري التطوعي
              المنظم لتنمية المستفيدين تنمية مستدامة من خلال خدماتنا
            </p>
          </div>
          <div className="col-md-6 about__box about__left">
            <img
              src={require("./../../assest/about__note.png")}
              alt="about eye"
            />
            <h4>رسالة الجمعية</h4>
            <p>
              تقديم خدمات للمجتمع المصري من خلال تنمية أفراده تنمية مستدامة
              بالتعاون مع المؤسسات المعنية ( حكومية ، أهليه ، قطاع خاص ) كأفضل
              استثمار يفيد الدولة والمجتمع
            </p>
          </div>
        </section>
        {/* HANDLE: Activities Section */}
        <section className="activity">
          <h4 className="activity__title">أنشطة الجمعية</h4>
          <div className=" activity__grid ">
            <div className="activity__grid-box">
              <div className=" box__left activiy__box">
                <img
                  src={require("./../../assest/activity_1.jpg")}
                  alt="activity image"
                />
              </div>
              <div className=" box__right activiy__box activiy__box-1">
                <h5>المجال الإجتماعى</h5>
                <p>
                  ليس هناك أصدق من طفل بريء، يروي أحلامه وأمانيه بكل عفوية
                  وتلقائية.. قد تكون أحلامهم بسيطة، ولذلك اقمنا المشاريع من
                  اجلهم صغيرة، لكنها بالنسبة إليهم، تعني الكثير… بعضهم، يحتاج
                  نظارة طبية تمكنه من القراءة والدراسة، وآخرون، يحلمون بكسوة
                  جديدة، يفرحون بها ويختالون وبعضهم
                </p>
              </div>
            </div>
            {/* ---------------------------------- */}
            <div className="activity__grid-box  ">
              <div className=" box__left activiy__box">
                <img
                  src={require("./../../assest/activity_2.jpg")}
                  alt="activity image"
                />
              </div>
              <div className=" box__right activiy__box activiy__box-2">
                <h5>المجال التعليمي </h5>
                <p>
                  ليس هناك أصدق من طفل بريء، يروي أحلامه وأمانيه بكل عفوية
                  وتلقائية.. قد تكون أحلامهم بسيطة، ولذلك اقمنا المشاريع من
                  اجلهم صغيرة، لكنها بالنسبة إليهم، تعني الكثير... بعضهم، يحتاج
                  نظارة طبية تمكنه من القراءة والدراسة، وآخرون، يحلمون بكسوة
                  جديدة، يفرحون بها ويختالون وبعضهم
                </p>
              </div>
            </div>
            {/* ---------------------------------------- */}
            <div className="activity__grid-box  ">
              <div className=" box__left activiy__box">
                <img
                  src={require("./../../assest/activity_4.jpg")}
                  alt="activity image"
                />
              </div>
              <div className=" box__right activiy__box activiy__box-4">
                <h5>المجال الديني</h5>
                <p>
                  ليس هناك أصدق من طفل بريء، يروي أحلامه وأمانيه بكل عفوية
                  وتلقائية.. قد تكون أحلامهم بسيطة، ولذلك اقمنا المشاريع من
                  اجلهم صغيرة، لكنها بالنسبة إليهم، تعني الكثير… بعضهم، يحتاج
                  نظارة طبية تمكنه من القراءة والدراسة، وآخرون، يحلمون بكسوة
                  جديدة، يفرحون بها ويختالون وبعضهم
                </p>
              </div>
            </div>
            <div className="activity__grid-box  ">
              <div className=" box__left activiy__box">
                <img
                  src={require("./../../assest/activity_3.jpg")}
                  alt="activity image"
                />
              </div>
              <div className=" box__right activiy__box activiy__box-3">
                <h5>المجال الصحي</h5>
                <p>
                  ليس هناك أصدق من طفل بريء، يروي أحلامه وأمانيه بكل عفوية
                  وتلقائية.. قد تكون أحلامهم بسيطة، ولذلك اقمنا المشاريع من
                  اجلهم صغيرة، لكنها بالنسبة إليهم، تعني الكثير… بعضهم، يحتاج
                  نظارة طبية تمكنه من القراءة والدراسة، وآخرون، يحلمون بكسوة
                  جديدة، يفرحون بها ويختالون وبعضهم
                </p>
              </div>
            </div>
            {/* --------------------------------------- */}
          </div>
        </section>
      </div>
    </div>
  );
}
