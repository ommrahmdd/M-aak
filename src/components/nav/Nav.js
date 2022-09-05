import React, { useState } from "react";
import { createRef } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logout } from "../../firebase/users";
import gsap, { Power0 } from "gsap";
import "./../utils.css";
import "./nav.css";
export default function Nav() {
  let history = useHistory();
  let [menuStatus, setMenuStatus] = useState(false);
  let [IsActiveProfile, setActiveProfile] = useState(false);
  let profileRef = useRef();
  let menuRef = useRef();
  let handleToLoginBtn = () => {
    history.push("/login");
  };
  let handleOpenMenu = () => {
    setMenuStatus(true);
  };
  let handleCloseMenu = () => {
    gsap.to(menuRef.current, {
      duration: 1,
      y: "-100%",
      opacity: 0,
      ease: Power0.easeInOut,
    });
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

  let handleProfileHover = () => {
    setActiveProfile(!IsActiveProfile);
  };
  window.addEventListener("click", (e) => {
    if (!e.target.classList.contains("profile")) setActiveProfile(false);
  });
  return menuStatus ? (
    <section
      className="menu d-flex flex-column justify-content-center align-items-center"
      ref={menuRef}
    >
      <i
        className="fa-solid fa-xmark menu__close"
        onClick={handleCloseMenu}
      ></i>
      <ul onClick={handleCLickMenuItem}>
        <li>
          <Link to="/" className="menu__link">
            الرئيسية
          </Link>
        </li>
        <li>
          <Link to="/cases" className="menu__link">
            ساعد
          </Link>
        </li>
        <li>
          <Link className="menu__link" to="/projects">
            مشاريعنا
          </Link>
        </li>
        <li>
          <Link className="menu__link" to="/contact">
            تواصل معنا
          </Link>
        </li>
        {localStorage.getItem("Ma3ak_user_id") && (
          <li onClick={handleLogout}>تسجيل الخروج</li>
        )}
      </ul>
      {/* </div> */}
    </section>
  ) : (
    <nav
      className="d-flex justify-content-between align-items-center customNav"
      dir="rtl"
    >
      <h2
        className="logo"
        onClick={() => {
          history.push("/");
        }}
      >
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
            <Link to="/projects" className="customNav__link">
              مشاريعنا
            </Link>
          </li>
          <li>
            <Link to="/contact" className="customNav__link">
              تواصل معنا
            </Link>
          </li>
        </ul>
        {localStorage.getItem("Ma3akToken") ? (
          <>
            <img
              src={require("./../../assest/profile-icon.png")}
              style={{
                width: "2.9rem",
                height: "2.9rem",
                cursor: "pointer",
                marginRight: ".5rem",
                marginTop: "-1rem",
              }}
              className="profile"
              onClick={() => {
                handleProfileHover();
              }}
            />
            <div
              className={`profile__box ${IsActiveProfile ? "active" : ""}`}
              ref={profileRef}
              onClick={() => {
                setActiveProfile(false);
              }}
            >
              <div className="profile__box-item">التبرعات</div>
              <div className="profile__box-item">الملف الشخصي</div>
              <div
                className="profile__box-item"
                onClick={() => {
                  handleLogout();
                }}
              >
                تسجيل الخروج
              </div>
            </div>
          </>
        ) : (
          <button
            className="customBtn primaryBtn me-5 mt-0"
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
