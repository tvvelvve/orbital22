import React, { Fragment, useState } from "react";
import { toast } from 'react-toastify';

const EditStudentList = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [studentNumber, setStudentNumber] = useState(user.studentnumber);
    const [userid, setUserid] = useState(user.userid);
    const [email, setEmail] = useState(user.email);
    const [contactNumber, setContactNumber] = useState(user.contactnumber);
    const [programme, setProgramme] = useState(user.programme);

    const updateUser = async e => {
        e.preventDefault();
        try {
            const body = { firstName, lastName, studentNumber, userid, email, contactNumber, programme };
            const response = await fetch(
                `/users/update/${user.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }

            );
            const parseRes = await response.json();
            if (parseRes === "User was updated!") {
                toast.success('Successfully edited student', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } else {
                toast.error(parseRes, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                
                return false;
            }
        } catch (err) {
            // console.error(err.message);
            return false;
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn-small btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#userid${user.id}`}
            >
                <i className="fa fa-edit" aria-hidden="true"></i>
            </button>

            {/* 
        id = id10
      */}
            <div
                className="modal"
                id={`userid${user.id}`}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
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
                            <label className="control-label float-left mt-2">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <label className="control-label float-left mt-2">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <label className="control-label float-left mt-2">Student Number</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={studentNumber}
                                onChange={e => setStudentNumber(e.target.value)}
                            />
                            <label className="control-label float-left mt-2">User ID</label>
                            <input
                                type="email"
                                className="form-control"
                                defaultValue={userid}
                                onChange={e => setUserid(e.target.value)}
                            />
                            <label className="control-label float-left mt-2">Email</label>

                            <input
                                type="text"
                                className="form-control"
                                defaultValue={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label className="control-label float-left mt-2">Contact Number</label>

                            <input
                                type="number"
                                className="form-control"
                                defaultValue={contactNumber}
                                pattern="\d{8}"
                                required
                                onChange={e => setContactNumber(e.target.value)}
                            />

                            <label className="control-label float-left mt-2">Programme</label>

                            <select className="form-select" aria-label="Default select example" defaultValue={programme} onChange={e => setProgramme(e.target.value)}>
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
                                onClick={e => updateUser(e)}
                            >
                                Edit
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

export default EditStudentList;