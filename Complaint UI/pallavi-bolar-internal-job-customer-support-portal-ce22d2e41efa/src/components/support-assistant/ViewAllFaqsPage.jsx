import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";

function ViewAllFaqsPage() {
  const [allFaqs, setAllFaqs] = useState([]);

  useEffect(() => {
    const fetchAllFaqs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/faqs/all-faqs"
        );
        const faqs = response.data;
        setAllFaqs(faqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchAllFaqs();
  }, []);

  return (
    <div>
      <div className="header">
        <span className="colored-text">List: Frequently Asked Questions</span>
      </div>
      <MDBTable align="middle" bordered className="custom-table">
        <MDBTableHead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Question</th>
            <th scope="col">Answer</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {allFaqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.id}</td>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default ViewAllFaqsPage;
