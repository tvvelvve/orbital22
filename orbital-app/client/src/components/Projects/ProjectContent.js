import { useState, useEffect } from "react";
import artemis from "../../images/artemis.png"
import apollo11 from "../../images/apollo11.png"
import gemini from "../../images/gemini.png"
import vostok from "../../images/vostok.png"

const ProjectContent = ({ teamName, teamID, teamMember1, teamMember2, teamAdvisor, achievement, poster, video }) => {
    const [teamMemberName1, setTeamMemberName1] = useState();
    const [teamMemberName2, setTeamMemberName2] = useState();

    const getMemberName = async (teamMember1, teamMember2) => {
        try {
            const responseTM1 = await fetch(`/users/students/${teamMember1}`);
            const jsonDataTM1 = await responseTM1.json();

            var teamMemberName1 = await jsonDataTM1.rows[0].firstname + " " + await jsonDataTM1.rows[0].lastname;
            setTeamMemberName1(teamMemberName1);

            const responseTM2 = await fetch(`/users/students/${teamMember2}`);
            const jsonDataTM2 = await responseTM2.json();

            var teamMemberName2 = await jsonDataTM2.rows[0].firstname + " " + await jsonDataTM2.rows[0].lastname;
            setTeamMemberName2(teamMemberName2);

        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getMemberName(teamMember1, teamMember2);
    }, []);

    if (achievement === "artemis") {
        return (
            <>
                <div className="project m-5">
                    <div className="card project-card project-content my-4"
                        style={{ backgroundImage: `url(${artemis})`, backgroundRepeat: `no-repeat`, backgroundSize: `200px`, backgroundPosition: `center` }}>
                        <div className="project-overlay">
                            <div className="white-text">Team ID: {teamID}</div>
                            <br />
                            <div className="white-text">Team Members: <br />
                                {teamMemberName1} <br />
                                {teamMemberName2} <br />
                            </div>
                            <br />
                            <div className="white-text">Advised By: <br />
                                {teamAdvisor}</div>

                            <div className='row text-center'>
                                <div className='col-sm' style={{ display: poster === null ? "none" : "block" }}
                                >
                                    <button
                                        type="button"
                                        className="btn-lg btn-outline-primary mx-auto"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#projectposter${teamID}`}
                                    >
                                        <i className="fa fa-image" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div className='col-sm' style={{ display: video === null ? "none" : "block" }}
                                >
                                    <button
                                        type="button"
                                        className="btn-lg btn-outline-primary mx-auto"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `${video}`;
                                        }}
                                    >
                                        <i className="fa fa-video" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <h4 className="font-weight-bold text-primary text-center">{teamName}</h4>
                </div>

                <div
                    className="modal"
                    id={`projectposter${teamID}`}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-body">
                                    <img src={poster} alt="Poster"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    } else if (achievement === "gemini") {
        return (
            <>
                <div className="project m-5">
                    <div className="card project-card project-content my-4 project-icon"
                        style={{ backgroundImage: `url(${gemini})`, backgroundRepeat: `no-repeat`, backgroundSize: `200px`, backgroundPosition: `center` }}>
                        <div className="project-overlay">
                            <div className="white-text">Team ID: {teamID}</div>
                            <br />
                            <div className="white-text">Team Members: <br />
                                {teamMemberName1} <br />
                                {teamMemberName2} <br />
                            </div>
                            <br />
                            <div className="white-text">Advised By: <br />
                                {teamAdvisor}</div>

                            <div className='row text-center'>
                                <div className='col-sm' style={{ display: poster === null ? "none" : "block" }}
                                >
                                    <button
                                        type="button"
                                        className="btn-lg btn-outline-primary mx-auto"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#projectposter${teamID}`}
                                    >
                                        <i className="fa fa-image" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div className='col-sm' style={{ display: video === null ? "none" : "block" }}
                                >
                                    <button
                                        type="button"
                                        className="btn-lg btn-outline-primary mx-auto"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `${video}`;
                                        }}
                                    >
                                        <i className="fa fa-video" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <h4 className="font-weight-bold text-primary text-center">{teamName}</h4>
                </div>

                <div
                    className="modal"
                    id={`projectposter${teamID}`}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-body">
                                    <img src={poster} alt="Poster"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    } else if (achievement === "apollo11") {
        return (
            <>
                <div className="project m-5">
                    <div className="card project-card project-content my-4 project-icon"
                        style={{ backgroundImage: `url(${apollo11})`, backgroundRepeat: `no-repeat`, backgroundSize: `200px`, backgroundPosition: `center` }}>
                        <div className="project-overlay">
                            <div className="white-text">Team ID: {teamID}</div>
                            <br />
                            <div className="white-text">Team Members: <br />
                                {teamMemberName1} <br />
                                {teamMemberName2} <br />
                            </div>
                            <br />
                            <div className="white-text">Advised By: <br />
                                {teamAdvisor}</div>

                            <br />

                            <div className='row text-center'>
                                <div className='col-sm' style={{ display: poster === null ? "none" : "block" }}
                                >
                                    <button
                                        type="button"
                                        className="btn-lg btn-outline-primary mx-auto"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#projectposter${teamID}`}
                                    >
                                        <i className="fa fa-image" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div className='col-sm' style={{ display: video === null ? "none" : "block" }}
                                >
                                    <button
                                        type="button"
                                        className="btn-lg btn-outline-primary mx-auto"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `${video}`;
                                        }}
                                    >
                                        <i className="fa fa-video" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <h4 className="font-weight-bold text-primary text-center">{teamName}</h4>
                </div>

                <div
                    className="modal"
                    id={`projectposter${teamID}`}
                >
                    <div className="modal-dialog">
                        <img src={poster} alt="Poster"/>
                    </div>
                </div>

            </>
        )
    } else {
        return (
            <>
                <div className="project m-5">
                    <div className="card project-card project-content my-4 project-icon"
                        style={{ backgroundImage: `url(${vostok})`, backgroundRepeat: `no-repeat`, backgroundSize: `200px`, backgroundPosition: `center` }}>
                        <div className="project-overlay">
                            <div className="white-text">Team ID: {teamID}</div>
                            <br />
                            <div className="white-text">Team Members: <br />
                                {teamMemberName1} <br />
                                {teamMemberName2} <br />
                            </div>
                            <br />
                            <div className="white-text">Advised By: <br />
                                {teamAdvisor}</div>

                            <div className='row text-center'>
                                <div className='col-sm' style={{ display: poster === null ? "none" : "block" }}
                                >
                                    <button
                                        type="button"
                                        className="btn-lg btn-outline-primary mx-auto"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#projectposter${teamID}`}
                                    >
                                        <i className="fa fa-image" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div className='col-sm' style={{ display: video === null ? "none" : "block" }}
                                >
                                    <button
                                        type="button"
                                        className="btn-lg btn-outline-primary mx-auto"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `${video}`;
                                        }}
                                    >
                                        <i className="fa fa-video" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 className="font-weight-bold text-primary text-center">{teamName}</h4>
                </div>

                <div
                    className="modal"
                    id={`projectposter${teamID}`}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img src={poster} alt="Poster"/>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}


export default ProjectContent