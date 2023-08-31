import React, { useRef, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";
import axios from "axios";
import "./Faqs.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.css";

export default function Faqs() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/faqs/create-faqs",
        {
          question: question,
          answer: answer,
        }
      );
      console.log("FAQ created:", response.data);
      toast.success(`FAQ Created Successfully`, {
        className: "custom-toast",
      });
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Error creating FAQ:", error);
    }
  };

  return (
    <div>
      <div className="header">
        <span className="colored-text">Frequently Asked Questions</span>
      </div>
      <div className="center-container">
        <MDBCard className="card-container">
          <MDBCardBody>
            <MDBCardTitle className="card-title">Create FAQs</MDBCardTitle>
            <div className="label">Question</div>
            <MDBInput
              label="Enter your question"
              id="typeText"
              type="text"
              className="custom-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="label">Answer</div>
            <MDBTextArea
              label="Enter your answer"
              id="textAreaExample"
              rows={4}
              className="custom-textarea"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </MDBCardBody>
          <MDBBtn
            color="success"
            className="card-button"
            onClick={handleSubmit}
          >
            Submit
          </MDBBtn>
        </MDBCard>
      </div>
    </div>
  );
}
