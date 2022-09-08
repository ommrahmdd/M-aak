import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserById } from "../../firebase/users";
import "./profile.css";
export default function Profile() {
  let history = useHistory();
  let userID = localStorage.getItem("Ma3ak_user_id");
  let initialState = {
    user: {},
  };
  let reducer = (state, action) => {
    switch (action.type) {
      case "ADD_USER":
        return { user: action.payload };
      default:
        return state;
    }
  };
  let [user, setUser] = useReducer(reducer, initialState);
  useEffect(() => {
    getUserById(userID).then((data) => {
      console.log(data);
      setUser({
        type: "ADD_USER",
        payload: data,
      });
    });
  }, []);
  return (
    <div className="userProfile" dir="rtl">
      <div className="userProfile__box">
        <h2 className="userProfile__box-title">الملف الشخصي</h2>
        <div className="userProfile__box-details">
          <div className="userBox mb-4">
            <label>الاسم</label>
            <p>{user.user.name}</p>
          </div>
          <div className="userBox mb-4">
            <label>البريد الالكتروني</label>
            <p>{user.user.email}</p>
          </div>
          <div className="userBox mb-4">
            <label>رقم الهاتف</label>
            <p>{user.user.phone}</p>
          </div>
          <div className="userBox mb-4">
            <label>العنوان</label>
            <p>{user.user.address}</p>
          </div>
          <div className="d-flex align-items-center w-50 justify-content-between">
            <div className="userBox mb-4">
              <label>كلمة المرور</label>
              <p>{"*".repeat(user.user?.password?.length)}</p>
            </div>
            <button
              className="primaryBtn customBtn"
              onClick={() => {
                history.push(`/profile/password/${userID}`);
              }}
            >
              تعديل كلمة المرور
            </button>
          </div>
        </div>
        <div className="mt-5 w-25 d-flex justify-content-between">
          <button
            className="customBtn primaryBtn"
            onClick={() => {
              history.push(`/profile/edit/${userID}`);
            }}
          >
            تعديل
          </button>
          <button
            className="customBtn sBtn"
            onClick={() => {
              history.push("/");
            }}
          >
            الرجوع
          </button>
        </div>
      </div>
    </div>
  );
}
