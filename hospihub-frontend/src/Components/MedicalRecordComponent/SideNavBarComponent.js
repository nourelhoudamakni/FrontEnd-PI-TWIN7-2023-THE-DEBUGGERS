import { NavLink } from "react-router-dom";
import './sideNavBar.css'

function SideNavBarComponent(props) {
  return (
    <>
     <div>
        {/*mobile navigation bar start*/}
        <div className="mobile_nav">
          <div className="nav_barr">
            <img src="../assetsTemplates/template1/img/testimonial-1.jpg" className="mobile_profile_imagee" alt="" />
            <i className="fa fa-bars nav_btnn" />
          </div>
          <div className="mobile_nav_items">

            <a href="#"><i className="fas fa-table" /><span>Tables</span></a>
            <a href="#"><i className="fas fa-th" /><span>Forms</span></a>
            <a href="#"><i className="fas fa-info-circle" /><span>About</span></a>
            <a href="#"><i className="fas fa-sliders-h" /><span>Settings</span></a>


          </div>
        </div>
        {/*mobile navigation bar end*/}



        {/*sidebar start*/}
        <div className="sidebarr">
          <div className="profile_infoo">
            <img src="../assetsTemplates/template1/img/testimonial-1.jpg" className="profile_imagee" alt="" />
            <h4 className="titlee">{props.user.userName}</h4>
            <h4 className="titlee">{`Welcome Back ${props.user.userName} !`}</h4>
          </div>

          <NavLink to="/Medicalrecord/Summary" className="nav-item nav-link "><i className="fas fa-user" /><span>Summary Of the medical record</span></NavLink>
          <NavLink to="/Medicalrecord/BloodandMeasurements" className="nav-item nav-link "><i className="fas fa-plus-square" /><span>Blood groups and measurements</span></NavLink>
          <NavLink to="/Medicalrecord/VitalSigns" className="nav-item nav-link "><i className="fas fa-heartbeat" /><span>Vital Signs</span></NavLink>
          <NavLink to="/" className="nav-item nav-link "><i className="fas fa-th" /><span>Appointments</span></NavLink>
          <NavLink to="/" className="nav-item nav-link "><i className="fas  fa-bell" /><span>Notifications</span></NavLink>
          <NavLink to="/" className="nav-item nav-link "><i className="fas fa-sliders-h" /><span>Settings</span></NavLink>



          <div className="cardd cardMD col-lg-9 mx-5 mt-4">
            <div className="card-header "><i className="fas fa-plus" /><button className="btn btn-secondary">Make an appointment</button>  </div> 
          </div>
          <div className="cardd cardMD col-lg-9 mx-5 mt-4 mb-5">
            <div className="card-header "><i className="fas fa-plus" /><button className="btn btn-secondary">Update your profile</button></div>
          </div>
        </div>
        
        {/*sidebar end*/}

      </div>
    </>
  );
}

export default SideNavBarComponent;
