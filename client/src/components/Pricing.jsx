import React from "react";
import "./Pricing.css";
import { useNavigate } from "react-router-dom";
const Pricing = () => {
  const navigate = useNavigate();
  return (
    <div className="pricing" id="pricing">
      <div className="pricing-container">
        <div className="img-container">
          <div
            style={{
              position: "absolute",
              borderRadius: "inherit",
              inset: "0",
            }}
          >
            <img
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                borderRadius: "inherit",
                objectPosition: "center center",
                objectFit: "cover",
              }}
              src="https://framerusercontent.com/images/9HXlBhPTlnwGFMLODp1jSqEVFc.png?scale-down-to=2048"
              alt=""
            />
          </div>
        </div>
        <div className="tools" style={{ marginBottom: "-30px" }}>
          <div className="tools-container">
            <p className="tool-text" style={{ whiteSpace: "pre" }}>
              Pricing
            </p>
          </div>
        </div>
        <div className="header-Psection ">
          <h3 className="problem-text" style={{ color: "black" }}>
            Ready to Land your next role?
          </h3>
        </div>

        <div className="cards-container">
          <div className="cards">
            {/* LEFT CARD */}
            <div className="flex-row-div">
              <div className="left-card pricing-card-div">
                <div className="top-section">
                  <div className="start-book-container">
                    <div className="para-start-div">
                      <p className="para-start">Try us!</p>
                    </div>
                  </div>

                  <div className="price-container">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        flexShrink: "0",
                      }}
                    >
                      <span className="price">$3</span>
                      <span
                        className="price"
                        style={{
                          marginLeft: "5px",
                          marginTop: "10px",
                          fontSize: "25px",
                          textDecoration: "line-through",
                        }}
                      >
                        $5
                      </span>
                    </div>
                    <div
                      className="para-start-div"
                      style={{ backgroundColor: "black" }}
                    >
                      <p
                        className="para-start"
                        style={{
                          fontSize: "14px",
                          color: "white",
                        }}
                      >
                        Early bird pricing till 15th October!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="feature-section">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      flexShrink: "0",
                    }}
                  >
                    <p className="feature-text">Features:</p>
                  </div>

                  <div className="feature-points-div">
                    <Pointdiv point="5 Credits" />
                    <Pointdiv point="Get Top 2 Matches per search" />
                    <Pointdiv point="Look For Upto 5 Jobs" />
                    {/* <Pointdiv point="Delivery Time: 30 Mins" /> */}
                  </div>
                </div>
                <a
                  onClick={() => navigate("/checkoutpage")}
                  href=""
                  className="btn-anchor"
                >
                  <p className="btn-secure-para">Get Started </p>
                  <span className="arrow-right">→</span>
                </a>
              </div>

              {/*  Middle card */}

              <div
                className="left-card pricing-card-div"
                style={{ backgroundColor: "black" }}
              >
                <div className="top-section">
                  <div className="start-book-container">
                    <div className="para-start-div">
                      <p className="para-start" style={{ color: "white" }}>
                        Enough credits to get your dream job!
                      </p>
                    </div>
                  </div>

                  <div className="price-container">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        flexShrink: "0",
                      }}
                    >
                      <p className="price" style={{ color: "white" }}>
                        $19
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "normal",
                            letterSpacing: "normal",
                          }}
                        >
                          <span
                            className="price"
                            style={{
                              marginLeft: "5px",
                              marginTop: "10px",
                              fontSize: "25px",
                              marginRight: "10px",
                              color: "white",
                              textDecoration: "line-through",
                            }}
                          >
                            $49{" "}
                          </span>
                          per month
                        </span>
                      </p>
                    </div>
                    <div
                      className="para-start-div"
                      style={{ backgroundColor: "white" }}
                    >
                      <p
                        className="para-start"
                        style={{
                          fontSize: "14px",
                          color: "black",
                        }}
                      >
                        Early bird pricing till 15th October!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="feature-section">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      flexShrink: "0",
                    }}
                  >
                    <p style={{ color: "white" }} className="feature-text">
                      Features:
                    </p>
                  </div>

                  <div className="feature-points-div">
                    <Pointdiv flag={true} point="50 Credits" />
                    <Pointdiv
                      flag={true}
                      point="Get Top 5 Matches per search"
                    />
                    <Pointdiv flag={true} point="Look For Upto 50 Jobs" />
                    {/* <Pointdiv flag={true} point="Delivery Time: 20 Mins" /> */}
                    <Pointdiv
                      flag={true}
                      point="Upto 10 AI Email Copy: Coming Soon"
                    />
                  </div>
                </div>
                <a
                  onClick={() => navigate("/checkoutpage")}
                  href=""
                  className="btn-anchor"
                  style={{ backgroundColor: "white" }}
                >
                  <p className="btn-secure-para" style={{ color: "black" }}>
                    Get Started{" "}
                  </p>
                  <span className="arrow-right" style={{ color: "black" }}>
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* RIGHT CARD  */}

            <div className="left-card pricing-card-div right-card-divvv">
              <div className="top-section">
                <div className="start-book-container">
                  <div className="para-start-div">
                    <p className="para-start">
                      Never worry about unread resumes again. Reach hiring
                      managers forever!
                    </p>
                  </div>
                </div>

                <div className="price-container">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      flexShrink: "0",
                    }}
                  >
                    <p className="price">
                      $49
                      <span
                        className="price"
                        style={{
                          marginLeft: "5px",
                          marginTop: "10px",
                          fontSize: "25px",
                          // color: "white",
                          textDecoration: "line-through",
                        }}
                      >
                        $299{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          letterSpacing: "normal",
                          marginLeft: "10px",
                        }}
                      >
                        lifetime access
                      </span>
                    </p>
                  </div>
                  <div
                    className="para-start-div"
                    style={{ backgroundColor: "black" }}
                  >
                    <p
                      className="para-start"
                      style={{
                        fontSize: "14px",
                        color: "white",
                      }}
                    >
                      Early bird pricing till 15th October!
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-section">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    flexShrink: "0",
                  }}
                >
                  <p className="feature-text">Features:</p>
                </div>

                <div className="feature-points-div">
                  <Pointdiv point="50 Credits Every Day" />
                  <Pointdiv point="Get Top 7 Matches" />
                  <Pointdiv point="Look For Unlimited Jobs" />
                  {/* <Pointdiv point="Delivery Time: 15 Mins" /> */}
                  <Pointdiv point="LifeTime Support & Updates" />
                  <Pointdiv point="Unlimited AI Email Copy: Coming Soon" />
                </div>
              </div>
              <a
                onClick={() => navigate("/checkoutpage")}
                href=""
                className="btn-anchor"
              >
                <p className="btn-secure-para">Get Started </p>
                <span className="arrow-right">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

export const Pointdiv = ({ point, flag }) => {
  return (
    <div className="point-div">
      <p className="bullet-point" style={{ color: flag ? "white" : "black" }}>
        •
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <p className="point-text" style={{ color: flag ? "white" : "black" }}>
          {point}
        </p>
      </div>
    </div>
  );
};
