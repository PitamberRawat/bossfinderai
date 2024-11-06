import x from "../assets/x.svg";
import at from "../assets/@.svg";
import i from "../assets/in.svg";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="footer-container">
        <div className="footer">
          <img
            sizes="100vw"
            srcset="https://framerusercontent.com/images/zCr8XonI7K72G6goRgxdlu3H8k.png?scale-down-to=512 512w,https://framerusercontent.com/images/zCr8XonI7K72G6goRgxdlu3H8k.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/zCr8XonI7K72G6goRgxdlu3H8k.png?scale-down-to=2048 2048w,https://framerusercontent.com/images/zCr8XonI7K72G6goRgxdlu3H8k.png 2456w"
            src="https://framerusercontent.com/images/zCr8XonI7K72G6goRgxdlu3H8k.png?scale-down-to=2048"
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              borderRadius: "inherit",
              objectPosition: "center",
              objectFit: "cover",
            }}
          />
        </div>
        {/* <div>
          <div
            style={{ maxWidth: "1200px", width: "100%", textAlign: "center" }}
          >
            {window.innerWidth >= 800 ? (
              <>
                <h3 className="heading3">
                  I guess all I'm trying to say is you
                </h3>
                <h3 className="heading3">should smash the damn button.</h3>
              </>
            ) : (
              <h3 className="heading3">
                I guess all I'm trying to say is you should smash the damn
                button.
              </h3>
            )}
          </div>
        </div>

        <div className="smash-div">
          <div className="smash-container">
            <span className="smash-text">Smash the damn button</span>
            <div
              style={{
                // width: "100%",
                // height: "100%",
                aspectRatio: "inherit",
              }}
            >
              <svg
                viewBox="0 0 34 28"
                preserveAspectRatio="none"
                // width="100%"
                // height="100%"
              >
                <use href="#svg-1266080117_1709"></use>
              </svg>
            </div>
          </div>
        </div>

        <div
          style={{
            flex: "none",
            height: "auto",
            width: "auto",
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: "18px",
              fontWeight: "400",
              color: "#737373",
              marginTop: "-20px",
            }}
          >
            Be quick! Spots are almost gone for October
          </div>
        </div> */}

        <div className="bossfinder-footer">
          <div>
            <div className="logo">
              {/* <div className="svgContainer">
                <svg>
                  <use href="#svg9604681989"></use>
                </svg>
              </div> */}
            </div>
            <div>
              <p className="bossfinder-para">
                © Boss Finder AI 2024. All rights reserved.
              </p>
            </div>
          </div>
          {/* right */}
          <div className="socials">
            <a className="social-media" href="">
              <img height="50px" width="40px" src={x} alt="" />
            </a>
            <a className="social-media" href="">
              <img height="50px" width="40px" src={i} alt="" />
            </a>
            <a className="social-media" href="">
              <img height="50px" width="40px" src={at} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="sticky-navbar">
        <div className="nav-container">
          <img
            style={{
              height: "60px",
              width: "90px",
            }}
            className="sticky-nav-img"
            src="https://framerusercontent.com/images/gAKACEGDrWnhhE9OEb1ppLbSqc.png"
            alt=""
          />

          <div className="links">
            <a href="#how" className="link">
              How it Works
            </a>

            <a href="#pricing" className="link">
              Pricing
            </a>

            <a href="#work" className="link">
              Proof
            </a>

            <a href="#faq" className="link">
              FAQ
            </a>
          </div>

          <div
            onClick={() => navigate("/register")}
            className="contact-section"
          >
            <div className="book-text">
              <p style={{ fontWeight: "700" }}>
                Email your hiring manager today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
