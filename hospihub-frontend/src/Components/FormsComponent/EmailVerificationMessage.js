function EmailVerificationMessage () {
    return (
     <div className="">
      <img
                className="img-fluid"
                src="../assetsTemplates/templateForm/images/image.jpg"
                style={{ width: "100%", height: "100%" }}
            />
          <div className="position-absolute top-50 start-50 translate-middle container">
          <div className="row">
            <div className="col-md-4 offset-md-7">
              <div className="card rounded">
                <div className="card-body ">
                  <div className="text-center">
                    <h3 className="font-weight-bold mb-3">Congratulations!</h3>
                    <p className="text-muted">Form submitted successfully. Check your inbox to reset your password.</p>
                    <div className="row mb-5">
                      <div className="col-md-8 offset-md-2">
                        <img className="img-fluid" src="../assetsTemplates/templateForm/images/mailVerif.jpg" alt="send_mail" />
                      </div>
                    </div>
                    <a href="sign-in.html">Turn back</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
}

export default EmailVerificationMessage;