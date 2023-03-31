import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../HomeComponent/sideNavbarUpdateProfile';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import SidebarApp from './SidebarApp';


function WorktimeDoc() {
    const [doctor, setDoctor] = useState({});
    const [doctorId, setDoctorId] = useState('');
    const [selectedDates, setSelectedDates] = useState([]);
    const [dates, setDates] = useState([]);

    // Function to handle when a date is selected on the calendar
    const handleDateSelect = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setSelectedDates([...selectedDates, date]);
        setDates([...dates, formattedDate]);
      };
      

    const handleSubmit = () => {
        if (dates.length > 0) {
            axios.put(`http://localhost:5000/appointment/addApp/${doctorId}`, {
                "WorkTime": dates
            }).then((response) => {
                toast.success(`Worktime added for doctor ${response.data.userName}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }).catch((error) => {
                toast.error(`An error occurred while adding worktime: ${error.response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
        }
        else {
            toast.warning(`Please select worktime`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }
    

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decodedToken = jwt_decode(token);
            axios
                .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
                .then((response) => {
                    setDoctor(response.data);
                    setDoctorId(response.data._id);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);




    return (
        <>
            <ToastContainer />
            <div className="container pt-5  ">
                <div className=" row  ">
                    <SidebarApp></SidebarApp>
                    <div className="col-lg-8  mb-5">
                        <div className="  ">
                            {/* Account details card*/}
                            <div className="card cardMD px-5 cardRes">
                                <div className="card-header ">
                                    <i className="fas fa-user-md iconMed" />
                                    Add your worktime Mr {doctor.userName}
                                </div>
                                <div className="card-body">
                                    <div className="form-group d-flex flex-row">
                                        <div style={{ width: "50%" }} className="offset-md-1">
                                            <label htmlFor="worktime">Select worktime dates:</label>
                                            <Calendar
                                                onChange={handleDateSelect}
                                                value={selectedDates}
                                                minDate={new Date()}
                                            />
                                        </div>
                                        <div style={{ width: "50%", marginLeft: "50px" }}>
                                            {selectedDates.length > 0 && (
                                                <>
                                                    <label>Selected dates:</label>
                                                    <ul>
                                                        {selectedDates.map((date, index) => (
                                                            <li key={index}>{date.toLocaleDateString()}</li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary offset-md-7"
                                    style={{ width: "180px", marginBottom: "30px", marginTop: "0px" }}
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Save worktime
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WorktimeDoc;