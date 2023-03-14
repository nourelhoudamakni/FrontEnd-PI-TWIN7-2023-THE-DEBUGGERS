import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";

function SignUpComponent() {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [role, setRole] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enableTwoFactorAuth, setEnableTwoFactorAuth] = useState(false);
  const navigate = useNavigate();
  const [EmailerrorMessage, setEmailErrorMessage] = useState(false);
  const [PasswordErrorMessage, setPasswordErrorMessage] = useState('');
  const [PasswordErrorMessage1, setPasswordErrorMessage1] = useState('');
  const [EmailerrorMessage1, setEmailErrorMessage1] = useState('');
  const [UsernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [LastNameErrorMessage, setLastNameErrorMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName)) {
      setLastNameErrorMessage(true);
      return;
    }
    if (!/^[a-zA-Z0-9]{3,}$/.test(userName)) {
      setUsernameErrorMessage(true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErrorMessage1(true);
      return;
    }
   
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)) {
      setPasswordErrorMessage1(true);
      return;
    }
    
    if (password !== confirmPassword) {
      setPasswordErrorMessage(true);
      return;
    }
    

    try {
      axios.post('http://localhost:5000/signup/', {
        userName:userName,
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        address:address,
        email:email,
        password:password,
        dateOfBirth:dateOfBirth,
        role:role,
        confirmPassword:confirmPassword,
        enableTwoFactorAuth:enableTwoFactorAuth
      }).then(
        (response)=>{
          console.log(response);
          if (response.data.message === 'User already exists!') {
            setEmailErrorMessage(true);
            return;
          }
          navigate('/EmailVerifiaction');
        }
      )
      console.log(userName)
    } catch (error) { 
      
    }
  };

  

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    console.log(event.target.value);
  };
    return (
      <>
        <img
          className=""
          src="../assetsTemplates/templateForm/images/img.jpg"
          style={{ width: "100%", height: "100%" }} alt=""
        />
        <div className="position-absolute top-50 start-50 translate-middle container">
          <div className="card col-12 col-lg-6 offset-lg-7 pt-5">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="">
                  <div className="text-center my-5">
                    <h3 className="font-weight-bold mb-3">Sign Up</h3>
                    <p className="text-muted">Create a free account now.</p>
                  </div>
  
                  <form onSubmit={handleSubmit}>
                    <div className="form-group d-flex  justify-content-between">
                      <div className="form-icon-wrapper">
                        <input type="text" className="form-control" id="firstName" placeholder="Enter first name"  style={{ width: "120%" }} value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={() =>setLastNameErrorMessage(!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName))} required/>
  
                      </div>
                
                      <div className="form-icon-wrapper mx-5">
                        <input type="text" className="form-control " id="lastName" placeholder="Enter last name"  style={{ width: "120%" }} value={lastName} onChange={(e) => setLastName(e.target.value) } onBlur={() =>setLastNameErrorMessage(!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName))} required/>
  
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
                       First name and Last name should only contains alphabetical characters.
                      </div>
                    </Alert>
                  )}
  
                    <div className="form-group">
                      <div className="form-icon-wrapper">
                        <input type="text" className="form-control" id="fullname" placeholder="Enter username"  value={userName} onChange={(e) => setUserName(e.target.value)} onBlur={() =>setUsernameErrorMessage(!/^[a-zA-Z0-9]{3,}$/.test(userName)) } required/>
                        <i className="form-icon-left mdi mdi-account " />
                      </div>
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
                       Username must contain at least 3 characters and should not contain special characters
                      </div>
                    </Alert>
                  )}
  
                    <label htmlFor="fullname">Date of Birth</label>
                    <div className="form-group  d-flex  justify-content-between">
                      <div className="form-icon-wrapper ">
                        <input type="date" className="form-control " id="email" placeholder="Date of birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                      </div>
  
  
  
                      <div className="form-icon-wrapper d-flex justify-content-between">
                        <div style={{ marginRight: "50px" }}>
                          <label style={{ marginRight: "15px", fontSize: "15px" }}> Male </label>
                          <input
                            type="radio"
                            name="gender"
                            value="MALE"
                            checked={gender === "MALE"}
                            onChange={(e) => setGender(e.target.value)}
                            />

                        </div>
                        <div style={{ marginRight: "20px" }}>
                          <label style={{ marginRight: "15px", fontSize: "15px" }} >  Female </label>
                          <input
                            type="radio"
                            name="gender"
                            value="FEMALE"
                            checked={gender === "FEMALE"}
                            onChange={(e) => setGender(e.target.value)}
                          />
  
                        </div>
                      </div>
                    </div>
  
  
                    <div className="form-group">
                      <div className="form-icon-wrapper">
                        <input type="text" className="form-control" id="fullname" placeholder="Enter your address"  value={address} onChange={(e) => setAddress(e.target.value)} required/>
  
                      </div>
                    </div>
  
  
                    <div className="form-group">
  
                      <div className="form-icon-wrapper ">
                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => { setEmailErrorMessage1(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)); setEmailErrorMessage(false) ; }} required />
                        <i className="form-icon-left mdi mdi-email" />
                      </div>
                      {EmailerrorMessage1 && (
                    <Alert
                      className="form-group"
                      variant="danger"
                      style={{ marginTop: "6px" }}
                    >
                      <div
                        className="form-icon-wrapper  text-danger"
                        style={{ marginTop: "-11px", marginBottom: "-13px" }}
                      >
                        please enter a valid email
                      </div>
                    </Alert>
                  )}
                      {EmailerrorMessage && (
                    <Alert
                      className="form-group"
                      variant="danger"
                      style={{ marginTop: "6px" }}
                    >
                      <div
                        className="form-icon-wrapper  text-danger"
                        style={{ marginTop: "-11px", marginBottom: "-13px" }}
                      >
                        email is already used
                      </div>
                    </Alert>
                  )}
                    </div>
                    <div className="form-group">
                      <div className="form-icon-wrapper">
                        <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() =>setPasswordErrorMessage1(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password))} required/>
                        <i className="form-icon-left mdi mdi-lock" />
  
                      </div>
                    </div>
                    {PasswordErrorMessage1 && (
                    <Alert
                      className="form-group"
                      variant="danger"
                      style={{ marginTop: "-13px" }}
                    >
                      <div
                        className="form-icon-wrapper  text-danger"
                        style={{ marginTop: "-11px", marginBottom: "-13px" }}
                      >
                       Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.
                      </div>
                    </Alert>
                  )}
                    <div className="form-group">
                      <label htmlFor="password-repeat"></label>
                      <div className="form-icon-wrapper">
                        <input type="password" className="form-control" id="password-repeat" placeholder="Retype password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={() =>setPasswordErrorMessage(password !== confirmPassword) } required/>
                        <i className="form-icon-left mdi mdi-lock" />

                      </div>
                    </div>
                    {PasswordErrorMessage && (
                    <Alert
                      className="form-group"
                      variant="danger"
                      style={{ marginTop: "-13px" }}
                    >
                      <div
                        className="form-icon-wrapper  text-danger"
                        style={{ marginTop: "-11px", marginBottom: "-13px" }}
                      >
                       Passwords do not match. Please try again
                      </div>
                    </Alert>
                  )}
                    <div className="form-group">
  
                      <select className="  form-control" onChange={handleRoleChange}>
                        <option value="">Choose Role</option>
                        <option value="patient">patient</option>
                        <option value="doctor">doctor </option>
  
                      </select>
  
                    </div>

                    {/* {role == 'doctor' && <div className="form-group">
                      <select className="  form-control" onChange={handleHospitalChange}>
                        <option value="">Choose Hospital</option>
                        {Hospitals.map((h)=>{
                          return<option value={h.HospitalName}>{h.HospitalName}</option>
                        })}
                      </select>
                    </div>
                    } */}


                    <div className="form-group">
                      <div className="custom-control custom-checkbox  ">
  
                        <input type="checkbox" className="custom-control-input" id="customCheck1"  checked={enableTwoFactorAuth} onChange={(e) => setEnableTwoFactorAuth(e.target.checked)}/>
                        <label className="custom-control-label px-5" htmlFor="customCheck1">Enable Two Factor Authentication</label>
                      </div>
                    </div>
  
                    <div className="d-flex  justify-content-between ">
  
                      <div>
                       
                        <button className="btn btn-primary ">Sign Up</button>
                       
                      </div>
  
                      <div className="d-none d-lg-inline ">
                        <p className="mt-2">
                          Do you already have an account?
                          <Link to='/signIn'>Sign in</Link>.
                        </p>
                      </div>
                    </div>
  
                  </form>
  
                </div>
              </div>
            </div>
          </div>
        </div>
  
  
      </>
    );
  }
  
  export default SignUpComponent;