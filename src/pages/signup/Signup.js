import React, { useState } from "react";
import { useFormik } from "formik";
import { signup, singup } from "./../../firebase/users";
import "./../login/login_signup.css";
export default function Signup() {
  let [error, setError] = useState("");
  let validate = (values) => {
    let errors = {};
    if (!values.name) errors.name = "*يجب إدخال اسم المستخدم";
    if (!values.email) errors.email = "*يجب إدخال البريد الالكتروني";
    if (!values.phone) errors.phone = "*يجب إدخال رقم الهاتف";
    if (!values.address) errors.address = "*يجب إدخال عنوان المستخدم";
    if (!values.password) errors.password = "*يجب إدخال كلمة المرور";
    if (values.password != values.confirmPassword)
      errors.confirmPassword = "*يجب ان تتطابق كلمة المرور";
    if (!values.confirmPassword)
      errors.confirmPassword = "*يجب إدخال تأكيد كلمة المرور";

    return errors;
  };
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      address: "",
      phone: "",
    },
    validate,
    onSubmit: (values) => {
      singup(values).then((data) => {
        if (data == "auth/email-already-in-use")
          setError("البريد الالكتروني مستخدم بالفعل");
      });
    },
  });
  return (
    <div className="login" dir="rtl">
      <div className="row ">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center  login__right">
          <h3>إنشاء حساب جديد</h3>
          <form
            className="login__form"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <div className="mb-5">
              <label>الاسم</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <small className="d-block fs-5 text-danger">
                {formik.errors.name ? formik.errors.name : " "}
              </small>
            </div>

            <div className="mb-5">
              <label>البريد الالكتروني</label>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <small className="d-block fs-5 text-danger">
                {formik.errors.email ? formik.errors.email : " "}
              </small>
            </div>
            <div className="mb-5">
              <label>كلمة المرور</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <small className="d-block fs-5 text-danger">
                {formik.errors.password ? formik.errors.password : " "}
              </small>
            </div>
            <div className="mb-5">
              <label>تأكيد كلمة المرور</label>
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confrimPassowrd}
                onChange={formik.handleChange}
              />
              <small className="d-block fs-5 text-danger">
                {formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : " "}
              </small>
            </div>
            <div className="mb-5">
              <label>العنوان</label>
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              <small className="d-block fs-5 text-danger">
                {formik.errors.address ? formik.errors.address : " "}
              </small>
            </div>
            <div className="mb-5">
              <label>رقم الهاتف</label>
              <input
                type="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              <small className="d-block fs-5 text-danger">
                {formik.errors.phone ? formik.errors.phone : " "}
              </small>
            </div>
            <button
              type="submmit"
              className="customBtn primaryBtn mt-4"
              disabled={!formik.isValid}
            >
              إنشاء الحساب
            </button>
            <small className="d-block mt-2 fs-5 text-danger">
              {error && error}
            </small>
          </form>
        </div>
        <div className="col-md-6 login__left d-flex align-items-center">
          <img src={require("./../../assest/signup.png")} className="w-100" />
        </div>
      </div>
    </div>
  );
}
