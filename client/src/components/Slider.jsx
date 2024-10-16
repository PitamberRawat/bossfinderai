import React, { useEffect, useState } from "react";
import "./Services.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import amd from "../assets/imgfold1/AMD.png";
import DataBricks from "../assets/imgfold1/DataBricks.jpg";
import Google from "../assets/imgfold1/Google.jpg";
import Mckinsey from "../assets/imgfold1/Mckinsey.jpg";
import MS from "../assets/imgfold1/MS.jpg";
import TripAdvisor from "../assets/imgfold1/TripAdvisor.jpg";
import WorkDay from "../assets/imgfold1/WorkDay.jpg";

const Slider = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to update width on resize
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Add event listener on component mount and remove it on unmount
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  return (
    <div
      style={{
        width: `${
          windowWidth > 1000
            ? "1000px"
            : windowWidth > 800
            ? "740px"
            : windowWidth > 600
            ? "380px"
            : "350px"
        }`,

        height: "550px",
        // margin: "100px",
      }}
    >
      <Swiper
        slidesPerView={windowWidth > 1000 ? 2 : 1}
        spaceBetween={10}
        loop={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 1500,
        }}
      >
        <SwiperSlide>
          <img
            style={{
              width: "100%",
              // height: "500px",
              objectFit: "contain",
              objectPosition: "center center",
              margin: "10px",
            }}
            src={amd}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{
              width: "100%",
              // height: "500px",
              objectFit: "contain",
              objectPosition: "center center",
              margin: "10px",
            }}
            src={DataBricks}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              margin: "10px",
            }}
            src={Google}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              margin: "10px",
            }}
            src={Mckinsey}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              margin: "10px",
            }}
            src={MS}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              margin: "10px",
            }}
            src={TripAdvisor}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              margin: "10px",
            }}
            src={WorkDay}
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
