function ResetPasswordComponent() {
    return (
        <div className="">
            <img
                className="img-fluid"
                src="../assetsTemplates/templateForm/images/image.jpg"
                style={{ width: "100%", height: "100%" }}
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


                                <form>
                                    <div className="form-group">
                                        <label htmlFor="password">New password</label>
                                        <div className="form-icon-wrapper">
                                            <input type="password" className="form-control" id="password" placeholder="Enter password" autofocus required />
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