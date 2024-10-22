import React, { useEffect, useState } from "react";
import { register, login, logout } from "./components/config/auth";
import "./App.css";
import Avatar from "./components/Avatar";
import Brand from "./components/Brand";
import BrandContainer from "./components/BrandContainer";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Problem from "./components/Problem";
import ProblemTitle from "./components/ProblemTitle";
import Services from "./components/Services";
import Slider from "./components/Slider";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Star from "./components/Star";
import Testimonial from "./components/Testimonial";

import arrowdown from "../src/assets/arrowdown.png";
import logo from "../src/assets/bfalogo.png";
import amd from "../src/assets/logos/amd.png";
import amazon from "../src/assets/logos/amazon.png";
import boss from "../src/assets/logos/boss.png";
import docsend from "../src/assets/logos/docsend.png";
import databricks from "../src/assets/logos/databricks.png";
import deel from "../src/assets/logos/deel.png";
import flair from "../src/assets/logos/flair.png";
import google from "../src/assets/logos/google.png";
import jobber from "../src/assets/logos/jobber.png";
import kuku from "../src/assets/logos/kuku.png";
import lightspeed from "../src/assets/logos/lightspeed.svg";
import Lululemon from "../src/assets/logos/Lululemon.png";
import mongodb from "../src/assets/logos/mongodb.png";
import McKinsey from "../src/assets/logos/McKinsey.png";
import microsoft from "../src/assets/logos/microsoft.webp";
import neo from "../src/assets/logos/neo.png";
import questionpro from "../src/assets/logos/questionpro.png";
import rainforest from "../src/assets/logos/rainforest.svg";
import Tata from "../src/assets/logos/Tata.png";
import td from "../src/assets/logos/td.png";
import touch from "../src/assets/logos/touch.png";
import telus from "../src/assets/logos/telus.png";
import tripadvisor from "../src/assets/logos/tripadvisor.svg";
import truecaller from "../src/assets/logos/truecaller.png";
import workday from "../src/assets/logos/workday.jpg";
import p1 from "../src/assets/peoples/p1.jpg";
import p2 from "../src/assets/peoples/p2.jpg";
import p3 from "../src/assets/peoples/p3.jpg";
import p4 from "../src/assets/peoples/p4.jpg";
import p5 from "../src/assets/peoples/p5.jpg";
import dice from "../src/assets/dice.png";
import bulb from "../src/assets/bulb.svg";
import cross from "../src/assets/cross.svg";
import Card from "./components/Card";
import AuthPage from "./components/AuthPage";
import Signin from "./components/Signin";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/config/firebase";

const review = [
  {
    id: 1,
    username: "Daniël",
    discription:
      "This has been a game changer. I can be the top candidate in any job now by simply sending an email!",
  },
  {
    id: 2,
    username: "Dann",
    discription:
      "I started using this a few weeks ago and went from no interviews to 5! By simply emailing the right person, you get so far ahead. Even when the match is not perfect because lets be honest, not everyone is on the internet, the secondary matches more than make up for it!",
  },
  {
    id: 3,
    username: "Manoj",
    discription:
      "Gotta use it to know it. If you are confident about your work experience, this going to work wonders!",
  },
  {
    id: 4,
    username: "Mani",
    discription:
      "Job applications are a daunting process. Especially in tech where you get 1000s of applications for a single role within a day! Emailing the person responsible for hiring is a sure shot way to stand out! Do it and see the change!",
  },
  {
    id: 5,
    username: "Davo",
    discription:
      "Damn why didn't I find out about this before. I've wasted soo much time its uncanny. ",
  },
  {
    id: 6,
    username: "Fekry",
    discription:
      "Bought the lifetime version because this pricing isn't going to last lol. This product is gold and I cant recommend it enough. ",
  },
  {
    id: 7,
    username: "Lauren",
    discription:
      "I got to know that my future boss is a Messi fan through his LinkedIn and I shot him an email striking that chord! My god it worked amazingly. My final round is scheduled for next week!",
  },
  {
    id: 8,
    username: "Parker",
    discription:
      "It saves me so much time and money I can't tell you. Just the ability to find out who is hiring gives me such an edge when going into an interview. ",
  },
  {
    id: 9,
    username: "Miguel",
    discription:
      "If you haven't found success yet, you will sure with the help of this tool. I fully recommend it. Just started my job last week!",
  },
];

