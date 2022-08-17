import React, { useState } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { login } from "../../firebase/users";
import "./login_signup.css";
export default function Login() {
  let validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "*يجب إدخال البريد الالكتروني";
    }
    if (!values.password) {
      errors.password = "*يجب إدخال كلمة المرور";
    }
    return errors;
  };
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      login(values.email, values.password).then((data) => {
        console.log(data);
        if (data == "auth/user-not-found")
          setError("عفوا البريد الالكتروني غير صحيح");
        if ((data = "auth/wrong-password")) setError("كلمة المرور غير صحيحة");
      });
    },
  });
  let history = useHistory();
  let [error, setError] = useState("");
  let handleGoToSignup = () => {
    history.push("/signup");
  };
  return (
    <div className="login" dir="rtl">
      <div className="row ">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center  login__right">
          <h3>تسجيل الدخول</h3>
          <form
            className="login__form"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
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
            <button
              type="submmit"
              className="customBtn primaryBtn mt-4"
              disabled={!formik.isValid}
            >
              تسجيل الدخول
            </button>
            <small className="d-block mt-2 fs-5 text-danger">
              {error && error}
            </small>
          </form>
          <p className="login__createAcc">
            ليس لديك حساب ؟{" "}
            <a href="" onClick={handleGoToSignup}>
              قم بعمل حساب
            </a>
          </p>
        </div>
        <div className="col-md-6 login__left">
          <img src={require("./../../assest/login.png")} className="w-100" />
        </div>
      </div>
    </div>
  );
}
