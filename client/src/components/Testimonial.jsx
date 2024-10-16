import React from "react";
import "./Testimonial.css";
import "../App.css";
import Star from "./Star";
const Testimonial = () => {
  return (
    <div className="testi-container">
      <div className="testi-head-section">
        <div className="testi-text-container">
          <p>Testimonials</p>
        </div>
        <h1 className="testi-big-text">Loved by job seekers worldwide</h1>
      </div>

      <div className="images-section">
        <TestimonialContainers
          personName="Harsh Patel"
          founder="Founder at Macro"
          img="https://image.mux.com/RWh402hcjQyW7sSlU6574UYFFrV9UECLF9eEE6rVx1Bg/thumbnail.jpg"
        />
        <TestimonialContainers
          personName="Jules Ioannidis"
          founder="Co-Founder at Gracenote"
          img="https://image.mux.com/oEKfYQBGrhzxgtnWq2k76JVNv1a9JjZFJt8bwikPPTQ/thumbnail.webp
"
          cn="two"
        />
        {/* <TestimonialContainers
          personName="Carson Suite"
          founder="Founder at InvolvChat"
          cn="three"
          img="https://image.mux.com/5CPjNKhyMJAD00Iai021gEB00FjCeDH3H5HyxZmtJx6LPA/thumbnail.webp"
        /> */}
        <TestimonialContainers
          personName="Lyndon Jackson"
          cn="four"
          founder="Founder at Pezmix"
          img="https://image.mux.com/WWxXZH029apeZJ8bTst56YAzM7jALjr00fB4LThtg00W7M/thumbnail.webp?time=27.7521665"
        />
      </div>
      <div className="button">
        <p className="btn-text">View all testimonials</p>
      </div>
    </div>
  );
};

export default Testimonial;

export const TestimonialContainers = ({ personName, founder, img, cn }) => {
  return (
    <div className={`pic-one ${cn} `}>
      <div
        className="rating-div"
        style={{
          marginLeft: "14px",
          display: "flex",
          justifyContent: "center",
          gap: "4px",
          flexDirection: "column",
        }}
      >
        <div className="stars">
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
          {personName}
        </div>
        <p
          style={{
            color: "white",
            fontSize: "12px",
          }}
        >
          {founder}
        </p>
      </div>
      <img
        height="100%"
        width="100%"
        style={{
          objectFit: "cover",
          objectPosition: "center center",
          borderRadius: "10px",
        }}
        src={img}
        alt=""
      />
    </div>
  );
};
