import React from "react";
import "./Problem.css";

const Problem = ({ heading, para, svg, flag, color }) => {
  return (
    <div className="problem-div">
      {flag || color ? (
        <div
          style={{
            backgroundColor: `${color ? "white" : ""}`,
            borderRadius: "20px",
          }}
        >
          <img style={{ height: "100px" }} src={svg} alt="" />
        </div>
      ) : (
        <div>{svg}</div>
      )}

      <div className="text-section">
        <div className="text-divvv">
          <p
            className=" text-section-heading"
            style={{
              fontSize: color ? "40px" : "18px",
              // whiteSpace: "pre",
              textAlign: "center",
            }}
          >
            {heading}
          </p>
        </div>
        <div className="text-divvv">
          <p className="text-section-para">{para}</p>
        </div>
      </div>
    </div>
  );
};

export default Problem;

{
  /* <div style={{ backgroundColor: "", borderRadius: "20px" }}>
            <img style={{ height: "100px" }} src={svg} alt="" />
          </div> */
}
{
  /* {svg} */
}
{
  /* <div className="text-section">
            <div className="text-divvv">
              <p
                className="text-section-heading"
                style={{
                  fontSize: "18px",
                whiteSpace: "pre",
                  textAlign: "center",
                }}
              >
                {heading}
              </p>
            </div>
            <div className="text-divvv">
              <p className="text-section-para">{para}</p>
            </div>
          </div> */
}
