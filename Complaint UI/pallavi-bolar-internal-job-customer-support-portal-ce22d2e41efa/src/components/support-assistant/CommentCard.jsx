import React, { useRef, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import ComplaintService from "./ComplaintService";
import "./ComplaintDetailsCard.css";

export default function CommentCard({ complaintId, existingComments }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentAreaRef = useRef(null);

  const handlePostComment = async () => {
    try {
      console.log("Adding comment...");
      const response = await ComplaintService.addComment(complaintId, comment);
      console.log("Comment added successfully.");
      console.log("response:", response.data);
      console.log("comment", comment);
      console.log("date:", response.data.commentDates[0]);
      const newComment = {
        comment: comment,
        commentDate: response.data.commentDates[0],
      };
      console.log("newComment", newComment);

      // Scroll to the bottom of the comment area after adding a new comment
      if (commentAreaRef.current) {
        commentAreaRef.current.scrollTop = commentAreaRef.current.scrollHeight;
      }

      setComments((prevComments) => [...prevComments, newComment]);
      setComment(""); 
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    return `${formattedDate} ${formattedTime}`;
  }

  console.log("existingComments:", existingComments);

  return (
    <MDBContainer className="py-5" style={{ maxWidth: "1200px" }}>
      <MDBRow className="justify-content-left comment-card-container">
        <MDBCol md="12" lg="10" xl="8">
          <MDBCard>
            <MDBCardFooter
              className="py-3 border-0"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <p>Comments</p>
              <hr />
              <div className="d-flex flex-start w-100">
                <MDBCardImage
                  className="rounded-circle shadow-1-strong me-2"
                  src="/icon.png"
                  alt="avatar"
                  width="80"
                  height="5"
                />
                <MDBTextArea
                  label="Message"
                  id="textAreaExample"
                  rows={4}
                  style={{ backgroundColor: "#fff", fontSize: "16px" }}
                  wrapperClass="w-100"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="float-end mt-2 pt-1">
                <MDBBtn
                  size="sm"
                  className="me-1 comment-button"
                  style={{ backgroundColor: "#872746" }}
                  onClick={handlePostComment}
                >
                  Post comment
                </MDBBtn>
                <MDBBtn
                  size="sm"
                  style={{ backgroundColor: "grey", color: "white" }}
                  className="comment-button"
                >
                  Cancel
                </MDBBtn>
              </div>
            </MDBCardFooter>
            <MDBCardBody className="comment-area" ref={commentAreaRef}>
              {existingComments.map((commentObj, index) => (
                <div key={index}>
                  <div>
                    <p className="text-muted small mb-0">
                      Comment Date - {formatDateTime(commentObj.commentDate)}
                    </p>
                  </div>
                  <p className="mt-3 mb-4 pb-2">{commentObj.comment}</p>
                </div>
              ))}

              {comments.map((commentObj, index) => (
                <div key={index}>
                  <div>
                    <p className="text-muted small mb-0">
                      Comment Date - {formatDateTime(commentObj.commentDate)}
                    </p>
                  </div>
                  <p className="mt-3 mb-4 pb-2">{commentObj.comment}</p>
                </div>
              ))}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
