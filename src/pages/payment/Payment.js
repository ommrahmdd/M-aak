import React from "react";
import { useFormik } from "formik";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./payment.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { getCaseByID, updateCase } from "../../firebase/cases";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { addNewBill } from "../../firebase/users";
export default function Payment() {
  let stripe = useStripe();
  let elements = useElements();
  let [processing, setProcessing] = useState("");
  let [error, setError] = useState("");
  let { caseID } = useParams();
  let [_case, setCase] = useState({});
  // HANDLE: useEffect
  useEffect(() => {
    getCaseByID(caseID).then((data) => {
      setCase(data);
      console.log(data);
    });
  }, []);
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

    if (values.amount > _case.debt - _case.collectedDebt) {
      errors.amount = `اقصي مبلغ يمكن التبرع به هو ${
        _case.debt - _case.collectedDebt
      } ج.م`;
    }
    return errors;
  };
  let formik = useFormik({
    initialValues: {
      name: "",
      amount: 1,
      address: "",
      phone: "",
      email: "",
    },
    validate,
    onSubmit: async (values) => {
      setProcessing("من فضلك انتظر");
      let cardEl = elements.getElement("card");
      // Billing info
      let billing = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: {
          line1: values.address,
        },
      };

      try {
        //HANDLE:  PAYMENT intend
        let paymentIntent = await axios.post(
          "https://m-aak-server.vercel.app/payment",
          {
            amount: (values.amount / 20) * 100,
          }
        );
        //HANDLE:  PAYMENT method
        let paymentMethod = await stripe.createPaymentMethod({
          type: "card",
          card: cardEl,
          billing_details: billing,
        });
        //HANDLE:  PAYMENT confirm
        let paymentConfirm = await stripe.confirmCardPayment(
          paymentIntent.data,
          {
            payment_method: paymentMethod.paymentMethod.id,
          }
        );

        await updateCase(caseID, values.amount);
        await addNewBill(localStorage.getItem("Ma3ak_user_id"), {
          caseID,
          amount: values.amount,
          date: new Date().toLocaleString(),
        });
        setProcessing("تمت عملية الدفع بنجاح");
        setTimeout(() => {
          setProcessing("");
          cardEl.clear();
          setError("");
          formik.resetForm();
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    },
  });

  let handleCardChange = (e) => {
    if (!e.complete) {
      setError("من فضلك ادخل رقم الكارت بشكل صحيح");
    } else {
      setError("");
    }
  };
  return (
    <div className="payment" dir="rtl">
      <div className="container">
        <h3>من فضلك قم بإدخال البيانات التالية</h3>
        <form
          className="payment__form"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
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
          <div className="mb-5 w-50">
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "20px",
                  },
                },
              }}
              onChange={(e) => handleCardChange(e)}
            />
          </div>
          <button type="submit" disabled={!formik.isValid || error}>
            تأكيد العملية
          </button>
          {processing ? (
            <small className="d-block fs-4 alert alert-primary w-25 mt-4">
              {processing}
            </small>
          ) : (
            ""
          )}
          {error ? (
            <small className="d-block fs-4 alert alert-danger w-25 mt-4">
              {error}
            </small>
          ) : (
            ""
          )}
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
