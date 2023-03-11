function SignUpComponent() {
    return (
      <>
        <img
          className=""
          src="../assetsTemplates/templateForm/images/img.jpg"
          style={{ width: "100%", height: "100%" }}
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
  
                  <form>
                    <div className="form-group d-flex  justify-content-between">
                      <div className="form-icon-wrapper">
                        <input type="text" className="form-control" id="firstName" placeholder="Enter first name" autofocus style={{ width: "120%" }} />
  
                      </div>
                      <div className="form-icon-wrapper mx-5">
                        <input type="text" className="form-control " id="lastName" placeholder="Enter last name" autofocus style={{ width: "120%" }} />
  
                      </div>
                    </div>
  
                    <div className="form-group">
                      <div className="form-icon-wrapper">
                        <input type="text" className="form-control" id="fullname" placeholder="Enter username" autofocus />
                        <i className="form-icon-left mdi mdi-account " />
                      </div>
                    </div>
  
  
                    <label htmlFor="fullname">Date of Birth</label>
                    <div className="form-group  d-flex  justify-content-between">
                      <div className="form-icon-wrapper ">
                        <input type="date" className="form-control " id="email" placeholder="Date of birth" required />
                      </div>
  
  
  
                      <div className="form-icon-wrapper d-flex justify-content-between">
                        <div style={{ marginRight: "50px" }}>
                          <label style={{ marginRight: "15px", fontSize: "15px" }}> Male </label>
                          <input
                            type="radio"
                            name="gender"
                            value="MALE"
  
                          />
                        </div>
                        <div style={{ marginRight: "20px" }}>
                          <label style={{ marginRight: "15px", fontSize: "15px" }} >  Female </label>
                          <input
                            type="radio"
                            name="gender"
                            value="FEMALE"
                          />
  
                        </div>
                      </div>
                    </div>
  
  
                    <div className="form-group">
                      <div className="form-icon-wrapper">
                        <input type="text" className="form-control" id="fullname" placeholder="Enter your address" autofocus />
  
                      </div>
                    </div>
  
  
                    <div className="form-group">
  
                      <div className="form-icon-wrapper ">
                        <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                        <i className="form-icon-left mdi mdi-email" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-icon-wrapper">
                        <input type="password" className="form-control" id="password" placeholder="Enter password" />
                        <i className="form-icon-left mdi mdi-lock" />
  
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password-repeat"></label>
                      <div className="form-icon-wrapper">
                        <input type="password" className="form-control" id="password-repeat" placeholder="Retype password" />
                        <i className="form-icon-left mdi mdi-lock" />
  
  
                      </div>
                    </div>
                    <div className="form-group">
  
                      <select className="  form-control">
                        <option selected>Choose Role</option>
                        <option value={1}>Patient</option>
                        <option value={2}>Doctor </option>
  
                      </select>
  
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox  ">
  
                        <input type="checkbox" className="custom-control-input" id="customCheck1" defaultChecked />
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
                          <a href="sign-in.html">Sign in</a>.
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