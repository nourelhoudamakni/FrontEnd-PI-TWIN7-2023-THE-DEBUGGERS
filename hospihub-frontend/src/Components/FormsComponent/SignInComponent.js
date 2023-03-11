function SignInComponent() {
    return (
        <div className="">
            <img
                className="img-fluid"
                src="../assetsTemplates/templateForm/images/img.jpg"
                style={{ width: "100%", height: "100%" }}
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
                                        <a href="sign-up.html">Create a free account</a>.
                                    </p>
                                </div>
                                <div className="social-links justify-content-center">
                                    <a href="#" className="bg-google">
                                        <i className="mdi mdi-google" /> Connect with Google
                                    </a>

                                </div>
                                <div className="text-divider">or sign in with email</div>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <div className="form-icon-wrapper">
                                            <input type="email" className="form-control" id="email" placeholder="Enter email" autofocus required />
                                            <i className="form-icon-left mdi mdi-email" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <div className="form-icon-wrapper">
                                            <input type="password" className="form-control" id="password" placeholder="Enter password" required />
                                            <i className="form-icon-left mdi mdi-lock" />

                                        </div>
                                    </div>
                               
                                    <div className="form-group">
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <button className="btn btn-primary">Sign In</button>
                                            <div className="mt-3 mt-md-0">
                                                <a href="password-reset.html">I forgot my password!</a>
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