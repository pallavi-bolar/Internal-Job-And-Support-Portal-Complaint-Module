import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBTypography,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ComplaintService from "./ComplaintService";
import CommentCard from "./CommentCard";
import "./ComplaintDetailsCard.css";
import "./Toast.css";

function ComplaintDetailsCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { complaint } = location.state || {};
  const [comments, setComments] = useState([]);

  const [currentStatus, setCurrentStatus] = useState(
    complaint?.complaintStatus
  );

  useEffect(() => {
    if (complaint) {
      fetchComments(complaint.complaintId);
    }
  }, [complaint]);

  const fetchComments = async (complaintId) => {
    try {
      const response = await ComplaintService.getComplaintByComplaintId(
        complaintId
      );
      console.log("Full Response:", response);
      console.log("response status:", response.status);

      console.log("Fetched comments:", response.comments);

      const mappedComments = response.comments.map((comment, index) => ({
        comment: comment,
        commentDate: response.commentDates[index],
      }));

      setComments(mappedComments);
      console.log("mappedc:", mappedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await ComplaintService.updateComplaintStatus(
        complaint.complaintId,
        newStatus
      );

      if (response.status === 200) {
        setCurrentStatus(newStatus);
        toast.success(`Status Changed to ${newStatus}`, {
          className: "custom-toast",
        });
        navigate("/support-dashboard");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!complaint) {
    return <div>Loading...</div>;
  }

  console.log("comments passed to CommentCard:", comments);
  return (
    <div className="center-card">
      <MDBCard className="custom-card">
        <MDBCardHeader className="custom-header">
          {`Complaint ID - ${complaint.complaintId}: ${complaint.subject}`}
          <MDBDropdown group className="float-end">
            <MDBDropdownToggle className="action-button">
              Set Status
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-menu-end">
              <MDBDropdownItem
                link
                className="custom-dropdown-item"
                onClick={() => updateStatus("UNDER_REVIEW")}
              >
                UNDER REVIEW
              </MDBDropdownItem>
              <MDBDropdownItem
                link
                className="custom-dropdown-item"
                onClick={() => updateStatus("RESOLVED")}
              >
                RESOLVED
              </MDBDropdownItem>
              <MDBDropdownItem
                link
                className="custom-dropdown-item"
                onClick={() => updateStatus("CLOSED")}
              >
                CLOSED
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBCardHeader>
        <MDBCardBody className="custom-body">
          <MDBTypography blockquote className="custom-typography">
            <p>{`Employee ID: ${complaint.employeeId}`}</p>
            <p>{`Employee Name: ${complaint.fullName}`}</p>
            <p>{`Email ID: ${complaint.emailId}`}</p>
            <p>{`Gender: ${complaint.gender}`}</p>
            <p>{`Phone Number: ${complaint.phoneNo}`}</p>=
            <p>{`Complaint Status: ${currentStatus}`}</p>
            <p>{`Complaint Date: ${new Date(
              complaint.complaintDate
            ).toLocaleString()}`}</p>
          </MDBTypography>

          <CommentCard
            complaintId={complaint.complaintId}
            existingComments={comments}
          />
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default ComplaintDetailsCard;
