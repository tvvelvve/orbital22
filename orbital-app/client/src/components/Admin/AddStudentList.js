import React, { Fragment, useState } from "react";
import Papa from "papaparse";
import { toast } from 'react-toastify';

const AddStudentList = () => {
    const [csv, setCsv] = useState([]);
    const [validCsv, setValidCsv] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [studentNumber, setStudentNumber] = useState();
    const [userid, setUserid] = useState();
    const [email, setEmail] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [programme, setProgramme] = useState();


    const handleFileUpload = (e) => {
        const files = e.target.files;
        if (files) {
            Papa.parse(files[0], {
                complete: function (results) {
                    if (results.data[0][0] === "First Name" && results.data[0][1] === "Last Name" && results.data[0][2] === "Student Number"
                        && results.data[0][3] === "User ID" && results.data[0][4] === "Email" && results.data[0][5] === "Contact Number" && results.data[0][6] === "Programme") {
                        setCsv(results.data.slice(1));
                        setValidCsv(true);
                    } else {
                        setValidCsv(false);
                    }
                }
            }
            )
        }
    };

    const addStudentList = async (e, firstName, lastName, studentNumber, userID, email, contactNumber, programme, password) => {
        e.preventDefault();
        try {
            const body = { firstName, lastName, studentNumber, userID, email, contactNumber, programme, password };
            console.log(JSON.stringify(body));
            const response = await fetch(
                "/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();

            if (parseRes.jwtToken) {
                return true;
            } else {
                return false;
            }


        } catch (err) {
            return false;
        }
    };


    const csvToPSQL = async (e) => {
        var error = false;
        for (let i = 0; i < csv.length; i++) {
            var result = await addStudentList(e, csv[i][0], csv[i][1], csv[i][2], csv[i][3], csv[i][4], csv[i][5], csv[i][6], "undefined");
            if (result === false) {
                error = true;
            }
        }
        return !error;
    }

    const toastResultSingle = async e => {
        const result = await addStudentList(e, firstName, lastName, studentNumber, userid, email, contactNumber, programme, "undefined");

        if (result === true) {
            toast.success(`Succesfully added ${firstName} ${lastName}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } else {
            toast.error(`Error adding ${firstName} ${lastName}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    }

    const toastResultCSV = async e => {
        if (validCsv) {
            const result = await csvToPSQL(e);
            if (csv.length === 0) {
                toast.error("File is not chosen!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } else {
                if (result === true) {
                    toast.success('Successfully imported students', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                } else {
                    toast.error("Error importing some students: Duplicate students", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                }
            }
        } else {
            toast.error("Please upload a valid CSV file!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn-circle btn-md"
                data-bs-toggle="modal"
                data-bs-target="#addStudentModal"
            >
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>

            <div
                className="modal"
                id="addStudentModal"
            >
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content ">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title">Add Student</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="span2 p-20">
                                <button
                                    type="button"
                                    className="btn btn-success btn-block"
                                    data-bs-toggle="modal" data-bs-target="#addStudentModalSingle"
                                >
                                    Single Add
                                </button>

                                <br />

                                <button
                                    className="btn btn-warning btn-block"
                                    data-bs-toggle="modal" data-bs-target="#addStudentModalCSV"
                                >
                                    Multiple Add
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal"
                id="addStudentModalCSV"
            >
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content ">
                        <div className="modal-body">
                            <i
                                className="fa fa-upload modal-icon modal-icon-success"
                                aria-hidden="true"
                            ></i>

                            <input
                                className="form-control form-control-sm"
                                type="file"
                                accept=".csv"
                                onChange={(e) => handleFileUpload(e)}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={(e) => toastResultCSV(e)}
                            >
                                Import
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div
                className="modal"
                id="addStudentModalSingle"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h4 className="modal-title">Edit User Information</h4>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <label className="control-label float-left mt-2 black-text">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <label className="control-label float-left mt-2 black-text">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <label className="control-label float-left mt-2 black-text">Student Number</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={studentNumber}
                                onChange={e => setStudentNumber(e.target.value)}
                            />
                            <label className="control-label float-left mt-2 black-text">User ID</label>
                            <input
                                type="email"
                                className="form-control"
                                defaultValue={userid}
                                onChange={e => setUserid(e.target.value)}
                            />
                            <label className="control-label float-left mt-2 black-text">Email</label>

                            <input
                                type="text"
                                className="form-control"
                                defaultValue={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label className="control-label float-left mt-2 black-text">Contact Number</label>

                            <input
                                type="number"
                                className="form-control"
                                defaultValue={contactNumber}
                                pattern="\d{8}"
                                required
                                onChange={e => setContactNumber(e.target.value)}
                            />

                            <label className="control-label float-left mt-2 black-text">Programme</label>

                            <select className="form-select" aria-label="Default select example"
                                defaultValue={programme} onChange={e => setProgramme(e.target.value)}
                            >
                                <option value="">Please select an option</option>
                                <option value="Bachelor of Business">Bachelor of Business</option>
                                <option value="Bachelor of Computing">Bachelor of Computing</option>
                                <option value="Bachelor of Dentistry">Bachelor of Dentistry</option>
                                <option value="Bachelor of Engineering">Bachelor of Engineering</option>
                                <option value="Bachelor of Law">Bachelor of Law</option>
                                <option value="Bachelor of Music">Bachelor of Music</option>
                                <option value="Bachelor of Nursing">Bachelor of Nursing</option>
                                <option value="Bachelor of Pharmacy">Bachelor of Pharmacy</option>
                                <option value="Bachelor of Science">Bachelor of Science</option>
                            </select>


                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                                onClick={e => toastResultSingle(e)}
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>



        </Fragment>
    );
};

export default AddStudentList;