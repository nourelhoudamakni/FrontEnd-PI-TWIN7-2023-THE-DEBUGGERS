import { NavLink } from "react-router-dom";
import './sideNavBar.css';

function SideNavBarComponent() {
    return (  
        <>
          <div>
       
        {/*mobile navigation bar start*/}
        <div className="mobile_nav">
          <div className="nav_bar">
            <img src="1.png" className="mobile_profile_image" alt="" />
            <i className="fa fa-bars nav_btn" />
          </div>
          <div className="mobile_nav_items">
         
            <NavLink  to="/"   className="nav-item nav-link "><i className="fas fa-cogs" /><span>Summary Of the medical record</span></NavLink>
            <a href="#"><i className="fas fa-table" /><span>Tables</span></a>
            <a href="#"><i className="fas fa-th" /><span>Forms</span></a>
            <a href="#"><i className="fas fa-info-circle" /><span>About</span></a>
            <a href="#"><i className="fas fa-sliders-h" /><span>Settings</span></a>

         
          </div>
        </div>
        {/*mobile navigation bar end*/}
        {/*sidebar start*/}
        <div className="sidebar">
          <div className="profile_info">
            <img src="https://i.imgur.com/iQpdHb2.jpg" className="profile_image" alt="" />
            <h4>Williamson</h4>
          </div>
          <NavLink  to="/Summary"className="nav-item nav-link "><i className="fas fa-user" /><span>Summary Of the medical record</span></NavLink>
          <NavLink  to="/BloodandMeasurements"className="nav-item nav-link "><i className="fas fa-plus-square" /><span>Blood groups and measurements</span></NavLink>
          <NavLink  to="/VitalSigns"className="nav-item nav-link "><i className="fas fa-heartbeat" /><span>Vital Signs</span></NavLink>
          <NavLink  to="/"className="nav-item nav-link "><i className="fas fa-th" /><span>Appointments</span></NavLink>
          <NavLink  to="/"className="nav-item nav-link "><i className="fas  fa-bell" /><span>Notifications</span></NavLink>
          <NavLink  to="/"className="nav-item nav-link "><i className="fas fa-sliders-h" /><span>Settings</span></NavLink>
         
        </div>
        {/*sidebar end*/}
    
      </div>
    </>
    );
}

export default SideNavBarComponent;