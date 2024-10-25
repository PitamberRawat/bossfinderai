import React, { useState } from "react";
import "./FAQ.css";
import ProblemTitle from "./ProblemTitle";
const FAQ = () => {
  const faqs = [
    {
      question: "How does Boss Finder AI work?",
      isEmail: false,

      answer:
        "Job search is a tedious process. Boss Finder AI helps you cut through the noise by helping you reach the hiring manager of your dream job directly. Our AI takes your job post and finds out the top 5 people who would be resposible for hiring and provides you with their LinkedIn and Email so you can make your mark!",
    },
    {
      question: "Is it okay to email my future boss?",
      isEmail: false,

      answer:
        "Yes, It is perfectly okay to email your future boss. Infact, it shows that you are dedicated and motivated to get that role.",
    },
    {
      question: "Can you show me what a sample email might look like?",
      isEmail: true,
      answer: "",
    },
    {
      question: "Will my boss like it if i email?",
      isEmail: false,

      answer:
        "Hiring managers actually love it when they get the right emails from the right candidates. Look at all our proof where hiring managers have nothing but praises for the people who emailed",
    },
    {
      question: "Will this help me stand out in a job position interview?",
      isEmail: false,

      answer:
        "Yes, reaching out directly to a hiring manager can definitely increase your chances of getting hired and being the only person who made the extra effort.",
    },
    {
      question: "I’m not getting any replies, what am i doing wrong?",
      isEmail: false,

      answer:
        "If you're not getting any replies, you're probably writing the wrong email. Ensure that there are no spam words in your email, dont send any attachments or links in your first email.",
    },
    {
      isEmail: false,

      question: "Is this violating any privacy laws?",
      answer:
        "No, you're not violating any privacy laws. It is perfectly okay to email people on their work emails.",
    },
  ];

  return (
    <div className="faq" id="faq">
      <div className="faq-container">
        <div className="tools" style={{ marginBottom: "-30px" }}>
          <div className="tools-container">
            <p className="tool-text" style={{ whiteSpace: "pre" }}>
              FAQs
            </p>
          </div>
        </div>
        <ProblemTitle heading="Questions? Answers." />
        <div className="both-faq-container">
          <div
            className="left-faq-container"
            style={{
              flex: "none",
              height: "auto",
              position: "relative",
            }}
          >
            {faqs.map((faq, index) => (
              <div key={faq.question} className="left-faq">
                <Quescontainer
                  key={index}
                  isEmail={faq.isEmail}
                  question={faq.question}
                  answer={faq.answer}
                />
              </div>
            ))}
          </div>
          <div className="right-faq">
            <div className="book-pic-container">
              <div
                style={{
                  position: "absolute",
                  borderRadius: "inherit",
                  inset: "0px",
                }}
              >
                <img
                  width="100%"
                  height="100%"
                  style={{
                    borderRadius: "inherit",
                    objectPosition: "center center",
                    objectFit: " cover",
                  }}
                  src="https://framerusercontent.com/images/5mFT0LW85niZJOWfI9aS21EDnA.png"
                  alt=""
                />
              </div>
            </div>

            <div className="book-pic-text-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  flexShrink: "0",
                }}
              >
                <p className="book-para-text">Have more Questions?</p>
                {/* <p className="book-para-text" style={{ textAlign: "center" }}>
                  Chat with US!
                </p> */}
              </div>
              <div className="book-call-btn-div">
                <a href="" className="book-call-btn">
                  Chat with US!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

export const Quescontainer = ({ question, answer, isEmail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="faqques-container">
      <div className="question-container" onClick={toggleAnswer}>
        <h3 className="question">{question}</h3>
        <div className="plus-container">
          <span className="toggle-button">{isOpen ? "❌" : "+"}</span>
        </div>
      </div>
      {isOpen && (
        <p className="answer">
          {isEmail ? (
            <span>
              Here is a what a sample email might look like: <br /> Hey Ron,{" "}
              <br />
              I'm a recent Stanford Graduate and a Product Manager with 5 years
              of experience building B2B SaaS products. I noticed that you were
              the hiring manager for the recent PM API Integrations role at
              Google, and was wondering if you'd be willing to chat more about
              what does success mean for you in the role? <br />
              Best, <br />
              Matt <br /> PS: I was the class valedictorian and my products have
              done $200+ Mn in revenue so far.
            </span>
          ) : (
            answer
          )}
        </p>
      )}
    </div>
  );
};

{
  /* <div className="ques-container">
      <div className="ques-div">
        <div className="ques-ques">
          <p className="ques-text">{ques}</p>
        </div>
        <div className="plus-container">
          <span className="plus">+</span>
        </div>
      </div>
    </div> */
}
