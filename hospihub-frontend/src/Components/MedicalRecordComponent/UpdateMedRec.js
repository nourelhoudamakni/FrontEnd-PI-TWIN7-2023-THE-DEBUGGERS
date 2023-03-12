import './sideNavBar.css';
import './formUpdateMed.css';


function UpdateMedicalRecordComponent() {
    return (
                <div>
                    {/* Account details card*/}
                    <div className="card mb-4">
                        <div className="card-header "><i className="fas fa-user-md iconMed" />Summary of The medical Record </div>
                        <div className="card-body">
                            <form>
                                {/* Form Group (username)*/}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                                    <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" defaultValue="username" />
                                </div>
                                {/* Form Row*/}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (first name)*/}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" defaultValue="Valerie" />
                                    </div>
                                    {/* Form Group (last name)*/}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                        <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" defaultValue="Luna" />
                                    </div>
                                </div>
                                {/* Form Row        */}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (organization name)*/}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputOrgName">Organization name</label>
                                        <input className="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" defaultValue="Start Bootstrap" />
                                    </div>
                                    {/* Form Group (location)*/}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLocation">Location</label>
                                        <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" defaultValue="San Francisco, CA" />
                                    </div>
                                </div>


                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputOrgName">Date of birth</label>
                                        <input className="form-control" id="inputOrgName" type="date" placeholder="Enter your organization name" defaultValue="Start Bootstrap" />
                                    </div>


                                    <div className="col-md-6">
                                        <label className="small mb-1">Country</label>

                                        <select className="form-control bg-light p-1 m-1  ">
                                            <option selected>Select country</option>
                                            <option>Belgium</option>
                                            <option>Canada</option>
                                            <option>Denmark</option>
                                            <option>Estonia</option>
                                            <option>France</option>
                                        </select>
                                    </div>
                                </div>



                                <div className="row gx-3 mb-3">

                                <div className="col-md-4">
                                        <label className="small mb-1">Civil state</label>

                                        <select className="form-control bg-light p-1 m-1  ">
                                            <option selected>Select Civil state</option>
                                            <option>Belgium</option>
                                            <option>Canada</option>
                                            <option>Denmark</option>
                                            <option>Estonia</option>
                                            <option>France</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="inputOrgName">Number of children</label>
                                        <input className="form-control" id="inputOrgName" type="number" placeholder="Enter your nbr of children.." defaultValue="Start Bootstrap" />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="inputOrgName">Profession</label>
                                        <input className="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" defaultValue="Start Bootstrap" />
                                    </div>

                                </div>

                                {/* Form Group (email address)*/}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" defaultValue="name@example.com" />
                                </div>
                                {/* Form Row*/}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (phone number)*/}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                        <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" defaultValue="555-123-4567" />
                                    </div>
                                    {/* Form Group (birthday)*/}
                                   
                                </div>
                                {/* Save changes button*/}
                                <button className="btn btn-primary" type="button">Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
       
    );
}

export default UpdateMedicalRecordComponent;