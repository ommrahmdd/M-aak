import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserById, updateUser } from "./../../firebase/users";
import "./editProfile.css";
export default function EditProfile() {
  let { userId } = useParams();
  let history = useHistory();
  let [user, setUser] = useState({
    name: "",
    address: "",
    phone: "",
  });
  useEffect(() => {
    getUserById(userId).then((data) => {
      console.log(data);
      setUser({
        name: data.name,
        address: data.address,
        phone: data.phone,
      });
    });
  }, []);
  let handleFormChange = (e) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    updateUser(userId, user).then((data) => {
      history.push("/");
    });
  };
  return (
    <div className="editProfile" dir="rtl">
      <div className="container">
        <h3 className="editProfile__title">تعديل الملف الشخصي</h3>
        <form
          className="editProfile__form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-5 editProfile__form-box">
            <label htmlFor="name">الاسم</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div className="mb-5 editProfile__form-box">
            <label htmlFor="address">العنوان</label>
            <input
              type="text"
              name="address"
              id="address"
              value={user.address}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div className="mb-5 editProfile__form-box">
            <label htmlFor="phone">رقم الهاتف</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              value={user.phone}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div>
            <button type="submit" className="customBtn primaryBtn ">
              تأكيد التعديل
            </button>
            <button
              type="button"
              className="customBtn sBtn"
              onClick={() => {
                history.push("/");
              }}
            >
              الرجوع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
