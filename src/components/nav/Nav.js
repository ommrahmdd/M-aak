import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./../utils.css";
import "./nav.css";
export default function Nav() {
  let history = useHistory();
  let handleToLoginBtn = () => {
    history.push("/login");
  };
  return (
    <nav
      className="d-flex justify-content-between align-items-center customNav"
      dir="rtl"
    >
      <h2 className="logo">
        <img src={require("./../../assest/navLogo.png")} className=" pt-5" />
      </h2>
      <div className="d-flex align-items-center customNav__left">
        <ul>
          <li>
            <Link to="/" className="customNav__link">
              الرئيسية
            </Link>
          </li>
          <li>
            <Link className="customNav__link">ساعد</Link>
          </li>
          <li>
            <Link className="customNav__link">اعرف اكتر</Link>
          </li>
          <li>
            <Link className="customNav__link">اتواصل معانا</Link>
          </li>
        </ul>
        <button
          className="customBtn primaryBtn me-5"
          onClick={handleToLoginBtn}
        >
          تسجيل الدخول
        </button>
      </div>
    </nav>
  );
}