const Homepage = () => {
  const navigate = useNavigate();
  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgb(102, 102, 255)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style="width: 100%; height: 100%;"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );

  return (
    <>
      <div className="containerrr">
        <div className="hero-section">
          <div className="pattern">
            <div className="imgdiv">
              <img
                className="patternImg"
                sizes="100vw"
                srcSet="https://framerusercontent.com/images/L2oTGbAYcb46a7SfWiOStAE7ykk.svg?scale-down-to=512 512w,https://framerusercontent.com/images/L2oTGbAYcb46a7SfWiOStAE7ykk.svg?scale-down-to=1024 1024w,https://framerusercontent.com/images/L2oTGbAYcb46a7SfWiOStAE7ykk.svg 1440w"
                src="https://framerusercontent.com/images/L2oTGbAYcb46a7SfWiOStAE7ykk.svg"
                alt=""
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div></div>
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt=""
              className="bfa-home-logo"
            />
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                className="auth-btn"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
              <button className="auth-btn" onClick={() => navigate("/login")}>
                Log in
              </button>
            </div>
          </div>

          <div className="hero-container">
            <div className="top">
              <div className="header-section">
                <div className="sec-container">
                  <div style={{ display: "flex" }}>
                    <Avatar imgUrl={p1} />
                    <Avatar imgUrl={p2} />
                    <Avatar imgUrl={p3} />
                    <Avatar imgUrl={p4} />
                    <Avatar imgUrl={p5} />
                  </div>

                  <div
                    style={{
                      marginLeft: "14px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "4px",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className="stars"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "var(--clr-text)",
                      }}
                    >
                      100+ Job Seekers Love Boss Finder AI
                    </div>
                  </div>
                </div>

                <div className="headline">
                  <div
                    className="normal-heading"
                    style={{
                      color:
                        "var( --token-08693460-4234-4f36-abdb-ad88f1077ebf)",

                      fontWeight: "700",
                      lineHeight: "110%",
                    }}
                  >
                    Most resumes are never read.
                  </div>
                </div>

                <div className="para">
                  <p className="paraOne">
                    Don't be like everyone else, jump the queue, get noticed,
                    find who's hiring for your next role and send them an email.{" "}
                  </p>
                  {/* <p className="paraOne paraTwo" style={{ color: "white" }}>
                    turn browsers into buyers
                    <span
                      style={{
                        color:
                          "var(--token-c366171b-28e0-4d06-8b69-ef8c4c7d29bf, rgb(82, 82, 82))",
                      }}
                    >
                      {" "}
                      and{" "}
                    </span>
                    drive sales on autopilot.
                  </p> */}
                </div>

                <div className="button-section">
                  <a
                    onClick={() => {
                      navigate("/auth");
                    }}
                    className="claim-button-top"
                  >
                    {/* <div className="btnimgcon">
                      <img
                        height="100%"
                        width="100%"
                        style={{
                          display: "block",
                          objectPosition: "center",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        src="https://framerusercontent.com/images/Oel3kyZZ6WT9S5V7bMa7TxlCP3U.png"
                        alt=""
                      />
                    </div> */}

                    <div className="claim-text-con">
                      <div>
                        <p className="claim-text">Find Your next Boss!</p>
                      </div>
                    </div>
                  </a>

                  <div
                    style={{
                      width: "400px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color:
                          " var(--token-c366171b-28e0-4d06-8b69-ef8c4c7d29bf, rgb(82, 82, 82))",
                      }}
                    >
                      Spend as less as $5 to get your next 6 figure job!
                    </p>
                  </div>
                </div>
                <p
                  className="paraOne"
                  style={{
                    fontSize: "28px",
                    color: "white",
                    marginTop: "20px",
                  }}
                >
                  100+ customers have emailed hiring managers and gotten edge at
                  leading firms
                </p>

                <div className="logos-container">
                  <div className="section slider-container">
                    <ul className="ul slider">
                      <div className="slide">
                        <li>
                          <div className="li-container">
                            <div className="li-y-combinator">
                              <Brand imgUrl={amazon} />
                            </div>
                          </div>
                        </li>
                      </div>

                      <div className="slide">
                        <BrandContainer
                          width="100px"
                          // ar="0.84375 "
                          imgUrl={amd}
                        />
                      </div>

                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={boss} />
                      </div>

                      <div className="slide">
                        <BrandContainer width="87px" imgUrl={databricks} />
                      </div>

                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={deel} />
                      </div>

                      <div className="slide">
                        <BrandContainer width="153px" imgUrl={docsend} />
                      </div>

                      <div className="slide">
                        <BrandContainer width="95px" imgUrl={flair} />
                      </div>

                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={google} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={jobber} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={kuku} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={lightspeed} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={Lululemon} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={McKinsey} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={microsoft} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={mongodb} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={neo} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={questionpro} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={rainforest} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={Tata} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={td} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={telus} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={touch} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={tripadvisor} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={truecaller} />
                      </div>
                      <div className="slide">
                        <BrandContainer width="100px" imgUrl={workday} />
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ alignItems: "flex-start" }}
            className=" header-section work-section"
            id="work"
          >
            <div
              className="arrow-container header-section"
              style={{ alignItems: "flex-start" }}
            >
              <div className="some-recent-work">
                <span className="rotate-text">Here's Some Proof</span>
              </div>

              <div style={{ display: "flex" }}>
                <img height="100px" width="100px" src={arrowdown} alt="" />
                <p className="testi-big-text">
                  BDRs, SDRs, Product Managers, Marketing Gurus are all skipping
                  the queue and you should too!
                </p>
              </div>

              <Slider />
            </div>
          </div>

          {/* end */}
        </div>
        <div className="problem-section">
          <div className="problem-container">
            <ProblemTitle
              heading="Your resume isn’t the problem... your dream job is just receiving too much attention."
              para="The real challenge is getting your resume noticed by a recruiter or hiring manager."
            />
            <div className="problem-ques">
              <Problem
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                }
                heading="Sea Of Candidates"
                para="Every single job posting receives 1000+ candidates in 2024 with 100+ candidates applying in the first few hours of the post being live."
              />
              <Problem
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                }
                heading="Recruiters Suck"
                para="Most recruiters often have very little idea about the position they are hiring for and most of the times they end up choosing incorrectly."
              />
              <Problem
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                  </svg>
                }
                heading="AI is Screening You"
                para="ATS is a thing of the past. Your job application is being screened by an AI tool 90% of the time and most models are highly inaccurate when it comes to hiring."
              />
            </div>
          </div>
        </div>

        <div className="solution-section s-section">
          <div className="solution-container">
            <ProblemTitle heading="The Solution:" para="" flag="true" />
            <div className="problem-ques">
              <Problem
                svg={dice}
                flag={true}
                heading="Beat the Odds"
                para="83% of the candidates that go the extra mile have a higher chance of being interviewed and  getting hired. Tell your boss that you’ve got what it takes to make a difference."
              />
              <Problem
                flag={true}
                svg={bulb}
                heading="Proactive Approach"
                para="Hiring managers are always looking for go getters and they appreciate the fact that you’re dedicated enough to find out about them and reach out with a personalized message."
              />
              <Problem
                svg={cross}
                heading="Resume Is Not Everything"
                para="Everyone knows that resumes never tell the whole story and there is so much more to a person than just that one piece of paper. Shine through by breaking the barriers and get hired!"
                flag={true}
              />
            </div>
          </div>
        </div>

        {/* <div className="testimonial-section s-section" style={{ gap: "0px" }}>
          <Testimonial />
        </div> */}
        <Services />
        <HowItWorks />
        <Pricing />
        <div className="card-div">
          <div className="testi-head-section">
            <div className="testi-text-container">
              <p>Testimonials</p>
            </div>
            <h1 className="testi-big-text">Loved by job seekers worldwide</h1>
          </div>
          <div className="card-container">
            {review.map((element) => (
              <Card
                key={element.id}
                name={element.username}
                dis={element.discription}
              />
            ))}
          </div>
        </div>
        <FAQ />
        {/* Footer  */}

        <Footer />

        {/* <div className="launcher">
          <div className="launcher-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 32">
              <path d="M28 32s-4.714-1.855-8.527-3.34H3.437C1.54 28.66 0 27.026 0 25.013V3.644C0 1.633 1.54 0 3.437 0h21.125c1.898 0 3.437 1.632 3.437 3.645v18.404H28V32zm-4.139-11.982a.88.88 0 00-1.292-.105c-.03.026-3.015 2.681-8.57 2.681-5.486 0-8.517-2.636-8.571-2.684a.88.88 0 00-1.29.107 1.01 1.01 0 00-.219.708.992.992 0 00.318.664c.142.128 3.537 3.15 9.762 3.15 6.226 0 9.621-3.022 9.763-3.15a.992.992 0 00.317-.664 1.01 1.01 0 00-.218-.707z"></path>
            </svg>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Homepage;
