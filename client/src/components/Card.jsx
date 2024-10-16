import React from "react";
import "./Card.css";
import Star from "./Star";

const Card = ({ id, name, dis }) => {
  return (
    <div className="card" key={id}>
      <div className="person-info">
        <img src="https://via.placeholder.com/60" alt="Person" />
        <div className="name">{name}</div>
      </div>
      <div className="stars" style={{ display: "flex", flexDirection: "row" }}>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
      <div className="review">{dis}</div>
    </div>
  );
};

export default Card;
