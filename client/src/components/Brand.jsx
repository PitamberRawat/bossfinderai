import React from "react";

const Brand = ({ imgUrl }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",

          objectPosition: "center",
        }}
        src={imgUrl}
        alt=""
      />
    </div>
  );
};

export default Brand;
