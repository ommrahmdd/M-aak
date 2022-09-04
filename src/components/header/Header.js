import React from "react";
import "./header.css";
import gsap, { Power2 } from "gsap";
import { createRef } from "react";
import { useEffect } from "react";
export default function Header() {
  let imgRef = createRef(null);
  let txtRef = createRef(null);
  useEffect(() => {
    gsap.to(imgRef.current, {
      duration: 6,
      scale: 1.1,
      filter: "blur(.2rem)",
      ease: Power2.easeInOut,
      repeat: -1,
      yoyo: true,
    });
    gsap.from([...txtRef.current.children], {
      duration: 0.7,
      opacity: 0,
      y: 30,
      ease: Power2.easeOut,
      delay: 0.5,
      stagger: 0.3,
    });
  }, []);
  return (
    <div className="header">
      <div className="header__container" ref={imgRef}></div>
      <div className="header__txt" ref={txtRef}>
        <h2>معاك</h2>
        <h3>دعمك إنقاذ حياة</h3>
      </div>
    </div>
  );
}
