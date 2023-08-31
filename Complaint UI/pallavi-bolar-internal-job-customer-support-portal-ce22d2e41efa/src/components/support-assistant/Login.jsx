import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const credentials = {
      fullName: username,
      password: password,
    };

    const authenticate = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        "http://localhost:8081/api/employees/getRoleByFullNameAndPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const responseData = await response.text();

      if (response.status === 200) {
        if (responseData === "Invalid credentials") {
          toast.error(`Invalid credentials`, {
            className: "custom-toast",
          });
        } else {
          const role = responseData; 
          // Redirect based on the role
          if (role === "HR") {
            navigate("/hr-dashboard");
          } else if (role === "CUSTOMER_SUPPORT") {
            navigate("/support-dashboard");
          } else if (role === "CANDIDATE") {
            navigate("/candidate-dashboard");
          }

          const authResponse = await fetch(
            "http://localhost:8081/api/authenticate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(authenticate),
            }
          );

          if (authResponse.status === 200) {
            const jwtToken = await authResponse.text();
            // Save JWT token to local storage
            localStorage.setItem("jwtToken", jwtToken);
          } else {
            // Show incorrect credentials message
            toast.error("Incorrect username or password");
          }
        }
      } else if (response.status === 404) {
        // Show user not found message
        toast.error("User not found");
      } else {
        // Show other error message
        toast.error("Error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="header">
        <span className="colored-text">Axis Bank</span>
        <span className="bold-text">&nbsp;|&nbsp;Login </span>
      </div>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden custom-container"
      >
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center custom-text"
          >
            <img
              src="./login-main.webp"
              alt="Login image"
              className="img-fluid"
            />
          </MDBCol>

          <MDBCol md="4">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong custom-shape-1"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong custom-shape-2"
            ></div>

            <MDBCard className="my-6 bg-glass custom-card">
              <MDBCardBody className="p-5">
                <div className="header">
                  <span className="bold-text">Login Form</span>
                </div>
                <br />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  id="form3"
                  type="text"
                  className="custom-input custom-lg-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form4"
                  type="password"
                  className="custom-input custom-lg-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBBtn
                  className="w-100 mb-4 custom-button custom-lg-button"
                  size="lg"
                  onClick={handleLogin}
                >
                  Login
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;
