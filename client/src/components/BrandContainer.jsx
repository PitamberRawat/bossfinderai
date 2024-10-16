import React from "react";
import "./BrandContainer.css";
import Brand from "./Brand";

const BrandContainer = ({ width, imgUrl, ar }) => {
  return (
    <>
      <li>
        <div className="li-container">
          <div
            style={{ width: width, aspectRatio: ar / "1" }}
            className="brand-container"
          >
            <Brand imgUrl={imgUrl} />
          </div>
        </div>
      </li>
    </>
  );
};

export default BrandContainer;
