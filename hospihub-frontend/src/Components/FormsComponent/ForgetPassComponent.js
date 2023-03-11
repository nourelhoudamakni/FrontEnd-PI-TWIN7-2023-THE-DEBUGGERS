function ForgotPasswordComponent() {
    return (
        <div className="">
            <img
                className="img-fluid"
                src="../assetsTemplates/templateForm/images/image.jpg"
                style={{ width: "100%", height: "100%" }}
            />
            <div className="position-absolute top-50 start-50 translate-middle container">
                <div className="card col-lg-4 offset-lg-8 mt-5">
                    <div className="card-body">
                        <div className="row align-items-center">

                            <div className="">
                                <div className="text-center my-5">
                                    <h3 className="font-weight-bold mb-3">Forgot your password</h3>
                                    <p className="text-muted">Request now to get a new password.</p>
                                </div>
                              
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <div className="form-icon-wrapper">
                                            <input type="email" className="form-control" id="email" placeholder="Enter email" autofocus required />
                                            <i className="form-icon-left mdi mdi-email" />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary">Send</button>
                                </form>


                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordComponent;