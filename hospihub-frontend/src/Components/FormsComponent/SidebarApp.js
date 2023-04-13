import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { NavLink } from "react-router-dom";
function SidebarApp() {
    const [doctor, setDoctor] = useState({});
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decodedToken = jwt_decode(token);
            axios
                .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
                .then((response) => {
                    setDoctor(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);
    return ( 
        <>
        <div className="col-lg-4" style={{ marginBottom: "40px" }}>
                        <>
                            <div>
                                {/*sidebar start*/}
                                <div className="sidebar  ">
                                    <div className="profile_info">
                                        <img
                                            src="../assetsTemplates/template1/img/testimonial-1.jpg"
                                            className="profile_image"
                                            alt=""
                                        />
                                        <h4 className="title">{doctor.userName}</h4>
                                        <h4 className="title">{`Welcome Back ${doctor.userName} !`}</h4>
                                    </div>

                                    <NavLink
                                        to="/AddWorktime/WorktimeDoc"
                                        className="nav-item nav-link "
                                    >
                                        <i className="far fa-clock"/>
                                        <span>Worktime</span>
                                    </NavLink>
                                    <NavLink
                                        to="/AddWorktime/AppointmentsList"
                                        className="nav-item nav-link "
                                    >
                                        <i className="fas fa-th"/>
                                        <span>Appointments</span>
                                    </NavLink>
                                    <NavLink
                                        to="/UpdateProfile/patientList"
                                        className="nav-item nav-link "
                                    >
                                        <i className="fas fa-user"/>
                                        <span>Patient List</span>
                                    </NavLink>
                                </div>

                                {/*sidebar end*/}
                            </div>
                        </>
                    </div>
        </>
     );
}

export default SidebarApp;