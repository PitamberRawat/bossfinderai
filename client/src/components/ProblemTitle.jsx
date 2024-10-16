import React from "react";
import "../App.css";

const ProblemTitle = ({ heading, para, flag }) => {
  return (
    <>
      <div
        className="header-Psection "
        style={{ marginBottom: `${flag ? "-45px" : ""}` }}
      >
        <h3 className="problem-text">{heading}</h3>
        {flag ? (
          <h3 className="problem-text" style={{ marginTop: "-24px" }}>
            Send an email to the hiring manager of your dream job.
          </h3>
        ) : null}
      </div>

      <p className="problem-para">{para}</p>
      {flag ? (
        <p className="problem-para" style={{ marginTop: "-65px" }}>
          Boss Finder AI helps you land your dream job by finding out who's
          responsible for hiring and provides you with their email so you can
          stand out.
        </p>
      ) : null}
    </>
  );
};

export default ProblemTitle;
