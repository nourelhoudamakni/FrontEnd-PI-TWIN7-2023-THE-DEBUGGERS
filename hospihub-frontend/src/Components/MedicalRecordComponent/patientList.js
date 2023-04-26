import { useEffect, useState } from "react";
import SideNavBarComponent from "./SideNavBarComponent";
import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";
import axios from "axios";
import SideNavBarUpdateProfile from "../HomeComponent/sideNavbarUpdateProfile";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  selectReceiver,
  selectUser,
} from "../../Redux/slices/userSelectedSlice";
import SidebarApp from "../FormsComponent/SidebarApp";
function PatientList() {
  const dispatch = useDispatch();
  const [User, setUser] = useState({});
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(token);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .post("http://localhost:5000/doctor/getPatientList", {
        doctorId: decodedToken.id,
      })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const handleClick = async (patient) => {
    dispatch(selectUser(patient.userName));
    dispatch(selectReceiver(patient));
    await axios.post("http://localhost:5000/chat", {
      userId: patient._id,
      userConnectedId: decodedToken.id,
    });
    navigate("/UpdateProfile/chat");
  };
  return (
    <>
      <div className="container  pt-5 pb-5">
        <div className=" row  ">
          <div className="col-lg-4">
            <SidebarApp user={User}></SidebarApp>
          </div>
          <div className="col-lg-8  mb-5">
            <div className="card cardMD cardRes ">
              <div className="card-header ">
                <i className="fas fa-plus-square" /> Patient List
              </div>
              <div className="card-body">
              <Table striped style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem", backgroundColor: "#fff", color: "#212529", fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.5", border: "1px solid #dee2e6", borderRadius: "0.25rem", overflow: "auto" }}>
  <thead style={{ backgroundColor: "#f5f5f5" }}>
    <tr>
      <th
        style={{
          padding: "0.75rem",
          textAlign: "left",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        Patient Name
      </th>
      <th
        style={{
          padding: "0.75rem",
          textAlign: "center",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        Action
      </th>
    </tr>
  </thead>
  <tbody>
    {patients.map((patient, index) => (
      <tr key={index} style={{ ':hover': { backgroundColor: "#f5f5f5" } }}>
        <td
          style={{
            padding: "0.75rem",
            borderBottom: "1px solid #dee2e6",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {patient.userName}
        </td>
        <td
          style={{
            padding: "0.75rem",
            textAlign: "center",
            borderBottom: "1px solid #dee2e6",
          }}
        >
          <button
            onClick={() => handleClick(patient)}
            style={{
              padding: "0.375rem 0.75rem",
              border: "none",
              borderRadius: "0.25rem",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              transition: "all 0.3s ease",
            }}
          >
            <i class="bi bi-chat"></i>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientList;
