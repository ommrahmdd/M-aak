import React, { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserBills } from "./../../firebase/users";
import { getCaseByID } from "./../../firebase/cases";
import formatMoney from "../../components/formatMoney";
import "./donations.css";
let initialState = {};
let reducer = (state, aciton) => {
  switch (aciton.type) {
    case "SET_BILLS":
      return { ...aciton.payload };
    default:
      return state;
  }
};
export default function Donations() {
  let { userId } = useParams();
  let [bills, setBills] = useReducer(reducer, initialState);
  let [cases, setCases] = useState([]);
  useEffect(() => {
    getUserBills(userId).then((data) => {
      setBills({
        type: "SET_BILLS",
        payload: data,
      });

      console.log(data.bills);
      data.bills.forEach((_case) => {
        getCaseByID(_case.caseID).then((caseData) => {
          setCases((prevState) => {
            return [
              ...prevState,
              {
                ...caseData,
              },
            ];
          });
        });
      });
    });
  }, []);
  return (
    <div className="donations">
      <div className="container">
        <div className="donations__header">
          <h2 className="donations__header-title">التبرعات</h2>
          {/* {console.log(bills.bills[0])} */}
          <h3 className="donations__header-donations">
            مجموع التبرعات{" "}
            <span>
              {bills.bills &&
                formatMoney(
                  bills.bills.reduce((acc, current) => acc + current.amount, 0)
                )}
              <span className="fs-4"> ج.م</span>
            </span>
          </h3>
        </div>
        <div className="donations__grid">
          {cases &&
            bills.bills?.map((bill, index) => (
              <div className="donations__grid-box" key={index}>
                <div className="dGrid__imgBox">
                  <img
                    src={require("./../../assest/visa.png")}
                    alt="donation image"
                  />
                </div>
                <div className="dGrid__details d-flex flex-column align-items-start">
                  <div className="mb-2 d-flex align-items-center justify-content-around">
                    <label htmlFor="">اسم الحالة</label>
                    <p className="p-0 m-0">{cases[index]?.name}</p>
                  </div>
                  <div className="mb-2 d-flex align-items-center justify-content-around">
                    <label htmlFor="">المبلغ المطلوب</label>
                    <p className="p-0 m-0">
                      {cases[index]?.debt && formatMoney(cases[index]?.debt)}{" "}
                      <span className="fs-4">ج.م</span>
                    </p>
                  </div>
                  <div className="mb-2 d-flex align-items-center justify-content-around">
                    <label htmlFor="">مبلغ التبرع</label>
                    <p className="p-0 m-0">
                      {formatMoney(bill.amount)}
                      <span className="fs-4"> ج.م</span>
                    </p>
                  </div>
                  <div className="mb-2 d-flex align-items-center justify-content-around">
                    <label htmlFor="">تاريخ التبرع</label>
                    <p className="p-0 m-0">{bill.date}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
