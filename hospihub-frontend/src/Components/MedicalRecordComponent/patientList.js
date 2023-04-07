import { useEffect, useState } from "react";
import SideNavBarComponent from "./SideNavBarComponent";
import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";
import axios from "axios";
import SideNavBarUpdateProfile from "../HomeComponent/sideNavbarUpdateProfile";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectReceiver, selectUser } from "../../Redux/slices/userSelectedSlice";
function PatientList(){
    const dispatch=useDispatch();
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
          .post("http://localhost:5000/doctor/getPatientList" ,{
            doctorId:decodedToken.id
          })
          .then((response) => {
            setPatients(response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      },[]);
      const handleClick=async(patient)=>{ 
       dispatch(selectUser(patient.userName))
       dispatch(selectReceiver(patient));
       await axios.post("http://localhost:5000/chat",{ 
        userId:patient._id, 
        userConnectedId:decodedToken.id
      })
        navigate('/UpdateProfile/chat')
      }
    return ( <>
     <div className="container  pt-5 pb-5">
        <div className=" row  ">
          <div className="col-lg-4">
            <SideNavBarUpdateProfile user={User}></SideNavBarUpdateProfile>
          </div>
          <div className="col-lg-8  mb-5">
            <div className="card cardMD cardRes ">
              <div className="card-header ">
                <i className="fas fa-plus-square" /> Patient List
              </div>
              <div className="card-body">
                <Table striped>
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.userName}</td>
                        <td><button onClick={()=>handleClick(patient)}>send message</button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </> );
}

export default PatientList;