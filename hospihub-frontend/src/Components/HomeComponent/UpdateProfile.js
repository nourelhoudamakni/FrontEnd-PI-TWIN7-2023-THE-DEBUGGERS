import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "react-bootstrap/Alert";
import { Button, Modal } from "react-bootstrap";

function UpdateProfile() {
  const [User, setUser] = useState({});
  const [opt, setopt] = useState({});
  const [incorrectCode, setincorrectCode] = useState(false);
  const [greatCode, setgrearCode] = useState(false);
  const [MedicalRecord, setMedicalRecord] = useState({});
  const [UsernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [LastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [PhoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //onBlur={() =>setPhoneNumberErrorMessage(!/^\d{8}$/.test(User.phoneNumber)) } required
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      axios
        .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .get(
          `http://localhost:5000/MedicalRecord/findMedicalRecordById/${User.MedicalRecord}`
        )
        .then((response) => {
          setMedicalRecord(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  /////mettre le birthdate sous formr yyyy-mm-jj pour l'afficher
  const date = new Date(User.dateOfBirth); // récupération de la date actuelle
  const year = date.getFullYear(); // récupération de l'année
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // récupération du mois avec padding à zéro
  const day = ("0" + date.getDate()).slice(-2); // récupération du jour avec padding à zéro
  const formattedDate = `${year}-${month}-${day}`; // concaténation de la date formatée

  const onValueChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
    setMedicalRecord({ ...MedicalRecord, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (
      !/^[a-zA-Z\s]+$/.test(User.firstName) ||
      !/^[a-zA-Z\s]+$/.test(User.lastName)
    ) {
      setLastNameErrorMessage(true);
      return;
    }
    if (!/^[a-zA-Z0-9]{3,}$/.test(User.userName)) {
      setUsernameErrorMessage(true);
      return;
    }
    // if (!/^\d{8}$/.test(User.phoneNumber)) {
    //   setPhoneNumberErrorMessage(true);
    //   return;
    // }
    
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      axios
        .put(
          `http://localhost:5000/patient/updatePatient/${decodedToken.id}`,
          User
        )
        .then((response) => {
          console.log(response.data);
          console.log("user updated suuccessfully");
        });
      axios
        .put(
          `http://localhost:5000/MedicalRecord/update/${User.MedicalRecord}`,
          MedicalRecord
        )
        .then((response) => {
          console.log(response.data);
          console.log("medical record updated suuccessfully");
          toast.success("Profile updated successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };
  const handleVerifMobile = () => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwt_decode(token);
    const id =decodedToken.id;
  
    
    axios
    .post(
      `http://localhost:5000/patient/verifSms/${id}`,{codeEnter:opt})
      .then((response) => {setgrearCode(true); setincorrectCode(false);}) 
      
      .catch((error) => {
        if (error.response.data['error']) {
            setincorrectCode(true);
            setgrearCode(false)
            setTimeout(() => {
              setincorrectCode(false);
              setgrearCode(false)
            }, 3000); // 3 seconds
          }
    })
    ;
    

  };
  const handleSentCode=()=>{
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwt_decode(token);
    const id =decodedToken.id;
    console.log(User.phoneNumber)
    const phone=User.phoneNumber
    axios
    .post(
      `http://localhost:5000/patient/sendSms/${id}`,{phone:phone}
      
    )
    ;
    
  }

  return (
    <>
      <ToastContainer />
      <div className=" row gx-3 mt-5 offset-xl-4">
        {/* Account details card*/}
        <div className="card cardMD mb-4 col-xl-6 px-5 ">
          <div className="card-header ">
            <i className="fas fa-user-md iconMed" />
            Update profile {User.userName}
          </div>
          <div className="card-body">
            <form>
              {/* Form Group (username)*/}
              <div className="mb-3">
                <label className="small mb-1" htmlFor="inputUsername">
                  Username (how your name will appear to other users on the
                  Website)
                </label>
                <input
                  className="form-control"
                  id="inputUsername"
                  type="text"
                  placeholder="Enter your username"
                  name="userName"
                  value={User.userName}
                  onChange={(e) => onValueChange(e)}
                  onBlur={() =>
                    setUsernameErrorMessage(
                      !/^[a-zA-Z0-9]{3,}$/.test(User.userName)
                    )
                  }
                  required
                />
              </div>
              {UsernameErrorMessage && (
                <Alert
                  className="form-group"
                  variant="danger"
                  style={{ marginTop: "-13px" }}
                >
                  <div
                    className="form-icon-wrapper  text-danger"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                  >
                    Username must contain at least 3 characters and should not
                    contain special characters
                  </div>
                </Alert>
              )}
              {/* Form Row*/}
              <div className="row gx-3 mb-3">
                {/* Form Group (first name)*/}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputFirstName">
                    First name
                  </label>
                  <input
                    className="form-control"
                    id="inputFirstName"
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={User.firstName}
                    onChange={(e) => onValueChange(e)}
                    onBlur={() =>
                      setLastNameErrorMessage(
                        !/^[a-zA-Z\s]+$/.test(User.firstName) ||
                          !/^[a-zA-Z\s]+$/.test(User.lastName)
                      )
                    }
                    required
                  />
                </div>
                {/* Form Group (last name)*/}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputLastName">
                    Last name
                  </label>
                  <input
                    className="form-control"
                    id="inputLastName"
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={User.lastName}
                    onChange={(e) => onValueChange(e)}
                    onBlur={() =>
                      setLastNameErrorMessage(
                        !/^[a-zA-Z\s]+$/.test(User.firstName) ||
                          !/^[a-zA-Z\s]+$/.test(User.lastName)
                      )
                    }
                    required
                  />
                </div>
              </div>
              {LastNameErrorMessage && (
                <Alert
                  className="form-group"
                  variant="danger"
                  style={{ marginTop: "-13px" }}
                >
                  <div
                    className="form-icon-wrapper  text-danger"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                  >
                    First name and Last name should only contains alphabetical
                    characters.
                  </div>
                </Alert>
              )}
              <div className="row gx-3 mb-3">
                <div className="col-md-4">
                  <label className="small mb-1" htmlFor="inputDateofbirth">
                    Date of birth
                  </label>
                  <input
                  style={{width:"140px"}}
                    className="form-control"
                    id="inputDateofbirth"
                    type="date"
                    name="dateOfBirth"
                    placeholder="Enter your Date of birth "
                    value={formattedDate}
                    onChange={(e) => onValueChange(e)}
                  />
                </div>
              </div>

              {/* Form Group (email address)*/}
              <div className="mb-3">
                <label className="small mb-1" htmlFor="inputEmailAddress">
                  Email address
                </label>
                <input
                  className="form-control"
                  id="inputEmailAddress"
                  type="email"
                  placeholder="Enter your email address"
                  defaultValue="name@example.com"
                  name="email"
                  value={User.email}
                  onChange={(e) => onValueChange(e)}
                />
              </div>

              {/* Form Row*/}
              <div className="row gx-3 mb-3">
                {/* Form Group (phone number)*/}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPhone">
                    Phone number
                  </label>
                  <input
                  style={{width:"180px"}}
                    className="form-control"
                    id="inputPhone"
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    value={User.phoneNumber}
                    onChange={(e) => onValueChange(e)}
                    onBlur={() =>
                      setPhoneNumberErrorMessage(
                        !/^\d{8}$/.test(User.phoneNumber)
                      )
                    }
                    required
                  />
                  <button
                    className="btn btn-secondary mt-2"
                    type="button"
                    style={{ width: "180px" }}
                    onClick={() => {
                      handleShow();
                      handleSentCode();
                    }}
                  >
                    Verif your Number !
                  </button>
                </div>
              </div>
              

              {/* Save changes button*/}
              <button
                className="btn btn-primary ml-0 mt-3"
                style={{ width: "180px" }}
                type="button"
                onClick={handleUpdateProfile}
              >
                Save changes
              </button>
            </form>

            <>
            {(show &&   <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Verify Phone</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img
                    className="img-fluid "
                    style={{ width: "100px" }}
                    src="assetsTemplates/images/mobile.jpg"
                    alt="First slide"
                  />
                  code is sent to your phone number !
                  <input
                    className="form-control mt-3 "
                    id="inputPhone"
                    type="text"
                    placeholder="Enter the opt here"
                    name="opt"
                    onChange={(e) => setopt(e.target.value)}
                  />
                    <br></br>
                  {greatCode && (
                <Alert
                  className="form-group"
                  variant="success"
                  style={{ marginTop: "-13px" }}
                >
                  <div
                    className="form-icon-wrapper  text-success"
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                  >
                   Phone Number Updated !
                   
                  </div>
                </Alert>)}
                <br></br>
                {incorrectCode && (
                <Alert
                  className="form-group"
                  variant="danger"
                  style={{ marginTop: "-13px" }}
                >
                  <div
                    className="form-icon-wrapper  text-danger "
                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                  >
                   Incorrect code !
                 
                  </div>
                </Alert>)}
                

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleVerifMobile}>
                    verif
                  </Button>
                </Modal.Footer>
              </Modal>)} 
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
