import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateProfile() {

    const [User, setUser] = useState({});
    const [MedicalRecord, setMedicalRecord] = useState({});
 

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            axios
                .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
            axios.get(`http://localhost:5000/MedicalRecord/findMedicalRecordById/${User.MedicalRecord}`)
                .then(response => {
                    setMedicalRecord(response.data);

                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    /////mettre le birthdate sous formr yyyy-mm-jj pour l'afficher
    const date = new Date(User.dateOfBirth); // récupération de la date actuelle
    const year = date.getFullYear(); // récupération de l'année
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // récupération du mois avec padding à zéro
    const day = ("0" + date.getDate()).slice(-2); // récupération du jour avec padding à zéro
    const formattedDate = `${year}-${month}-${day}`; // concaténation de la date formatée

    const onValueChange = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value });
        setMedicalRecord({ ...MedicalRecord, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            axios.put(`http://localhost:5000/patient/updatePatient/${decodedToken.id}`, User)
                .then((response) => {
                    console.log(response.data);
                    console.log("user updated suuccessfully");
                })
            axios.put(`http://localhost:5000/MedicalRecord/update/${User.MedicalRecord}`, MedicalRecord)
                .then((response) => {
                    console.log(response.data)
                    console.log("medical record updated suuccessfully")
                    toast.success('Profile updated successfully!', {
                        position: toast.POSITION.TOP_RIGHT
                      });
                })
        }
    }

    return (
        <>
              <ToastContainer />
            <div className=" row gx-3 mt-5 offset-xl-4">

                {/* Account details card*/}
                <div className="card cardMD mb-4 col-xl-6 px-5 ">
                    <div className="card-header "><i className="fas fa-user-md iconMed" />Update profile {User.userName}</div>
                    <div className="card-body">
                        <form >

                            {/* Form Group (username)*/}
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputUsername" >Username (how your name will appear to other users on the Website)</label>
                                <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" name='userName' value={User.userName} onChange={(e) => onValueChange(e)} />
                            </div>

                            {/* Form Row*/}
                            <div className="row gx-3 mb-3">
                                {/* Form Group (first name)*/}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                    <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" name='firstName' value={User.firstName} onChange={(e) => onValueChange(e)} />
                                </div>
                                {/* Form Group (last name)*/}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                    <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" name='lastName' value={User.lastName} onChange={(e) => onValueChange(e)} />
                                </div>
                            </div>

                            <div className="row gx-3 mb-3">
                                <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="inputDateofbirth">Date of birth</label>
                                    <input className="form-control" id="inputDateofbirth" type="date" name='dateOfBirth' placeholder="Enter your Date of birth " value={formattedDate} onChange={(e) => onValueChange(e)} />
                                </div>

                            </div>


                            {/* Form Group (email address)*/}
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputEmailAddress" >Email address</label>
                                <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" defaultValue="name@example.com" name='email' value={User.email} onChange={(e) => onValueChange(e)} />
                            </div>

                            {/* Form Row*/}
                            <div className="row gx-3 mb-3">
                                {/* Form Group (phone number)*/}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputPhone" >Phone number</label>
                                    <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" name='phoneNumber' value={User.phoneNumber} onChange={(e) => onValueChange(e)} required />
                                </div>
                            </div>

                            {/* Save changes button*/}
                            <button className="btn btn-primary" type="button" onClick={handleUpdateProfile}>Save changes</button>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}

export default UpdateProfile;