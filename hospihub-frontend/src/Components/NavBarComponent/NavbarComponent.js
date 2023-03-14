import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";


function NavbarComponent() {
const navigate=useNavigate()
const [key, setKey] = useState(0);







    return ( 
        <>
            
              <div className="container-fluid bg-light p-0 wow fadeIn" data-wow-delay="0.1s">
              <div className="row gx-0 d-none d-lg-flex">
                <div className="col-lg-7 px-5 text-start">
                  <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                    <small className="fa fa-map-marker-alt text-primary me-2" />
                    <small>123 Street, New York, USA</small>
                  </div>
                  <div className="h-100 d-inline-flex align-items-center py-3">
                    <small className="far fa-clock text-primary me-2" />
                    <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
                  </div>
                </div>
                <div className="col-lg-5 px-5 text-end">
                  <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                    <small className="fa fa-phone-alt text-primary me-2" />
                    <small>+012 345 6789</small>
                  </div>
                  <div className="h-100 d-inline-flex align-items-center">
                    <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href><i className="fab fa-linkedin-in" /></a>
                    <a className="btn btn-sm-square rounded-circle bg-white text-primary me-0" href><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </div>
            </div>
            {/* Topbar End */}
            {/* Navbar Start */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn" data-wow-delay="0.1s">
              <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                <h1 className="m-0 text-primary"><i className="far fa-hospital me-3" />Klinik</h1>
              </a>
              <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                  <NavLink  to="/home"   className="nav-item nav-link active">Home</NavLink>
                  <NavLink  to="/"   className="nav-item nav-link active">About</NavLink>
                  <NavLink  to="/"   className="nav-item nav-link active">Servi</NavLink>
                  <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                    <div className="dropdown-menu rounded-0 rounded-bottom m-0">
                      <a href="feature.html" className="dropdown-item">Feature</a>
                      <a href="team.html" className="dropdown-item">Our Doctor</a>
                      <a href="appointment.html" className="dropdown-item">Appointment</a>
                      <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                      <a href="404.html" className="dropdown-item">404 Page</a>
                    </div>
                  </div>
                  <a href="contact.html" className="nav-item nav-link">Contact</a>
                </div>
                <button className="btn btn-primary " onClick={handleClick}>Sign Up</button>
              </div>
            </nav>
     
         
          </>
     );
}

export default NavbarComponent;