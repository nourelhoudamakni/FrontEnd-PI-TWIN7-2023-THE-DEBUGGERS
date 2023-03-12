import './formUpdateMed.css';
import { useEffect, useState } from 'react';

function VitalSignsComponent() {

    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    // const imageMimeType = /image\/(png|jpg|jpeg)/i;

    const changeHandler = (e) => {
        const file = e.target.files[0];
        // if (!file.type.match(imageMimeType)) {
        //   alert("Image mime type is not valid");
        //   return;
        // }
        setFile(file);
    }
    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);





    return (

        <div>
            {/* Account details card*/}
            <div className="card mb-4">
                <div className="card-header "><i className="fas fa-heartbeat" /> Vital Signs </div>
                <div className="card-body">
                    <form>
                        {/* Form Group (username)*/}
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1">Category</label>

                                <select className="form-control bg-light p-1 m-1  ">
                                    <option selected>Select Category</option>
                                    <option>Belgium</option>
                                    <option>Canada</option>
                                    <option>Denmark</option>
                                    <option>Estonia</option>
                                    <option>France</option>
                                </select>
                            </div>

                        </div>

                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1">Disease</label>

                                <select className="form-control bg-light p-1 m-1  ">
                                    <option selected>Select disease</option>
                                    <option>Belgium</option>
                                    <option>Canada</option>
                                    <option>Denmark</option>
                                    <option>Estonia</option>
                                    <option>France</option>
                                </select>
                            </div>

                        </div>


                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1">Allergies</label>

                                <select className="form-control bg-light p-1 m-1  ">
                                    <option selected>Select allergies</option>
                                    <option>Belgium</option>
                                    <option>Canada</option>
                                    <option>Denmark</option>
                                    <option>Estonia</option>
                                    <option>France</option>
                                </select>
                            </div>

                        </div>

                        <div className="row gx-3 mb-3">

                            <p>
                                <label htmlFor='image '> Browse images  </label>
                                <input
                                    className='form-control bg-light' 
                                    type="file"
                                    id='image'
                                    accept='.png, .jpg, .jpeg'
                                    onChange={changeHandler}
                                />
                            </p>
                            <p>
                                <input type="submit" label="Upload" className='form-control  fw-bold ' />
                            </p>
                
                    {fileDataURL ?
                        <p className="img-preview-wrapper">
                            {
                                <img src={fileDataURL} alt="preview" style={{ width: "100%", height:"100%" }}/> 
                            }
                        </p> : null}
              
                </div>
                <div className="row gx-3 mb-3">


                    <div className="col-md-6">
                        <button className="btn btn-primary " type="button">Save changes</button>
                    </div>
                   
                </div>


            </form>
        </div>
            </div >
        </div >


     );
}

export default VitalSignsComponent;