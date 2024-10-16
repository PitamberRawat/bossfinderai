import React, { useEffect, useState } from "react";
import "./Services.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BrandContainer from "./BrandContainer";
import Brand from "./Brand";

import Browser from "../assets/imgfold2/Browser.jpg";
import Deel from "../assets/imgfold2/Deel.jpg";
import Jobber from "../assets/imgfold2/Jobber.jpg";
import Kuku from "../assets/imgfold2/Kuku.jpg";
import LightSpeed from "../assets/imgfold2/LightSpeed.jpg";
import Neo from "../assets/imgfold2/Neo.jpg";
import Postman from "../assets/imgfold2/Postman.jpg";
import SnapDocs from "../assets/imgfold2/SnapDocs.jpg";
import Tata from "../assets/imgfold2/Tata.jpg";
import TDF from "../assets/imgfold2/TDF.jpg";
import TElus from "../assets/imgfold2/TElus.jpg";
import TrueCaller from "../assets/imgfold2/TrueCaller.jpg";

const Services = () => {
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
    <>
      <div className="service">
        <div className="service-container">
          <div className="cont">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {/* Don’t take our word for it, look at some of the email responses our users have received from Managers, Directors, VPs, CEOs, from some of the top companies in the world. */}
              <div className="service-heading-container">
                <p className="service-text">Results</p>
              </div>

              <div>
                <h3 className="head3">
                  Don’t take our word for it, look at some of the email
                  responses our users have received from Managers, Directors,
                  VPs, CEOs, from some of the top companies in the world.
                </h3>
              </div>
            </div>

            {/* <div className="development">
              <div className="development-container">
                <Development devName="Copywriting" />
                <Development devName="Branding" />
                <Development devName="Logos & Icons" />
                <Development devName="Landing pages" />
                <Development devName="Creative strategy" />
                <Development devName="Websites" />
                <Development devName="Custom Illustrations/Graphics" />
                <Development devName="Web Apps" />
                <Development devName="Mobile Apps" />
                <Development devName="Pitch decks" />
                <Development devName="Social media assests" />
                <Development devName="Email templates" />
                <Development devName="CMS" />
                <Development devName="Framer/Webflow/React Development" />
              </div>
            </div> */}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "",
            width: `${
              windowWidth > 1000
                ? "1000px"
                : windowWidth > 800
                ? "740px"
                : windowWidth > 600
                ? "380px"
                : "350px"
            }`,

            // height: "800px",
            marginTop: "15px",
            marginBottom: "12px",
          }}
        >
          <Swiper
            slidesPerView={windowWidth > 1000 ? 2 : 1}
            spaceBetween={10}
            loop={true}
            navigation={true}
            modules={[Navigation]}
          >
            <SwiperSlide>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                  margin: "10px",
                }}
                src={Browser}
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
                src={Deel}
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
                src={Jobber}
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
                src={Kuku}
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
                src={LightSpeed}
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
                src={Neo}
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
                src={Postman}
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
                src={SnapDocs}
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
                src={Tata}
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
                src={TDF}
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
                src={TElus}
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
                src={TrueCaller}
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Services;

export const Development = ({ devName }) => {
  return (
    <div className="chip">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          outline: "none",
          height: "auto",
          position: "relative",
          whiteSpace: "pre",
          width: "auto",
          flexShrink: "0",
        }}
      >
        <p className="dev-name">{devName}</p>
      </div>
    </div>
  );
};
