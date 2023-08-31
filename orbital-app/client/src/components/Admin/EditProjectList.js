import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const EditProjectList = ({ project }) => {
    const [teamName, setTeamName] = useState();
    const [teamMember1, setTeamMember1] = useState();
    const [teamMember2, setTeamMember2] = useState();
    const [teamAdvisor, setTeamAdvisor] = useState();
    const [achievement, setAchievement] = useState();
    const [oldTeamMember1, setOldTeamMember1] = useState();
    const [oldTeamMember2, setOldTeamMember2] = useState();

    const checkUniqueMembers = async (userid) => {
        try {
            const response = await fetch(`/projects/members`);
            const jsonData = await response.json();
            var count;

            if (userid === oldTeamMember1 || userid === oldTeamMember2) {
                count = -1;
            } else {
                count = 0;

            }

            for (let i = 0; i < jsonData.length; i++) {
                if (jsonData[i].unnest === userid) {
                    count++;
                }
            }

            if (count === 0) {
                return false;
            } else {
                return true;
            }
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

    const updateProject = async e => {
        e.preventDefault();
        try {
            const body = { teamName, teamMember1, teamMember2, teamAdvisor, achievement };
            const duplicate = await checkUniqueMembers(teamMember1) || await checkUniqueMembers(teamMember2);
            const exist = await checkStudentExist(teamMember1) && await checkStudentExist(teamMember2);

            if (exist) {
                if (!duplicate) {
                    const response = await fetch(
                        `/projects/update/${project.id}`,
                        {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        }
                    );

                    const parseRes = await response.json();
                    if (parseRes === "Project was updated!") {
                        toast.success('Successfully edited project', {
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
                } else {
                    toast.error("Error editing members: Student already in a team", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                }
            } else {
                toast.error("Error editing members: Student does not exist", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (err) {
            console.error(err.message);
            return false;
        }
    };

    useEffect(() => {
        const getCurrentProject = async () => {
            try {
                const response = await fetch(`/projects/id/${project.id}`);
                const jsonData = await response.json();

                setTeamName(jsonData.teamname);
                setTeamMember1(jsonData.teammember1);
                setTeamMember2(jsonData.teammember2);
                setOldTeamMember1(jsonData.teammember1);
                setOldTeamMember2(jsonData.teammember2);
                setTeamAdvisor(jsonData.teamadvisor);
                setAchievement(jsonData.achievement);
            } catch (err) {
                // console.error(err.message);
            }
        };

        getCurrentProject();
    }, []);

    return (
        <Fragment>
            <button
                type="button"
                className="btn-small btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#projectid${project.id}`}
            >
                <i className="fa fa-edit" aria-hidden="true"></i>
            </button>

            {/* 
        id = id10
      */}
            <div
                className="modal"
                id={`projectid${project.id}`}
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
                            <label className="control-label float-left mt-2">Team Name</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={teamName}
                                onChange={e => setTeamName(e.target.value)}
                            />
                            <label className="control-label float-left mt-2">Team Member 1</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={teamMember1}
                                onChange={e => setTeamMember1(e.target.value)}
                            />
                            <label className="control-label float-left mt-2">Team Member 2</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={teamMember2}
                                onChange={e => setTeamMember2(e.target.value)}
                            />
                            <label className="control-label float-left mt-2">Team Advisor</label>
                            <input
                                type="email"
                                className="form-control"
                                defaultValue={teamAdvisor}
                                onChange={e => setTeamAdvisor(e.target.value)}
                            />

                            <label className="control-label float-left mt-2">Achievement</label>

                            <select className="form-select" aria-label="Default select example" defaultValue={achievement} onChange={e => setAchievement(e.target.value)}>
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
                                onClick={e => updateProject(e)}
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

export default EditProjectList;