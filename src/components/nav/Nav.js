import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logout } from "../../firebase/users";

import "./../utils.css";
import "./nav.css";
export default function Nav() {
  let history = useHistory();
  let [menuStatus, setMenuStatus] = useState(false);
  let handleToLoginBtn = () => {
    history.push("/login");
  };
  let handleOpenMenu = () => {
    setMenuStatus(true);
  };
  let handleCloseMenu = () => {
    setMenuStatus(false);
  };
  let handleLogout = () => {
    logout();
    setMenuStatus(false);
    window.location.reload();
  };
  let handleCLickMenuItem = () => {
    setMenuStatus(false);
  };
  return menuStatus ? (
    <section className="menu d-flex flex-column justify-content-center align-items-center">
      {/* <div className=" d-flex align-items-center customNav__left"> */}
      <i
        className="fa-solid fa-xmark menu__close"
        onClick={handleCloseMenu}
      ></i>
      <ul>
        <li onClick={handleCLickMenuItem}>
          <Link to="/" className="menu__link">
            الرئيسية
          </Link>
        </li>
        <li onClick={handleCLickMenuItem}>
          <Link to="/cases" className="menu__link">
            ساعد
          </Link>
        </li>
        <li onClick={handleCLickMenuItem}>
          <Link className="menu__link">اعرف اكتر</Link>
        </li>
        <li onClick={handleCLickMenuItem}>
          <Link className="menu__link">اتواصل معانا</Link>
        </li>
        <li onClick={handleLogout}>تسجيل الخروج</li>
      </ul>
      {/* </div> */}
    </section>
  ) : (
    <nav
      className="d-flex justify-content-between align-items-center customNav"
      dir="rtl"
    >
      <h2 className="logo">
        <img src={require("./../../assest/navLogo.png")} className=" pt-5" />
      </h2>
      <div className=" align-items-center customNav__left">
        <ul>
          <li>
            <Link to="/" className="customNav__link">
              الرئيسية
            </Link>
          </li>
          <li>
            <Link to="/cases" className="customNav__link">
              تبرع
            </Link>
          </li>
          <li>
            <Link className="customNav__link">اعرف اكثر</Link>
          </li>
          <li>
            <Link to="/contact" className="customNav__link">
              تواصل معنا
            </Link>
          </li>
        </ul>
        {localStorage.getItem("Ma3akToken") ? (
          <img
            src={require("./../../assest/profile-icon.png")}
            style={{
              width: "4rem",
              height: "4rem",
              cursor: "pointer",
              marginRight: "2rem",
              marginTop: "-.5rem",
            }}
          />
        ) : (
          <button
            className="customBtn primaryBtn me-5"
            onClick={handleToLoginBtn}
          >
            تسجيل الدخول
          </button>
        )}
      </div>
      <i
        className="fa-solid fa-bars fs-1 menu__icon"
        onClick={handleOpenMenu}
      ></i>
    </nav>
  );
}
