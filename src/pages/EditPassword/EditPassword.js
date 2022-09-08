import React, { useReducer } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateUserPassword } from "../../firebase/users";
import "./editPassword.css";
let initialState = {
  newPassword: "",
  confrimPassword: "",
};
let reducer = (state, action) => {
  switch (action.type) {
    case "SET_PASSWORD":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default function EditPassword() {
  let [passwords, setPasswords] = useReducer(reducer, initialState);
  let [error, setError] = useState("");
  let { userId } = useParams();
  let history = useHistory();
  let handleChange = (e) => {
    setPasswords({
      type: "SET_PASSWORD",
      payload: {
        [e.target.name]: e.target.value,
      },
    });
  };
  let handleSumbit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confrimPassword) {
      setError("يجب ان تتطابق كلمة المرور");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      updateUserPassword(userId, passwords.newPassword).then((data) => {
        history.push("/");
      });
    }
  };
  return (
    <div className="editPassword" dir="rtl">
      <div className="container">
        <h2 className="editPassword__title">تعديل كلمة المرور</h2>
        <form
          className="editPassword__form"
          onSubmit={(e) => {
            handleSumbit(e);
          }}
        >
          <div className="mb-5 editPassword__form-box">
            <label htmlFor="newPassword">كلمة المرور الجديدة</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={(e) => {
                handleChange(e);
                console.log(passwords);
              }}
            />
          </div>
          <div className="mb-5 editPassword__form-box">
            <label htmlFor="confrimPassword">تأكيد كلمة المرور</label>
            <input
              type="password"
              id="confrimPassword"
              name="confrimPassword"
              value={passwords.confrimPassword}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <button className="customBtn primaryBtn">تغيير كلمة المرور</button>
          {error ? (
            <small className="mt-3 fs-4 w-25 d-block alert alert-danger">
              {error}
            </small>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}
