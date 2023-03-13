
import './formUpdateMed.css';
import SideNavBarComponent from './SideNavBarComponent';
function BloodComponent() {
    return (
        <>
            
        <div className="container-xl px-4 mt-4">
            <hr className="mt-0 mb-4" />
            <div className="row">
                <div className="col-xl-4">
                    {/*sidenavbar */}
                    <SideNavBarComponent></SideNavBarComponent>
                </div>
                <div className="col-xl-8">
                 {/* <UpdateMedicalRecordComponent></UpdateMedicalRecordComponent>  */}
        
                 <>
    
    
    <div className="card cardMD mb-4">
                <div className="card-header "><i className="fas fa-plus-square" /> Blood groups and Measurements </div>
                <div className="card-body">
                    <form>
                        {/* Form Group (username)*/}
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1">Blood Groups</label>

                                <select className="form-control bg-light p-1 m-1  ">
                                    <option selected>Select country</option>
                                    <option>Belgium</option>
                                    <option>Canada</option>
                                    <option>Denmark</option>
                                    <option>Estonia</option>
                                    <option>France</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputPhone">arterial pressure</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your arterial pressure" />
                            </div>
                        </div>

                        <div className="row gx-3 mb-3">


                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputOrgName">weight</label>
                                <input className="form-control" id="inputOrgName" type="number" placeholder="Enter your weight.." defaultValue="Start Bootstrap" />
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputOrgName">size</label>
                                <input className="form-control" id="inputOrgName" type="number" placeholder="Enter your size" defaultValue="Start Bootstrap" />
                            </div>
                        </div>

                        <div className="row gx-3 mb-3">


                            <div className="col-md-6">
                            <button className="btn btn-primary " type="button">Save changes</button>
                            </div>
                            <div className="col-md-6">
                            <img className="img-fluid" src="../assetsTemplates/images/human.png" alt="" />
                            </div>
                        </div>
                       

                    </form>
                </div>
            </div>
    
    </>
          
                </div>
            </div>
        </div>

    </>
    );
}

export default BloodComponent;
