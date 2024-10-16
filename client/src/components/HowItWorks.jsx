import React from "react";
import "./HowItWorks.css";
import ProblemTitle from "./ProblemTitle";
import Problem from "./Problem";
import arrowright from "../assets/right-arrow.png";

import one from "../assets/one.webp";
import two from "../assets/two.webp";
import three from "../assets/three.webp";

const HowItWorks = () => {
  const bool = true;
  return (
    <div className="hiw" id="how">
      <div className="hiw-container">
        <div className="tools" style={{ marginBottom: "-30px" }}>
          <div className="tools-container">
            <p className="tool-text" style={{ whiteSpace: "pre" }}>
              How it works
            </p>
          </div>
        </div>

        <ProblemTitle heading="Blazing fast, super easy" />
        <div className="problem-ques" style={{ marginTop: "-30px" }}>
          <Problem
            heading="Subscribe"
            color={true}
            svg={one}
            para="Pick a subscription and you'll receive credits in your account that you can use to search for hiring managers."
          />
          {bool && (
            <img
              className="arrow-img"
              style={{ marginTop: "-100px" }}
              src={arrowright}
              height="100px"
              width="100px"
              alt=""
            />
          )}
          <Problem
            svg={two}
            color={true}
            heading="Request"
            para="Login and enter the link of the job posting that you want to find the hiring manager for."
          />
          {bool && (
            <img
              className="arrow-img"
              src={arrowright}
              style={{ marginTop: "-100px" }}
              height="100px"
              width="100px"
              alt=""
            />
          )}
          <Problem
            heading="Recieve"
            svg={three}
            color={true}
            para="Receive the top matches along with their work emails, sent directly to your email account according to the timeline of your subscription. Note: WebApp with instant results launching soon! "
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
