import './formUpdateMed.css';
import { useEffect, useState } from 'react';
import SideNavBarComponent from './SideNavBarComponent';
import jwt_decode from "jwt-decode";
import axios from "axios";
import Select from 'react-select';
import './imageFile.css';


function VitalSignsComponent() {
    const MAX_COUNT = 20;
    const [User, setUser] = useState({});
    const [MedicalRecord, setMedicalRecord] = useState({})
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);

    const {
        disease,
        allergies,
        files
    } = MedicalRecord


    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            //   setIdUser(decodedToken.id);
            console.log(decodedToken.id)
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
        e.preventDefault();
       
        const formData = new FormData();
        console.log(uploadedFiles)
        formData.append('data', JSON.stringify(MedicalRecord));
        uploadedFiles.forEach(file => {
            console.log(file)
            formData.append('files', file, file.name);
            console.log(formData)
        });
        
        axios.put(`http://localhost:5000/MedicalRecord/update/${User.MedicalRecord}`, formData)
        .then((response)=>{
          console.log(response.data)
          console.log("medical record updated successfully")
        })
        .catch((error) => {
          console.log(error);
        });
      }
    

    return (



        <div className=" row gx-3 mt-5">
            <div className="offset-xl-1 col-xl-3">
                <SideNavBarComponent></SideNavBarComponent>
            </div>

            {/* Account details card*/}
            <div className="card cardMD mb-4 col-xl-6 ">
                <div className="card-header "><i className="fas fa-heartbeat" /> Vital Signs </div>
                <div className="card-body">
                    <form>
                        {/* Form Group (username)*/}

                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1">Hereditary or Chronic Diseases</label>
                                <input className="form-control" id="inputdisease" type="text" placeholder="Enter your hereditary or chronic diseases " name='disease' value={disease} onChange={(e) => onValueChange(e)} />
                            </div>

                        </div>

                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1">Allergies</label>
                                {/* <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={diseasetab}
                                    value={disease}

                                /> */}
                                <input className="form-control" id="inputallergies" type="text" placeholder="Enter your allergies " name='allergies' value={allergies} onChange={(e) => onValueChange(e)} />
                            </div>
                        </div>




                        <div className="row gx-3 mb-3">
                            <div className="col-md-4">
                                <input id='fileUpload' type='file' multiple

                                    onChange={handleFileEvent}
                                    disabled={fileLimit}
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor='fileUpload'>
                                    <a className={`btn btn-primary ${!fileLimit ? '' : 'disabled'} `}>Upload Files</a>
                                </label>
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



                        <div className="row gx-3 mb-3">

                            <div className="col-md-6">
                                <button className="btn btn-primary " type="button" onClick={handleUpdateMedical}>Save changes</button>
                            </div>

                        </div>


                    </form>
                </div>
            </div >
        </div >


    );
}

export default VitalSignsComponent;