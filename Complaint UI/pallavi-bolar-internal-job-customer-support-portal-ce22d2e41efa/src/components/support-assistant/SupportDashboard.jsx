import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import "./SupportDashboard.css";
import { useNavigate } from "react-router-dom";
import ComplaintService from "./ComplaintService";

function SupportDashboard() {
  const navigate = useNavigate();
  const [selectedSearchBy, setSelectedSearchBy] = useState("ID");
  const [searchValue, setSearchValue] = useState("");
  const [openComplaintsCount, setOpenComplaintsCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchButtonStyle, setSearchButtonStyle] = useState({
    width: "120px",
  });

  useEffect(() => {
    ComplaintService.getOpenComplaintsCount()
      .then((response) => {
        setOpenComplaintsCount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching open complaints count:", error);
        console.log("Error response:", error.response);
      });
  }, []);

  const handleSearchByChange = (searchBy) => {
    setSelectedSearchBy(searchBy);

    // Calculate the button width based on the length of the selected option
    const buttonWidth = searchBy === "Customer Name" ? 160 : 120;

    // Update the inline style of the button
    setSearchButtonStyle({ width: `${buttonWidth}px` });
  };

  const handleSearch = () => {
    ComplaintService.searchComplaints(selectedSearchBy, searchValue)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const handleOpenButtonClick = async (complaintId) => {
    if (complaintId) {
      ComplaintService.getComplaintWithEmployeeInfo(complaintId)
        .then((response) => {
          const complaintData = response.data[0];
          navigate(`/complaint/${complaintId}`, {
            state: { complaint: complaintData },
          });
        })
        .catch((error) => {
          console.error("Error fetching complaint details:", error);
        });
    } else {
      console.error("Invalid complaintId:", complaintId);
    }
  };

  const handleViewButtonClick = async () => {
    navigate("/open-complaints");
  };

  return (
    <div>
      <div className="header">
        <span className="colored-text">Axis Bank&nbsp;</span>
        <span className="bold-text">Customer Support Dashboard | </span>
        <span className="colored-text">&nbsp;DilSe Open</span>
      </div>
      <div className="card-container">
        <MDBCard className="w-50">
          <div className="card-content">
            <MDBCardTitle className="card-title">
              {`${openComplaintsCount} Open Complaints`}
            </MDBCardTitle>
            <div className="card-info">
              <button className="card-button" onClick={handleViewButtonClick}>
                View
              </button>
            </div>
          </div>
        </MDBCard>
      </div>

      <div className="search-container">
        <div className="search-components">
          <MDBDropdown className="search-dropdown">
            <MDBDropdownToggle
              className="search-dropdown-toggle"
              style={searchButtonStyle}
            >
              {`Search By ${selectedSearchBy}`}
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-menu-end">
              <MDBDropdownItem
                link
                className="custom-dropdown-item"
                onClick={() => handleSearchByChange("ID")}
              >
                ID
              </MDBDropdownItem>
              {/* <MDBDropdownItem
                link
                className="custom-dropdown-item"
                onClick={() => handleSearchByChange("Date")}
              >
                Date
              </MDBDropdownItem> */}
              <MDBDropdownItem
                link
                className="custom-dropdown-item"
                onClick={() => handleSearchByChange("Customer Name")}
              >
                Name
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>

          <input
            type="text"
            placeholder={`Search by ${selectedSearchBy}`}
            className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <MDBBtn
            color="primary"
            className="search-button"
            onClick={handleSearch}
          >
            Search
          </MDBBtn>
        </div>
      </div>
      <div className="table-container">
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
            {searchResults.map((complaint) => {
              return (
                <tr key={complaint.complaintId}>
                  <td>{complaint.complaintId}</td>
                  <td>{complaint.subject}</td>
                  <td>{complaint.complaintDate}</td>
                  <td>{complaint.complaintStatus}</td>
                  <td>
                    {complaint.complaintStatus !== "CLOSED" && (
                      <MDBBtn
                        color="primary"
                        size="sm"
                        onClick={() =>
                          handleOpenButtonClick(complaint.complaintId)
                        }
                        className="action-button"
                      >
                        Open
                      </MDBBtn>
                    )}
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}

export default SupportDashboard;
