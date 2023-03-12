import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [secret, setSecret] = useState("");
  const [errorEmailMessage, setEmailErrorMessage] = useState(false);
  const [errorPasswordMessage, setPasswordErrorMessage] = useState(false);
  const [errorSecretMessage, setSecretErrorMessage] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();

    // envoyer une requête POST à la fonction backend avec les paramètres email et password
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
        secret:secret,
      })
      .then((response) => {
        Cookies.set("jwt", response.data.token);
        const jwtCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("jwt="));
        if (jwtCookie) {
          const jwtToken = jwtCookie.split("=")[1];
          const decodedToken = jwt_decode(jwtToken);
          const id = decodedToken.id;
          axios
            .get(`http://localhost:5000/patient/getUserById/${id}`)
            .then((response) => {
              if (response.data.secret) {
                setShow(true);
                if (secret == response.data.secret) {
                  localStorage.setItem("jwtToken", jwtToken);
                } else {
                  
                  setEmailErrorMessage(false);
                  setPasswordErrorMessage(false);
                }
              } else {
                setShow(false);
                localStorage.setItem("jwtToken", jwtToken);
              }
            });
        }
      })
      .catch((error) => {
        if(error.response.data['message']){ 
          setSecretErrorMessage(true);
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
        }
        if(error.response.data.errors.email){ 
          setEmailErrorMessage(true);          
        }
        if (error.response.data.errors.password){ 
          setEmailErrorMessage(false);
          setPasswordErrorMessage(true);
          setSecretErrorMessage(false);
        }
        
        
       
      });
  };

  return (
    <div className="">
      
      <img
        className="img-fluid"
        src="../assetsTemplates/templateForm/images/img.jpg"
        style={{ width: "100%", height: "100%" }}
        alt=""
      />
      <div className="position-absolute top-50 start-50 translate-middle container">
        <div className="card col-lg-5 offset-lg-7">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="">
        
                <div className="text-center my-5">
                  <h3 className="font-weight-bold mb-3">Sign In</h3>
                  <p className="text-muted">Sign in to Latform to continue</p>
                </div>
                <div className="text-center d-none d-lg-inline">
                  <p>
                    Don't have an account?
                    <NavLink to="/SignUp">Create a free account</NavLink>.
                  </p>
                </div>
                <div className="social-links justify-content-center">
                  <a href="#" className="bg-google">
                    <i className="mdi mdi-google" /> Connect with Google
                  </a>
                </div>
                <div className="text-divider">or sign in with email</div>
                <form onSubmit={handleSignIn}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="form-icon-wrapper">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <i className="form-icon-left mdi mdi-email" />
                    </div>
                  </div>

                 {errorEmailMessage && 
                 <Alert className="form-group" variant="danger" style={{marginTop:"-13px"}}>
                    <div className="form-icon-wrapper  text-danger" style={{marginTop:"-11px",marginBottom:"-13px"}}>email is not used</div>
                  </Alert>} 

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="form-icon-wrapper">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i className="form-icon-left mdi mdi-lock" />
                    </div>
                  </div>
                  
                  {errorPasswordMessage && 
                 <Alert className="form-group" variant="danger" style={{marginTop:"-13px"}}>
                    <div className="form-icon-wrapper  text-danger" style={{marginTop:"-11px",marginBottom:"-13px"}}>incorrect password</div>
                  </Alert>} 

                  {show && (
                    <div className="form-group">
                      <label htmlFor="password">Secret</label>
                      <div className="form-icon-wrapper">
                        <input
                          type="Secret"
                          className="form-control"
                          id="password"
                          placeholder="Enter secret code"
                          required
                          value={secret}
                          onChange={(e) => setSecret(e.target.value)}
                        />
                        <i className="form-icon-left mdi mdi-lock" />
                      </div>
                    </div>
                  )}
                    {errorSecretMessage && 
                 <Alert className="form-group" variant="danger" style={{marginTop:"-13px"}}>
                    <div className="form-icon-wrapper  text-danger" style={{marginTop:"-11px",marginBottom:"-13px"}}>incorrect Secret</div>
                  </Alert>} 


                  <div className="form-group">
                    <div className="d-md-flex justify-content-between align-items-center">
                      <button className="btn btn-primary">Sign In</button>
                      <div className="mt-3 mt-md-0">
                        <NavLink to="/ForgetPassword">
                          I forgot my password!
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInComponent;
