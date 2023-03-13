import './sideNavBar.css';
import './formUpdateMed.css';

import SideNavBarComponent from './SideNavBarComponent';
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { async } from "q";
function UpdateMedicalRecordComponent(props) {

    const [idUser, SetidUser] = useState("");
    const[cond,Setcond]=useState(false);
    const [User, SetUser] = useState({
        _id: idUser,
        Appointments: [],
        Chats: [],
        Complaints: [],
        Doctors: [],
        Notifications: [],
        address: "",
        code: "",
        confirmed: "",
        dateOfBirth: "",
        email: "",
        firstName: "",
        gender: "",
        lastName: "",
        password: "",
        phoneNotVerif: "",
        phonenumber: "",
        role: "",
        secret: "",
        token: "",
        userName: "",

    })
    const formattedDate = User.dateOfBirth.toLocaleString("fr-FR", {dateStyle: "long"});
    ///get token from local storage
    const GetUserByLocalStorage = async () => {
        const jeton = localStorage.getItem('jwtToken');
        Setcond(true);
        const decodedToken = jwt_decode(jeton);
        SetidUser(decodedToken.id)
    }

    //get user by id 
    const getUserByid = async () => {
        await axios.get(`http://localhost:5000/patient/getUserById/${idUser}`)
            .then((response) => {
                if (response.data.role === 'patient') {
                    SetUser(response.data)
                    Setcond(true);
                    console.log(idUser)
                    console.log(User)


                }
                else {
                    console.log("you must be a patient")
                }
            })

    }





    useEffect(() => {
        GetUserByLocalStorage();
        getUserByid();

    }, [cond])


    return (
        <div className=" row gx-3 mt-5">
            <div className="offset-xl-1 col-xl-3 px-5">
                <SideNavBarComponent></SideNavBarComponent>
            </div>

            {/* Account details card*/}
            <div className="card cardMD mb-4 col-xl-6 px-5 ">
                <div className="card-header "><i className="fas fa-user-md iconMed" />Summary of The medical Record </div>
                <div className="card-body">
                    <form>
                        {/* Form Group (username)*/}
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                            <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={User.userName} />
                        </div>
                        {/* Form Row*/}
                        <div className="row gx-3 mb-3">
                            {/* Form Group (first name)*/}
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name"  value={User.firstName} />
                            </div>
                            {/* Form Group (last name)*/}
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name"  value={User.lastName}  />
                            </div>
                        </div>




                        <div className="row gx-3 mb-3">

                            <div className="col-md-4">
                                <label className="small mb-1" htmlFor="inputDateofbirth">Date of birth</label>
                                <input className="form-control" id="inputDateofbirth" type="date" placeholder="Enter your Date of birth " value={formattedDate}  />
                            </div>

                            <div className="col-md-4">
                                <label className="small mb-1">Place of Birth</label>

                                <select className="form-control bg-light p-1 m-1  "  >
                                    <option selected>Select Place of Birth</option>
                                    <option>Belgium</option>
                                    <option>Canada</option>
                                    <option>Denmark</option>
                                    <option>Estonia</option>
                                    <option>France</option>
                                </select>
                            </div>


                            <div className="col-md-4">
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
                                <label className="small mb-1" htmlFor="numberofChil">Number of children</label>
                                <input className="form-control" id="numberofChil" type="number" placeholder="Enter your nbr of children.." />
                            </div>
                            <div className="col-md-4">
                                <label className="small mb-1" htmlFor="Profession">Profession</label>
                                <input className="form-control" id="Profession" type="text" placeholder="Enter your Profession" />
                            </div>

                        </div>

                        {/* Form Group (email address)*/}
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputEmailAddress" >Email address</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" defaultValue="name@example.com"  value={User.email}/>
                        </div>
                        {/* Form Row*/}
                        <div className="row gx-3 mb-3">
                            {/* Form Group (phone number)*/}
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputPhone" >Phone number</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" defaultValue="22-555-555" value={User.phoneNotVerif} />
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