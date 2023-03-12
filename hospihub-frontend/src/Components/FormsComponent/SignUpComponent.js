import './styleForms.css';
function SignUpComponent() {



  return (
    <>
     <div className=" ">
      <img
        className=" imgForm img-fluid d-none d-lg-block position-absolute "
        src="../assetsTemplates/templateForm/images/img.jpg"
        style={{ width: "100%", height: "100%" }}
      />
    

      
      <div className=" container pt-lg-5 pb-lg-5">
        <div className=" styleCard card col-12  col-lg-8 " >
          <div className="card-body">
            <div className="row align-items-center">
              <div className="">
                <div className="text-center my-5">
                  <h3 className="font-weight-bold mb-3">Sign Up</h3>
                  <p className="text-muted">Create a free account now.</p>
                </div>

                <form>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" />

                    </div>

                    <div className="col-md-6">
                      <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" />
                    </div>
                  </div>


                  <div className="form-group">
                    <div className="form-icon-wrapper">
                      <input type="text" className="form-control" id="fullname" placeholder="Enter username" autofocus />
                      <i className="form-icon-left mdi mdi-account " />
                    </div>
                  </div>



                  <div className="row gx-3 mb-3">
                    <div className="col-md-4">
                      <label className="small mb-1" htmlFor="inputOrgName">Date of birth</label>
                      <input className="form-control" id="inputOrgName" type="date" placeholder="Enter your organization name" defaultValue="Start Bootstrap" />
                    </div>
                    <div className="col-md-6 offset-md-1 ">
                      <div className="row gx-3 mt-3">
                      <label className="small mt-3 col-md-3" htmlFor="inputOrgName">Gender:</label>
                      
                      <div className="col-md-4 mt-3">
                        
                        <label style={{ marginRight: "15px", fontSize: "15px" }}> Male </label>
                        <input
                          type="radio"
                          name="gender"
                          value="MALE"

                        />
                      </div>
                      <div  className="col-md-4 mt-3">
                        <label style={{ marginRight: "15px", fontSize: "15px" }} >  Female </label>
                        <input
                          type="radio"
                          name="gender"
                          value="FEMALE"
                        />

                      </div>
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
                  <div className="form-group ">

                    <select className="  form-control bg-light p-2">
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
      </div>


    </>
  );
}

export default SignUpComponent;