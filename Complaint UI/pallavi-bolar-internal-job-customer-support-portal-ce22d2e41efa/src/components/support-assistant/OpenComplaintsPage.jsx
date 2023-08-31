import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import "./SupportDashboard.css";
import { useNavigate } from "react-router-dom";
import ComplaintService from "./ComplaintService";

function OpenComplaintsPage() {
  const navigate = useNavigate();
  const [openComplaints, setOpenComplaints] = useState([]);

  useEffect(() => {
    const fetchOpenComplaints = async () => {
      try {
        const response = await ComplaintService.getOpenComplaints();
        const openComplaints = response.data;
        setOpenComplaints(openComplaints);
      } catch (error) {
        console.error("Error fetching open complaints:", error);
      }
    };

    fetchOpenComplaints();
  }, []);

  const handleEditButtonClick = async (complaintId) => {
    if (complaintId) {
      try {
        const response = await ComplaintService.getComplaintWithEmployeeInfo(
          complaintId
        );
        const complaintData = response.data[0];
        navigate(`/complaint/${complaintId}`, {
          state: { complaint: complaintData },
        });
      } catch (error) {
        console.error("Error fetching complaint details:", error);
      }
    } else {
      console.error("Invalid complaintId:", complaintId);
    }
  };

  return (
    <div>
      <p className="home">Home &gt; Open Complaints</p>
      <MDBTable align="middle" bordered className="custom-table">
        <MDBTableHead>
          <tr>
            <th scope="col">Complaint ID</th>
            <th scope="col">Subject</th>
            <th scope="col">Complaint Date</th>
            <th scope="col">Complaint Status</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {openComplaints.map((complaint) => (
            <tr key={complaint.complaintId}>
              <td>{complaint.complaintId}</td>
              <td>{complaint.subject}</td>
              <td>{complaint.complaintDate}</td>
              <td>{complaint.complaintStatus}</td>
              <td>
                <MDBBtn
                  color="primary"
                  size="sm"
                  onClick={() => handleEditButtonClick(complaint.complaintId)}
                  className="action-button"
                >
                  Edit
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default OpenComplaintsPage;
