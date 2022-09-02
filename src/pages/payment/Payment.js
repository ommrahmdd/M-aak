import React from "react";
import { useFormik } from "formik";
import { PaymentElement } from "@stripe/react-stripe-js";
import "./payment.css";
export default function Payment() {
  // HANDLE: formik
  let validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "يجب ادخال اسم المتبرع";
    }
    if (!values.address) {
      errors.address = "يحب ادخال عنوان المتبرع";
    }
    if (!values.phone) {
      errors.phone = "يجب ادخال رقم هاتف المتبرع";
    } else if (values.phone.length !== 11) {
      errors.phone = "يجب ان يتكون رقم الهاتف من 11 رقم";
    } else if (isNaN(values.phone)) {
      errors.phone = "يجب ان يتكون رقم الهاتف من 11 رقم";
    }
    if (!values.email) {
      errors.email = "يجب ادخال البريد الالكتروني للمتبرع";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "البريد الالكتروني غير صحيح";
    }
    console.log(formik.errors);
    return errors;
  };
  let formik = useFormik({
    initialValues: {
      name: "",
      amount: 0,
      address: "",
      phone: "",
    },
    validate,
  });
  return (
    <div className="payment" dir="rtl">
      <div className="container">
        <h3>من فضلك قم بإدخال البيانات التالية</h3>
        <form className="payment__form">
          <div className="mb-5 payment__form-box">
            <label>الاســم</label>
            <input
              type="text"
              value={formik.values.name}
              name="name"
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-5 payment__form-box">
            <label>العنوان</label>
            <input
              type="text"
              value={formik.values.address}
              name="address"
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-5 payment__form-box">
            <label>رقم الهاتف </label>
            <input
              type="phone"
              value={formik.values.phone}
              name="phone"
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-5 payment__form-box payment__form-email">
            <label>البريد الالكتروني</label>
            <input
              type="email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-5 payment__form-box payment__form-amount">
            <label>المبلغ بالجنية المصري</label>
            <input
              type="number"
              value={formik.values.amount}
              name="amount"
              onChange={formik.handleChange}
              min="1"
            />
          </div>
          <div className="mb-5">{/* <PaymentElement /> */}</div>
          <button type="submit" disabled={!formik.isValid}>
            تأكيد العملية
          </button>
          {!formik.isValid ? (
            <small className="d-block fs-4 alert alert-danger w-25 mt-4">
              {formik.errors[Object.keys(formik.errors)[0]]}
            </small>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}
