import { NavLink } from "react-router-dom";
import './sideNavBarProfile.css';

function SideNavBarUpdateProfile(props) {
  return (
    <>
      <div>
        {/*mobile navigation bar start*/}
        <div className="mobile_nav">
          <div className="nav_bar">
            <img src="../assetsTemplates/template1/img/testimonial-1.jpg" className="mobile_profile_image" alt="" />
            <i className="fa fa-bars nav_btn" />
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
        <div className="sidebar  ">
          <div className="profile_info">
            <img src="../assetsTemplates/template1/img/testimonial-1.jpg" className="profile_image" alt="" />
            <h4 className="title">{props.user.userName}</h4>
            <h4 className="title">{`Welcome Back ${props.user.userName} !`}</h4>
          </div>

          <NavLink to="/UpdateProfile/publicProfile" className="nav-item nav-link "><i className="fas fa-user" /><span>Public Profile</span></NavLink>
          <NavLink to="/UpdateProfile/UpdatePassword" className="nav-item nav-link "><i className="fas fa-key" /><span>Password</span></NavLink>
          <NavLink to="/UpdateProfile/patientList" className="nav-item nav-link "><i className="fas fa-user" /><span>Patient List</span></NavLink>
        </div>
        
        {/*sidebar end*/}

      </div>
    </>
  );
}

export default SideNavBarUpdateProfile;
