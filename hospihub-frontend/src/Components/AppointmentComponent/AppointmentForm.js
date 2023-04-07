import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { ToastContainer } from 'react-toastify';
import Alert from 'react-bootstrap/Alert';

function AppointmentForm() {
  const [hospitals, setHospitals] = useState([]);
  const [hospitalServices, setHospitalServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    async function fetchHospitals() {
      const response = await axios.get('http://localhost:5000/patient/hospitals');
      setHospitals(response.data);
    }
    fetchHospitals();
    console.log(decodedToken.id)
  }, []);

  async function handleHospitalChange(event) {
    const hospitalId = event.target.value;

    const response = await axios.get(`http://localhost:5000/patient/services/${hospitalId}`);
    setHospitalServices(response.data);
  }

  async function handleHospitalServiceChange(event) {
    const hospitaServicelId = event.target.value;

    const response = await axios.get(`http://localhost:5000/patient/appointments/${hospitaServicelId}`);
    setAppointments(response.data);
  }

  async function handleAppointmentSelect(event) {
    setSelectedAppointment(event.target.value);
  }

  async function handleTakeAppointment() {
    try {
      const res = await axios.put(`http://localhost:5000/patient/appointments/${selectedAppointment}/take`, {
        patientId: decodedToken.id
      });
      setMessage(res.data.message);
      setError(false);
    } catch (err) {
      setMessage('');
      setError(true);
      console.error(err);
    }
    // show success message or redirect to another page
  }

  return (
    <div className="">
      <img
        className=" imgForm img-fluid d-none d-lg-block position-absolute "
        src="../assetsTemplates/templateForm/images/img2.jpg"
        style={{ width: "100%", height: "100%" }}
      />'
      <ToastContainer />
      <div className="pb-5">
        <div className=" container pt-lg-5 pb-lg-5 ">
          <div className="  card col-12  col-lg-5  offset-lg-7 " >
            <div className="card-body styleCard">
              <div className="row align-items-center">
                <div className="">
                  <div className="text-center my-5">
                    <h3 className="font-weight-bold mb-3">Take Appointment</h3>
                  </div>
                  <div class="container">
                    <div class="row">
                      <div class="col-md-6">
                        <label class="form-label" for="hospital-select">Choose a hospital:</label>
                        <select class="form-select" id="hospital-select" onChange={handleHospitalChange}>
                          <option value="">Select a hospital</option>
                          {hospitals.map(hospital => (
                            <option key={hospital._id} value={hospital._id}>
                              {hospital.HospitalName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label class="form-label" for="service-select">Choose a service:</label>
                        <select class="form-select" id="service-select" onChange={handleHospitalServiceChange}>
                          <option value="">Select a service</option>
                          {hospitalServices.map(service => (
                            <option key={service._id} value={service._id}>
                              {service.ServiceName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label class="form-label" for="appointment-select">Choose an appointment:</label>
                        <select class="form-select" id="appointment-select" onChange={handleAppointmentSelect}>
                          <option value="">Select an appointment</option>
                          {appointments.map(appointment => (
                            <option key={appointment._id} value={appointment._id}>
                              {appointment.Titre}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <button class="btn btn-primary mt-4" onClick={handleTakeAppointment}>Take Appointment</button>
                      </div>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      {error ? (
                        <Alert variant="danger" onClose={() => setError(false)} dismissible>
                          Error taking appointment
                        </Alert>
                      ) : (
                        <div style={{ marginTop: '10px' }}>
                          {message && (
                            <Alert variant="success" onClose={() => setMessage('')} dismissible>
                              {message}
                            </Alert>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;