import { Fragment, useState } from "react";
import Papa from "papaparse";
import { toast } from 'react-toastify';

const AddProjectList = () => {
    const [csv, setCsv] = useState([]);
    const [validCsv, setValidCsv] = useState(false);
    const [teamName, setTeamName] = useState();
    const [teamMember1, setTeamMember1] = useState();
    const [teamMember2, setTeamMember2] = useState();
    const [teamAdvisor, setTeamAdvisor] = useState();
    const [achievement, setAchievement] = useState();

    const handleFileUpload = (e) => {
        const files = e.target.files;
        if (files) {
            Papa.parse(files[0], {
                complete: function (results) {
                    if (results.data[0][0] === "Team Name" && results.data[0][1] === "Team Member 1" && results.data[0][2] === "Team Member 2"
                        && results.data[0][3] === "Team Advisor" && results.data[0][4] === "Achievement") {
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

    const checkUniqueMembers = async (userid) => {
        try {
            const response = await fetch(`/projects/members`);
            const jsonData = await response.json();

            for (let i = 0; i < jsonData.length; i++) {
                if (jsonData[i].unnest === userid) {
                    return true;
                }
            }
            return false;
        } catch (err) {
            console.error(err.message);
        }
    };

    const checkStudentExist = async (userid) => {
        try {
            const response = await fetch(`/users`);
            const jsonData = await response.json();

            for (let i = 0; i < jsonData.rows.length; i++) {
                if (userid === jsonData.rows[i].userid) {
                    return true;
                }
            }
            return false;
        } catch (err) {
            console.error(err.message);
        }
    };

    const addProjectList = async (e, teamName, teamMember1, teamMember2, teamAdvisor, achievement) => {
        e.preventDefault();
        try {
            const body = { teamName, teamMember1, teamMember2, teamAdvisor, achievement };
            const duplicate = await checkUniqueMembers(teamMember1) || await checkUniqueMembers(teamMember2);
            const exist = await checkStudentExist(teamMember1) && await checkStudentExist(teamMember2);

            if (exist) {
                if (!duplicate) {
                    const response = await fetch(
                        "/projects/create",
                        {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(body)
                        }
                    );

                    const parseRes = await response.json();


                    if (parseRes.newProject) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            console.error(err.message);
            return false;
        }
    };


    const csvToPSQL = async (e) => {
        var error = false;
        for (let i = 0; i < csv.length; i++) {
            var result = await addProjectList(e, csv[i][0], csv[i][1], csv[i][2], csv[i][3], csv[i][4]);
            if (result === false) {
                error = true;
            }
        }
        return !error;
    }

    const toastResultSingle = async e => {
        const result = await addProjectList(e, teamName, teamMember1, teamMember2, teamAdvisor, achievement);

        if (result === true) {
            toast.success(`Succesfully added ${teamName}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } else {
            toast.error(`Error adding ${teamName}`, {
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
                    toast.success('Successfully imported projects', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                } else {
                    toast.error("Error importing projects", {
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
                data-bs-target="#addProjectModal"
            >
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>

            <div
                className="modal"
                id="addProjectModal"
            >
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content ">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title">Add Project</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="span2 p-20">
                                <button
                                    type="button"
                                    className="btn btn-success btn-block"
                                    data-bs-toggle="modal" data-bs-target="#addProjectModalSingle"
                                >
                                    Single Add
                                </button>

                                <br />

                                <button
                                    className="btn btn-warning btn-block"
                                    data-bs-toggle="modal" data-bs-target="#addProjectModalCSV"
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
                id="addProjectModalCSV"
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
                id="addProjectModalSingle"
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
                            <label className="control-label float-left mt-2 black-text">Team Name</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={teamName}
                                onChange={e => setTeamName(e.target.value)}
                            />
                            <label className="control-label float-left mt-2 black-text">Team Member 1  <small>(User ID)</small> </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={teamMember1}
                                onChange={e => setTeamMember1(e.target.value)}
                            />
                            <label className="control-label float-left mt-2 black-text">Team Member 2 <small>(User ID)</small></label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={teamMember2}
                                onChange={e => setTeamMember2(e.target.value)}
                            />
                            <label className="control-label float-left mt-2 black-text">Team Advisor</label>
                            <input
                                type="email"
                                className="form-control"
                                defaultValue={teamAdvisor}
                                onChange={e => setTeamAdvisor(e.target.value)}
                            />

                            <label className="control-label float-left mt-2 black-text">Achievement</label>

                            <select className="form-select" aria-label="Default select example" defaultValue={achievement} onChange={e => setAchievement(e.target.value)}>
                                <option value="">Please select an option</option>
                                <option value="artemis">Artemis</option>
                                <option value="apollo11">Apollo 11</option>
                                <option value="gemini">Gemini</option>
                                <option value="vostok">Vostok</option>
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

export default AddProjectList;