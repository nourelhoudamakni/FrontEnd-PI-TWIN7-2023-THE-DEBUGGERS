import './sideNavBar.css';
import './formUpdateMed.css';

import SideNavBarComponent from './SideNavBarComponent';
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { async } from "q";
function UpdateMedicalRecordComponent(props) {

    // const [idUser, setIdUser] = useState('');
    const [User, setUser] = useState({});
    const [MedicalRecord, setMedicalRecord] = useState({});
    /////////les enumerations 
    const Place = ["Tunis", "Bizerte", "Nabeul", "Sfax"];
    const Country = ["Tunisia", "Algeria"];
    const civil = ["MARRIED", "SINGLE", "DIVORCED"];
    const [X,setX]=useState(true)
    /////////////recuperer les champs des inputs
    // const [email, setEmail] = useState("");
    // const [dateOfbirth, setDateOfBirth] = useState("")
    // const [placeOfBirth, setplaceOfBirth] = useState("")
    // const [civilState, setCivilState] = useState("")
    // const [phoneNumber, setphoneNumber] = useState(0);
    // const [country, setCountry] = useState("");
    // const [numberOfChildren, setnumberOfChildren] = useState("");
    // const [profession, setprofession] = useState("");
    const {
        email,
        country, 
        profession,
        civilState,
        numberOfChildren,
        dateOfBirth,
        placeOfBirth,
        phoneNumber,
       }=MedicalRecord 
  
    


    useEffect(() => {
        setX(false)
        const token = localStorage.getItem('jwtToken');

        if (token) {
          const decodedToken = jwt_decode(token);
        //   setIdUser(decodedToken.id);
          console.log(decodedToken.id)
            axios.get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
              .then(response => {
               
                setUser(response.data);
                console.log(response.data);
                console.log(User);
              
              })
              .catch(error => {
                console.error(error);
              });
          
        }
      }, []);

    //   useEffect(() => {
    //     if (idUser) {
    //       axios.get(`http://localhost:5000/patient/getUserById/${idUser}`)
    //         .then(response => {
    //           setUser(response.data);
    //         })
    //         .catch(error => {
    //           console.error(error);
    //         });
    //     }
    //   }, [idUser]);

      
  useEffect(() => {
    if (User) {
      axios.get(`http://localhost:5000/MedicalRecord/findMedicalRecordById/${User.MedicalRecord}`)
        .then(response => {
          setMedicalRecord(response.data);
        
        })
        .catch(error => {
          console.error(error);
        });
      
    }
  }, [User]);

 


  /////mettre le birthdate sous formr yyyy-mm-jj pour l'afficher
  const date = new Date(dateOfBirth); // récupération de la date actuelle
  const year = date.getFullYear(); // récupération de l'année
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // récupération du mois avec padding à zéro
  const day = ("0" + date.getDate()).slice(-2); // récupération du jour avec padding à zéro
  const formattedDate = `${year}-${month}-${day}`; // concaténation de la date formatée


    /////recupere les selecteur multiples
    // const handlePlaceOfBirthChange = (event) => {
    //     setplaceOfBirth(event.target.value);
    //     // console.log(event.target.value);
    // };

    // const handleCountryChange = (event) => {
    //     setCountry(event.target.value);
    //     console.log(event.target.value);
    // };

    // const handleCivilStateChange = (event) => {
    //     setCivilState(event.target.value);
    //     console.log(event.target.value);
    // };


    const onValueChange = (e) => {
        setMedicalRecord({ ...MedicalRecord, [e.target.name]: e.target.value });
        };

   
    const handleUpdateMedical = (e) => {
        e.preventDefault();
        console.log(MedicalRecord)
        axios.put(`http://localhost:5000/MedicalRecord/update/${User.MedicalRecord}`, MedicalRecord)
        .then((response)=>{
            console.log(response.data)
            console.log("medical record updated suuccessfully")
        })
    }


    return (
        <div className=" row gx-3 mt-5">
            <div className="offset-xl-1 col-xl-3 px-5">
                <SideNavBarComponent></SideNavBarComponent>
            </div>

            {/* Account details card*/}
            <div className="card cardMD mb-4 col-xl-6 px-5 ">
                <div className="card-header "><i className="fas fa-user-md iconMed" />Summary of The medical Record </div>
                <div className="card-body">
                    <form >
                        {/* Form Group (username)*/}
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputUsername" >Username (how your name will appear to other users on the site)</label>
                            <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={User.userName} disabled/>
                        </div>
                        {/* Form Row*/}
                        <div className="row gx-3 mb-3">
                            {/* Form Group (first name)*/}
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={User.firstName} disabled />
                            </div>
                            {/* Form Group (last name)*/}
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={User.lastName} disabled />
                            </div>
                        </div>




                        <div className="row gx-3 mb-3">

                            <div className="col-md-4">
                                <label className="small mb-1" htmlFor="inputDateofbirth">Date of birth</label>
                                <input className="form-control" id="inputDateofbirth" type="date" name='dateOfBirth'   placeholder="Enter your Date of birth " value={formattedDate} onChange={(e) => onValueChange(e)} />
                            </div>

                            <div className="col-md-4">
                                <label className="small mb-1">Place of Birth</label>
                                <select className="form-control bg-light p-1 m-1" value={placeOfBirth} name='placeOfBirth' onChange={(e) => onValueChange(e)}>
                                    <option value="" selected>Select Place of Birth</option>
                                    {Place.map((P) => (
                                        <option key={P} value={P}>
                                            {P}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="col-md-4">
                                <label className="small mb-1">Country</label>

                                <select className="form-control bg-light p-1 m-1" value={country} name='country'  onChange={(e) => onValueChange(e)}>
                                    <option value="" selected>Select country</option>
                                    {Country.map((C) => (
                                        <option key={C} value={C}>
                                            {C}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>



                        <div className="row gx-3 mb-3">

                            <div className="col-md-4">
                                <label className="small mb-1" >Civil state</label>

                                <select className="form-control bg-light p-1 m-1" value={civilState}   name='civilState' onChange={(e) => onValueChange(e)}>
                                    <option selected>Select Civil state</option>
                                    {civil.map((C) => (
                                        <option key={C} value={C}>
                                            {C}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="small mb-1" htmlFor="numberofChil">Number of children</label>
                                <input className="form-control" id="numberofChil" type="number" placeholder="Enter your nbr of children.." name='numberOfChildren' value={numberOfChildren} onChange={(e) => onValueChange(e)} />
                            </div>
                            <div className="col-md-4">
                                <label className="small mb-1" htmlFor="Profession">Profession</label>
                                <input className="form-control" id="Profession" type="text" placeholder="Enter your Profession"  name='profession' value={profession} onChange={(e) => onValueChange(e)} />
                            </div>

                        </div>

                        {/* Form Group (email address)*/}
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputEmailAddress" >Email address</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" defaultValue="name@example.com"  name='email' value={email} onChange={(e) => onValueChange(e)} disabled />
                        </div>
                        {/* Form Row*/}
                        <div className="row gx-3 mb-3">
                            {/* Form Group (phone number)*/}
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputPhone" >Phone number</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" name='phoneNumber'  value={phoneNumber} onChange={(e) => onValueChange(e)} required />
                            </div>
                            {/* Form Group (birthday)*/}

                        </div>
                        {/* Save changes button*/}
                        <button className="btn btn-primary" type="button" onClick={handleUpdateMedical}>Save changes</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default UpdateMedicalRecordComponent;