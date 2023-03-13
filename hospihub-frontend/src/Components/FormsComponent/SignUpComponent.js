import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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



  const handleSubmit = (e) => {
    e.preventDefault();
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
          navigate('/EmailVerifiaction');
        }
      )
      console.log(userName)
    } catch (error) {
      console.log();
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
                        <input type="text" className="form-control" id="firstName" placeholder="Enter first name"  style={{ width: "120%" }} value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
  
                      </div>
                      <div className="form-icon-wrapper mx-5">
                        <input type="text" className="form-control " id="lastName" placeholder="Enter last name"  style={{ width: "120%" }} value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
  
                      </div>
                    </div>
  
                    <div className="form-group">
                      <div className="form-icon-wrapper">
                        <input type="text" className="form-control" id="fullname" placeholder="Enter username"  value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                        <i className="form-icon-left mdi mdi-account " />
                      </div>
                    </div>
  
  
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
                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <i className="form-icon-left mdi mdi-email" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-icon-wrapper">
                        <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <i className="form-icon-left mdi mdi-lock" />
  
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password-repeat"></label>
                      <div className="form-icon-wrapper">
                        <input type="password" className="form-control" id="password-repeat" placeholder="Retype password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        <i className="form-icon-left mdi mdi-lock" />
  
  
                      </div>
                    </div>
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
  
                        <input type="checkbox" className="custom-control-input" id="customCheck1"  checked={enableTwoFactorAuth} onChange={(e) => setEnableTwoFactorAuth(e.target.value)}/>
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