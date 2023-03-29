import './formUpdateMed.css';
import { useEffect, useState } from 'react';
import SideNavBarComponent from './SideNavBarComponent';
import jwt_decode from "jwt-decode";
import axios from "axios";
import Select from 'react-select';
import './imageFile.css';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import React from 'react';


function VitalSignsComponent() {
    const MAX_COUNT = 10;
    const [User, setUser] = useState({});
    const [files, setFiles] = useState([])
    const [MedicalRecord, setMedicalRecord] = useState({})
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
    const baseUrl = "http://localhost:5000/uploads/";
    const [ConfirmeMessage, setConfirmeMessage] = useState(false);
    
    const navigate=useNavigate()

    const diseaseList=["Cystic Fibrosis", "Huntington's Disease", "Sickle Cell Anemia", "Hemophilia", "Type 1 Diabetes", "Muscular Dystrophy", "Multiple Sclerosis", "Alzheimer's Disease", "Parkinson's Disease", "Rheumatoid Arthritis", "Inherited cardiomyopathies", "Celiac disease", "Epilepsy", "Polycystic kidney disease", "Hemochromatosis", "Wilson's disease", "Alpha-1 antitrypsin deficiency", "Hereditary angioedema", "Ehlers-Danlos syndrome", "Primary immunodeficiency diseases", "Fragile X Syndrome", "Down Syndrome", "Turner Syndrome", "Klinefelter Syndrome", "Sickle Cell Trait", "Thalassemia", "Hereditary Hemorrhagic Telangiectasia", "Marfan Syndrome", "Familial Hypercholesterolemia", "Huntington's Disease-like 2", "Cystinosis", "Gaucher Disease", "Niemann-Pick Disease", "Fabry Disease", "Mucopolysaccharidoses", "Albinism", "Hereditary Breast and Ovarian Cancer Syndrome", "Lynch Syndrome", "Hereditary Nonpolyposis Colorectal Cancer", "Fanconi Anemia", "Xeroderma Pigmentosum", "Friedreich Ataxia", "Batten Disease"];
    const allergiesList=["Peanut allergy", "Tree nut allergy", "Shellfish allergy", "Fish allergy", "Milk allergy", "Egg allergy", "Soy allergy", "Wheat allergy", "Corn allergy", "Latex allergy", "Sesame allergy", "Mustard allergy", "Sulfite allergy", "Sunflower seed allergy", "Kiwi fruit allergy", "Banana allergy", "Avocado allergy", "Meat allergy", "Medication allergy", "Insect sting allergy", "Pollens allergy", "Mold allergy", "Dust allergy", "Pet dander allergy", "Cockroach allergy", "Sun allergy", "Water allergy", "Cold allergy", "Exercise-induced allergy", "Nickel allergy", "Chemical allergy", "Perfume allergy", "Cosmetics allergy", "Inhalant allergy", "Food dye allergy", "Artificial preservatives allergy", "Artificial sweeteners allergy", "Grass allergy", "Hay fever allergy", "Fruit allergy", "Vegetable allergy", "Ragweed allergy", "Pollen food syndrome", "Topical allergy", "Contact dermatitis allergy", "Metal allergy", "Cigarette smoke allergy"];




    const {
        disease,
        allergies,

    } = MedicalRecord
    console.log(files)

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);


            axios.get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
                .then(response => {

                    setUser(response.data);


                })
                .catch(error => {
                    console.error(error);
                });

        }
    }, []);

    useEffect(() => {
        if (User) {
            axios.get(`http://localhost:5000/MedicalRecord/findMedicalRecordById/${User.MedicalRecord}`)
                .then(response => {
                    setMedicalRecord(response.data);
                    setFiles(response.data.files)
                    console.log(files)


                })
                .catch(error => {
                    console.error(error);
                });

        }
    }, [User]);


    useEffect(() => {
        if (User) {
            axios.get(`http://localhost:5000/MedicalRecord/findMedicalRecordById/${User.MedicalRecord}`)
                .then(response => {
                    setMedicalRecord(response.data);
                    setFiles(response.data.files)
                    console.log(files)


                })
                .catch(error => {
                    console.error(error);
                });

        }
    }, [User]);
   




    const onValueChange = (e) => {
        setMedicalRecord({ ...MedicalRecord, [e.target.name]: e.target.value });

    };

    /////// file upload 
    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)

    }

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }

    const handleRemoveFile = (index) => {
        const uploaded = [...uploadedFiles];
        uploaded.splice(index, 1);
        setUploadedFiles(uploaded);
        setFileLimit(false);
    };




    /// axios Put 

    const handleUpdateMedical = (e) => {
        console.log(MedicalRecord)
        e.preventDefault();


        axios.put(`http://localhost:5000/MedicalRecord/update/${User.MedicalRecord}`, MedicalRecord)
            .then((response) => {
                console.log(response.data)
                console.log("medical record updated successfully")
                if (response.data) {
                    setConfirmeMessage(true)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const addedFiles = (e) => {
        e.preventDefault();
        const formData = new FormData();
        uploadedFiles.forEach(file => {
            console.log(file)
            formData.append('file', file, file.name);
            console.log(formData)
        });
        axios.put(`http://localhost:5000/MedicalRecord/addFiles/${User.MedicalRecord}`, formData)
            .then((response) => {
                console.log(response.data)
                console.log("medical record updated successfully")
                if (response.data) {
                    setConfirmeMessage(true)
                }
               navigate(0);
            })
            .catch((error) => {
                console.log(error);
            });


    }

    const handleDeleteFile = (fileName) => {
        axios.delete(`http://localhost:5000/MedicalRecord/deleteMedicalDocument/${User.MedicalRecord}/${fileName}`)
            .then((response) => {
                console.log(response.data);
                setFiles(files.filter((file) => file !== fileName));
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (


        <div className='container pt-5 '>
            <div className=" row ">
                <div className="col-lg-4">
                    <SideNavBarComponent user={User}></SideNavBarComponent>
                </div>

                <div className='d-flex flex-column col-lg-8 mb-5'>
                    {/* Account details card*/}
                    <div className="card cardMD cardRes  ">
                        <div className="card-header "><i className="fas fa-heartbeat" /> Vital Signs </div>
                        <div className="card-body ">
                            {ConfirmeMessage && (
                                <Alert
                                    className="form-group"
                                    variant="success"
                                    style={{ marginTop: "-13px", height: "50px" }}
                                >
                                    <div
                                        className="form-icon-wrapper  "
                                    >
                                        Your Medical Record is updated succesfully !
                                    </div>
                                </Alert>

                            )}
                            <form>
                                {/* Form Group (username)*/}

                                <div className="row col-lg-12 ">
                                    <div className="col-lg-10">
                                        <label className="small mb-1">Hereditary or Chronic Diseases</label>
                                        <select className="form-select" id="inputdisease" name="disease" value={disease} onChange={(e) => onValueChange(e)} multiple>
                                        <option value="">-- Select diseases --</option>
                                        {diseaseList.map((disease, index) => (
                                            <option key={index} value={disease}>{disease}</option>
                                        ))}
                                        </select>
                                    </div>

                                    <div className="col-lg-10">
                                        <label className="small mb-1">Allergies</label>
                                        <select className="form-select" id="inputallergies" name='allergies' value={allergies} onChange={(e) => onValueChange(e)} multiple>
                                        <option value="">-- Select allergies --</option>
                                        {allergiesList.map((allergy, index) => (
                                            <option key={index} value={allergy}>{allergy}</option>
                                        ))}
                                        </select>
                                    </div>

                                    <div className="col-lg-4 mt-2">
                                        <button className="btn btn-primary " type="button" onClick={handleUpdateMedical}>Save changes</button>
                                    </div>


                                </div>



                            </form>
                        </div>
                    </div >



                    <div className="card cardMD mt-5 cardRes">
                        <div className="card-header "><i className="fas fa-file" /> Upload medical document </div>
                        <div className="card-body">
                            <form>
                                {/* Form Group (username)*/}
                                

                                <div className="row gx-3 mb-3">
                                    <label className=" mb-1">My medical documents </label>

                                    <div className="uploaded-files-list">

                                        { files.map((file) => {
                                            var imageUrl = `http://127.0.0.1:8887/${file}`;
                                            return (
                                                <div key={file.name}>
                                                    <img src={imageUrl} alt={file.name} onError={() => console.log(`Impossible de charger l'image: ${imageUrl}`)} />
                                                    <p>{file.name}</p>
                                                    <button onClick={() => handleDeleteFile(file)}>Supprimer</button>
                                                </div>
                                            );
                                        })}
                                    </div>



                                    <div className="col-md-6">
                                        <div>
                                        <button className="btn btn-primary " type="button" disabled={uploadedFiles.length === 0} onClick={addedFiles}>Save files</button>
                                        </div>
                                        <div>
                                       
                                        </div>
                                    </div>

                                </div>


                                <div className="row gx-3 mb-3">
                                    <div className="col-md-4">
                                        <input id='fileUpload' type='file' multiple

                                            onChange={handleFileEvent}
                                            disabled={fileLimit}
                                        />
                                    </div>

                                </div>

                                <div className="uploaded-files-list">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={file.name}>
                                            <img src={URL.createObjectURL(file)} alt={file.name} />
                                            <p>{file.name}</p>
                                            <button onClick={() => handleRemoveFile(index)}>Supprimer</button>
                                        </div>
                                    ))}
                                </div>

                            </form>
                        </div>
                    </div >
                </div>
            </div>
        </div>

    );
}

export default VitalSignsComponent;