import React from "react";
import "./gallery.css";
export default function Gallery() {
  return (
    <div className="gallery">
      <div className="gallery__box">
        <img src={require("./../../assest/activity_1.jpg")} alt="" />
      </div>
      <div className="gallery__box">
        <img src={require("./../../assest/activity_2.jpg")} alt="" />
      </div>
      <div className="gallery__box">
        <img src={require("./../../assest/activity_3.jpg")} alt="" />
      </div>
      <div className="gallery__box">
        <img src={require("./../../assest/activity_4.jpg")} alt="" />
      </div>
      <div className="gallery__box">
        <img src={require("./../../assest/g-1.jpg")} alt="" />
      </div>
      <div className="gallery__box">
        <img src={require("./../../assest/g-2.jpg")} alt="" />
      </div>
      <div className="gallery__box">
        <img src={require("./../../assest/g-3.jpg")} alt="" />
      </div>
    </div>
  );
}
