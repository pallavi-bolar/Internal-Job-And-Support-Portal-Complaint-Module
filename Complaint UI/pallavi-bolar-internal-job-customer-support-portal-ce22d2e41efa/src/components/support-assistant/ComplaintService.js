import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8081/";

class ComplaintService {
  async updateComplaintStatus(complaintId, newStatus) {
    try {
      const response = await axios.put(
        `${API_URL}api/support-assistant/complaints/${complaintId}/update-status?status=${newStatus}`,
        null,
        { headers: authHeader() }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getComplaintByComplaintId(complaintId) {
    try {
      const response = await axios.get(
        `${API_URL}api/support-assistant/complaints/${complaintId}`,
        {
          headers: authHeader(),
        }
      );
      console.log("Full API Response:", response); 
      return response.data; 
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async addComment(complaintId, comment) {
    try {
      console.log("Sending request to add comment...");
      console.log("complaintid:", complaintId);
      console.log("comment:", comment);
      console.log("jwt", authHeader());

      const url = `${API_URL}api/support-assistant/complaints/${complaintId}/add-comment?comment=${encodeURIComponent(
        comment
      )}`;

      const response = await axios.put(url, null, { headers: authHeader() });
      console.log("Response received:", response);
      return response;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  }

  getOpenComplaintsCount() {
    return axios.get(`${API_URL}api/support-assistant/open-complaints/count`, {
      headers: authHeader(),
    });
  }

  getOpenComplaints() {
    return axios.get(`${API_URL}api/support-assistant/open-complaints`, {
      headers: authHeader(),
    });
  }

  searchComplaints(searchBy, searchValue) {
    let searchUrl = "";

    if (searchBy === "ID") {
      searchUrl = `${API_URL}api/complaints/employee/${searchValue}`;
    } else if (searchBy === "Customer Name") {
      searchUrl = `${API_URL}api/complaints/employeeByName/${encodeURIComponent(
        searchValue
      )}`;
    }

    return axios.get(searchUrl, { headers: authHeader() });
  }

  getComplaintWithEmployeeInfo(complaintId) {
    const url = `${API_URL}api/support-assistant/complaints-with-employee-info?complaintId=${complaintId}`;
    return axios.get(url, { headers: authHeader() });
  }
}
export default new ComplaintService();
