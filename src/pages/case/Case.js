import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCaseByID } from "../../firebase/cases";
import "./case.css";
export default function Case() {
  let [_case, setCase] = useState({});
  let { caseID } = useParams();
  useEffect(() => {
    getCaseByID(caseID).then((data) => {
      console.log(data);
      setCase(data);
    });
  }, []);
  return (
    <div className="case" dir="rtl">
      <div className="container">
        <h2 className="case__title">تفاصيل الحالة</h2>
        <div className="case__details">
          <div className="mb-4 case__details-box">
            <h5>اسم الحالة</h5>
            <p>{_case.name}</p>
          </div>
          <div className="mb-4 case__details-box">
            <h5>وصف الحالة</h5>
            <p>{_case.description}</p>
          </div>
          <div className="mb-4 case__details-box">
            <h5>عنوان الحالة</h5>
            <p>{_case.address}</p>
          </div>
          <div className="mb-4 case__details-box">
            <h5>المبلغ المطلوب</h5>
            <p> {_case.debt} ج.م</p>
          </div>
          <div className="mb-4 case__details-box">
            <h5>المبلغ المٌجمع</h5>
            <p>{_case.collectedDebt}</p>
          </div>
        </div>
        <div className="case__donate">
          <h3 className="case__donate-title">اتبرع دلوقتي من خلال</h3>
          <div className="case__donate-methods">
            <div>
              <img src={require("./../../assest/visa.png")} />
              <p>مُتاح</p>
            </div>
            <div>
              <img src={require("./../../assest/cash.PNG")} />
              <p>غير مُتاح</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
