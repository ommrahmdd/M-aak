import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div dir="rtl" className="footer">
      <div className="container ">
        <div className="row footer__row">
          <div className="col-md-4 footer__col footer__logo">
            <img
              src={require("./../../assest/navLogo.png")}
              alt="Website logo"
            />
          </div>
          <div className="col-md-4 footer__col">
            <p>
              <Link to="/" className="footer__col-link">
                الرئيسية
              </Link>
            </p>
            <p>
              <Link to="/cases" className="footer__col-link">
                تبرع
              </Link>
            </p>
            <p>
              <Link to="/cases" className="footer__col-link">
                اعرف اكثر
              </Link>
            </p>
            <p>
              <Link to="/cases" className="footer__col-link">
                تواصل معنا
              </Link>
            </p>
          </div>
          <div className="col-md-4 footer__col">
            <p>
              <Link to="/" className="footer__col-link">
                عن مراكزنا
              </Link>
            </p>
            <p>
              <Link to="/cases" className="footer__col-link">
                الشروط والاحكام
              </Link>
            </p>
            <p>
              <Link to="/cases" className="footer__col-link">
                سياسة الخصوصية
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="footer__copyrights">
        <p>
          جميع الحقوق محفوظة <span>Omar | 2022 &copy;</span>
        </p>
      </div>
    </div>
  );
}
