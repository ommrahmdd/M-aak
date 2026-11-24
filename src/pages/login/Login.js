import React from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../firebase/users";
import toast, { Toaster } from "react-hot-toast";
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
      toast.promise(
        login(values.email, values.password),
        {
          loading: "من فضلك انتظر ",
          success: (data) => {
            if (data === "auth/user-not-found")
              return "عفوا البريد الالكتروني غير صحيح";
            else if (data === "auth/wrong-password")
              return "كلمة المرور غير صحيحة";
            else {
              console.log("Logged");
              history.push("/");
              window.location.reload();
              return "تم تسجيل الدخول بنجاح";
            }
          },
        },
        {
          style: {
            minWidth: "25rem",
            fontSize: "2rem",
          },
          success: {
            duration: 3000,
            icon: "🥑",
          },
        }
      );
    },
  });
  let history = useHistory();
  return (
    <div className="login" dir="rtl">
      <div className="row ">
        <div className="col-md-6 order-md-0 order-1  d-flex flex-column justify-content-center align-items-center  login__right">
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
            <Toaster />
          </form>
          <p className="login__createAcc">
            ليس لديك حساب ؟ <Link to="/signup">قم بعمل حساب</Link>
          </p>
        </div>

        <div className="col-md-6 order-md-1 order-0  login__left">
          <img
            src={require("./../../assest/login.png")}
            alt="تسجيل الدخول"
            className="w-100 mb-md-0 mb-5"
          />
        </div>
      </div>
    </div>
  );
}
