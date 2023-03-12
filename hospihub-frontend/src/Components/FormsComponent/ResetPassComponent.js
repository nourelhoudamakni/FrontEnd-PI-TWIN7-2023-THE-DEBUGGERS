
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ResetPasswordComponent() {
    const { token } = useParams(); 
 
      const [password, setPassword] = useState('');
      const handleResetPassword = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/reset-password/${token}`,{password:password}).then()
      }
  return (
    <div className="">
      <img
        className="img-fluid"
        src="../assetsTemplates/templateForm/images/image.jpg"
        style={{ width: "100%", height: "100%" }}
        alt=""
      />
      <div className="position-absolute top-50 start-50 translate-middle container">
        <div className="card col-lg-4 offset-lg-8 px-5 mt-5">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="">
                <div className="text-center my-5">
                  <h3 className="font-weight-bold mb-3">Change Password</h3>
                  <p className="text-muted">Change your password to log in.</p>
                </div>

                <form onSubmit={handleResetPassword}>
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

                  <div className="form-group">       
                    <button className="btn btn-primary">Change Password</button>
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

export default ResetPasswordComponent;
