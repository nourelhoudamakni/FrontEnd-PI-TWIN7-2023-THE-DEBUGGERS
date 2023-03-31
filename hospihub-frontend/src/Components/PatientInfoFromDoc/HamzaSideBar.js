import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function HamzaSideBar(props) {

    const navigate = useNavigate();

    const handleBackToWorkspace = () => {
      navigate('/AddWorktime/AppointmentsList');
    };

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
          </div>

          <NavLink to={`/Medicalrecord/SummaryAlpha/${props.user._id}`}  className="nav-item nav-link "><i className="fas fa-user" /><span>Summary Of the medical record</span></NavLink>
          <NavLink to={`/Medicalrecord/BloodandMeasurementsAlpha/${props.user._id}`} className="nav-item nav-link "><i className="fas fa-plus-square" /><span>Blood groups and measurements</span></NavLink>
          <NavLink to={`/Medicalrecord/VitalSignsAlpha/${props.user._id}`} className="nav-item nav-link "><i className="fas fa-heartbeat" /><span>Vital Signs</span></NavLink>
          <div className="text-center" style={{marginTop: '20px',marginBottom: '20px' }}>
    <button className="btn btn-secondary" type="button" onClick={handleBackToWorkspace}>
      Back to workspace
    </button>
  </div>
        </div>
        
        {/*sidebar end*/}

      </div>
    </>
  );
}

export default HamzaSideBar;
