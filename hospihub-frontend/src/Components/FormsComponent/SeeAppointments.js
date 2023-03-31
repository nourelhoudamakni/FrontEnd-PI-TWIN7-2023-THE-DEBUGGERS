import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../HomeComponent/sideNavbarUpdateProfile";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import SidebarApp from "./SidebarApp";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

function SeeAppointments() {
    const [doctor, setDoctor] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [patients, setPatients] = useState({});

    const [showValidated, setShowValidated] = useState(false);
    const [showUnvalidated, setShowUnvalidated] = useState(false);
    const [showAll, setShowAll] = useState(true);

    const appointmentsPerPage = 5;
    const pagesVisited = currentPage * appointmentsPerPage;

    const handleValidate = (id) => {
        axios
            .put(`http://localhost:5000/doctor/appointments/${id}/verifie`)
            .then((response) => {
                toast.success(`you have completed an appointment`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                console.log('test');
                setAppointments((prevState) => {
                    const updatedAppointments = prevState.map((appointment) => {
                        if (appointment._id === id) {
                            appointment.isVerified = true; // update the state of the corresponding appointment
                        }
                        return appointment;
                    });
                    return updatedAppointments;
                });
            });
    };

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decodedToken = jwt_decode(token);
            axios
                .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
                .then((response) => {
                    setDoctor(response.data);
                    axios
                        .get(
                            `http://localhost:5000/appointment/getappbydoc/${response.data._id}`
                        )
                        .then((response) => {
                            setAppointments(response.data);
                            const promises = response.data.map((appointment) =>
                                axios.get(`http://localhost:5000/patient/getUserById/${appointment.Patient}`)
                            );
                            Promise.all(promises)
                                .then((responses) => {
                                    const patients = responses.map((response) => response.data);
                                    setPatients(patients);

                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const pageCount = Math.ceil(appointments.length / appointmentsPerPage);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <ToastContainer />
            <div className="container pt-5">
                <div className="row">
                    <div className="col-lg-4">
                        <SidebarApp />
                    </div>
                    <div className="col-lg-8 mb-5">
                        <div className="">
                            {/* Account details card*/}
                            <div className="card cardMD px-5 cardRes">
                                <div className="card-header ">
                                    <i className="fas fa-user-md iconMed" />
                                    doctor {doctor.userName}'s appointments
                                </div>
                                <div className="card-body">
                                    <div className="col-md-1">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="validationOptions"
                                                id="validatedOnly"
                                                checked={showValidated}
                                                onChange={() => {
                                                    setShowValidated(true);
                                                    setShowUnvalidated(false);
                                                    setShowAll(false);
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor="validatedOnly">
                                                Done
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="validationOptions"
                                                id="unvalidatedOnly"
                                                checked={showUnvalidated}
                                                onChange={() => {
                                                    setShowValidated(false);
                                                    setShowUnvalidated(true);
                                                    setShowAll(false);
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor="unvalidatedOnly">
                                                Undone
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="validationOptions"
                                                id="all"
                                                checked={showAll}
                                                onChange={() => {
                                                    setShowValidated(false);
                                                    setShowUnvalidated(false);
                                                    setShowAll(true);
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor="unvalidatedOnly">
                                                All
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex flex-row justify-content-center">
                                        <div className="text-center">
                                            {patients.length !== 0 && (
                                                <table className="table table-bordered table-striped table-hover w-100">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th></th>
                                                            <th>PatientId</th>
                                                            <th>Patient first name</th>
                                                            <th>Patient last name</th>
                                                            <th>Date</th>
                                                            <th>Time</th>
                                                            <th>State</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {appointments
                                                            .filter((appointment) =>
                                                                showValidated && appointment.isVerified
                                                                    ? true
                                                                    : showUnvalidated && !appointment.isVerified
                                                                        ? true
                                                                        : !showValidated && !showUnvalidated
                                                                            ? true
                                                                            : false
                                                            )
                                                            .slice(pagesVisited, pagesVisited + appointmentsPerPage)
                                                            .map((appointment, index) => {
                                                                const patient = patients[index];
                                                                return (
                                                                    <tr key={appointment._id}>
                                                                        <td>
                                                                            <Link to={`/PatientMedicalRecord/${patients[index]?._id}`}>
                                                                                Patient's info
                                                                            </Link>
                                                                        </td>
                                                                        <td>
                                                                            {patient?._id}
                                                                        </td>
                                                                        <td>{patient?.firstName}</td>
                                                                        <td>{patient?.lastName}</td>
                                                                        <td>{moment(appointment.Date).format("MMMM Do YYYY")}</td>
                                                                        <td>{moment(appointment.Date).format("h:mm:ss a")}</td>
                                                                        {!appointment.isVerified ? (
                                                                            <td>
                                                                                <button
                                                                                    className="btn btn-primary"
                                                                                    style={{
                                                                                        width: "60px",
                                                                                        marginBottom: "0px",
                                                                                        marginTop: "0px",
                                                                                    }}
                                                                                    type="button"
                                                                                    onClick={() => handleValidate(appointment._id)}
                                                                                >
                                                                                    Done
                                                                                </button>
                                                                            </td>
                                                                        ) : (
                                                                            <td></td>
                                                                        )}
                                                                    </tr>
                                                                );
                                                            })}
                                                    </tbody>
                                                </table>
                                            )}

                                            <ReactPaginate
                                                previousLabel={<i className="fa fa-chevron-left"></i>}
                                                nextLabel={<i className="fa fa-chevron-right"></i>}
                                                pageCount={pageCount}
                                                onPageChange={changePage}
                                                containerClassName={"pagination justify-content-center"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                activeClassName={"active"}
                                            />




                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}

export default SeeAppointments;
