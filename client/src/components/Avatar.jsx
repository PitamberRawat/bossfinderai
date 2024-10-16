import React from "react";

const Avatar = ({ imgUrl, fault }) => {
  return (
    <div style={{ marginRight: "-10px" }}>
      <div>
        <div
          style={{
            borderRadius: "9999px",
            backgroundColor: "rgba(128, 128, 128, 0.14)",
          }}
        >
          <img
            src={imgUrl}
            className="avatar-img"
            width="40px"
            height="40px"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
