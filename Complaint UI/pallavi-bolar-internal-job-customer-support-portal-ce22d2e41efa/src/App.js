import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Faqs from "./components/support-assistant/Faqs";
import Login from "./components/support-assistant/Login";
import SupportDashboard from "./components/support-assistant/SupportDashboard";
import ComplaintDetailsCard from "./components/support-assistant/ComplaintDetailsCard";
import OpenComplaintsPage from "./components/support-assistant/OpenComplaintsPage";
import ViewAllFaqsPage from "./components/support-assistant/ViewAllFaqsPage";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/support-dashboard" element={<SupportDashboard />} />
          <Route path="/complaint/:id" element={<ComplaintDetailsCard />} />
          <Route path="/open-complaints" element={<OpenComplaintsPage />} />
          <Route path="/create-faq" element={<Faqs />} />
          <Route path="/view-all-faqs" element={<ViewAllFaqsPage />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
