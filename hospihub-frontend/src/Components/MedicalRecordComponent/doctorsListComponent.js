import Table from "react-bootstrap/Table";
import SideNavBarComponent from "./SideNavBarComponent";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { selectReceiver, selectUser } from "../../redux/slices/userSelectedSlice";
import { useNavigate } from "react-router-dom";
function DoctorsListComponent() {
  const [User, setUser] = useState({});
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(token);
  const navigate = useNavigate();
  const dispatch=useDispatch();
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
      .post("http://localhost:5000/patient/getListDoctor" ,{
        patientId:decodedToken.id
      })
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },[]);
  const handleClick=async(doctor)=>{ 
    dispatch(selectUser(doctor.userName));
    dispatch(selectReceiver(doctor));
    await axios.post("http://localhost:5000/chat",{ 
      userId:doctor._id, 
      userConnectedId:decodedToken.id
    })
     navigate('/MedicalRecord/chat');
   }
  return (
    <>
      <div className="container  pt-5 pb-5">
        <div className=" row  ">
          <div className="col-lg-4">
            <SideNavBarComponent user={User}></SideNavBarComponent>
          </div>
          <div className="col-lg-8  mb-5">
            <div className="card cardMD cardRes ">
              <div className="card-header ">
                <i className="fas fa-plus-square" /> Doctors List
              </div>
              <div className="card-body">
                <Table striped>
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor, index) => (
                      <tr key={index}>
                        <td>{doctor.userName}</td>
                        <td><button  onClick={()=>handleClick(doctor)}>send message</button></td>
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

export default DoctorsListComponent;
