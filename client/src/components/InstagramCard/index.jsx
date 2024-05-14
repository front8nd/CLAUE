import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import "swiper/css";
import "./style.css";
import INS1 from "/src/assets/Ins1.png";
import INS2 from "/src/assets/Ins2.png";
import INS3 from "/src/assets/Ins3.png";
import INS4 from "/src/assets/Ins4.png";
import INS5 from "/src/assets/Ins5.png";
import INS6 from "/src/assets/Ins6.png";

export default function InstagramCard() {
  return (
    <div className="instagram">
      <h3 className="insta-heading">@ FOLLOW US ON INSTAGRAM</h3>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={4}
        className="mySwiper-2"
      >
        <SwiperSlide className="swiper-slide-2">
          <img className="slide-hover-img" src={INS1} alt="Instagram post" />
          <a href="https://instagram.com">
            <FaRegComment className="slide-hover-icon-1" />
            <IoIosHeartEmpty className="slide-hover-icon-2" />
          </a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-2">
          <img className="slide-hover-img" src={INS2} alt="Instagram post" />
          <a href="https://instagram.com">
            <FaRegComment className="slide-hover-icon-1" />
            <IoIosHeartEmpty className="slide-hover-icon-2" />
          </a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-2">
          <img className="slide-hover-img" src={INS3} alt="Instagram post" />
          <a href="https://instagram.com">
            <FaRegComment className="slide-hover-icon-1" />
            <IoIosHeartEmpty className="slide-hover-icon-2" />
          </a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-2">
          <img className="slide-hover-img" src={INS4} alt="Instagram post" />
          <a href="https://instagram.com">
            <FaRegComment className="slide-hover-icon-1" />
            <IoIosHeartEmpty className="slide-hover-icon-2" />
          </a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-2">
          <img className="slide-hover-img" src={INS5} alt="Instagram post" />
          <a href="https://instagram.com">
            <FaRegComment className="slide-hover-icon-1" />
            <IoIosHeartEmpty className="slide-hover-icon-2" />
          </a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-2">
          <img className="slide-hover-img" src={INS6} alt="Instagram post" />
          <a href="https://instagram.com">
            <FaRegComment className="slide-hover-icon-1" />
            <IoIosHeartEmpty className="slide-hover-icon-2" />
          </a>
          <div className="icon-tooltip">Follow on Instagram</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
