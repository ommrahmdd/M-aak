import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllCases } from "../../firebase/cases";
import "./cases.css";
export default function Cases() {
  let [cases, setCases] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getAllCases().then((data) => {
      console.log(data);
      setCases(data);
    });
  }, []);
  let handleRadio = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="cases" dir="rtl">
      <h3>الحالات</h3>
      <div className="row g-0">
        <div className="col-md-2 mb-md-0 mb-5 cases__navbar">
          <label>
            <input
              type="radio"
              name="navBarFilerting"
              value="most"
              onChange={(e) => {
                handleRadio(e);
              }}
            />
            <span>الاكثر احتياجاً</span>
          </label>
          <label>
            <input
              type="radio"
              name="navBarFilerting"
              value="less"
              onChange={(e) => {
                handleRadio(e);
              }}
            />
            <span>الاقل احتياجاً</span>
          </label>
        </div>
        <section className="col-md-8 cases__left">
          {cases ? (
            <div className="row gy-5 px-5">
              {cases.map((_case, index) => (
                <div
                  className="col-12 d-flex flex-column align-items-start case__box "
                  key={index}
                  onClick={() => {
                    history.push(`/cases/${_case.caseID}`);
                  }}
                >
                  <h4>{_case.name}</h4>
                  <h5>{_case.address}</h5>
                  <p>{_case.description}</p>
                  <div className="case__box-debt w-100 d-flex align-items-center justify-content-between">
                    <p>
                      المبلغ المطلوب <span>{_case.debt} ج.م</span>
                    </p>
                    <p>
                      المبلغ المٌجمع حتي الان{" "}
                      <span>{_case.collectedDebt} ج.م</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
              <div
                class="spinner-grow text-dark"
                style={{
                  width: "5rem",
                  height: "5rem",
                }}
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
