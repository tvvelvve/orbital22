import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner'

const UserSubmission = () => {
    const [team, setTeam] = useState([]);
    const [submission, setSubmission] = useState([]);
    const [userid, setUserId] = useState([]);
    const [poster, setPoster] = useState();
    const [video, setVideo] = useState();
    const [README, setREADME] = useState();
    const [projectLog, setProjectLog] = useState();
    const [milestone, setMilestone] = useState(1);
    const [hasTeam, setHasTeam] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isValidPoster, setValidPoster] = useState(false);

    async function getTeam(userid) {
        try {

            const response = await fetch(`/projects/userid/${userid}`);
            const parseRes = await response.json();

            parseRes.teammember1 = await getMemberName(parseRes.teammember1)
            parseRes.teammember2 = await getMemberName(parseRes.teammember2)

            setTeam(parseRes);
            setHasTeam(true);
            checkIfSubmissionExist(parseRes.id, milestone);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error(err.message);
        }
    }

    async function checkIfSubmissionExist(project_id, milestone) {
        try {
            const response = await fetch(`/submissions/${project_id}/${milestone}`);
            const parseRes = await response.json();

            if (parseRes.rowCount === 0) {
                setSubmission([]);
                setPoster()
                setVideo()
                setREADME()
                setProjectLog()
                return false;
            } else {
                setSubmission(parseRes.rows[0]);
                setPoster(parseRes.rows[0].poster)
                setVideo(parseRes.rows[0].video)
                setREADME(parseRes.rows[0].readme)
                setProjectLog(parseRes.rows[0].project_log)
                return true;
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    async function posterValidation() {
        if (isValidPoster) {
            try {
                const body = { poster };
                const response = await fetch(
                    `/projects/poster/${userid}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    }
                );

                const parseRes = await response.json();

                return true;
            } catch (err) {
                console.error(err.message);
                return false;
            }
        } else {
            if (poster !== undefined) {
                toast.error("Ensure image size is within 860px x 1200px", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                return false;
            } else {
                toast.error("Please upload an image", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                return false;
            }
        }
    };

    const updateSubmission = async e => {
        e.preventDefault();
        const validPoster = await posterValidation()
        if (validPoster) {
            if (validSite(video) || validSite(README) || validSite(projectLog)) {
                const exist = await checkIfSubmissionExist(team.id, milestone)
                console.log(exist);
                if (exist) {
                    //update
                    try {
                        const body = { poster, video, README, projectLog };
                        console.log(README);
                        const response = await fetch(
                            `/submissions/update/${team.id}/${milestone}`,
                            {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(body)
                            }
                        );

                        const parseRes = await response.json();

                        toast.success('Submission updated!', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                        });


                    } catch (err) {
                        console.error(err.message);
                        return false;
                    }
                } else {
                    //insert
                    const project_id = team.id;
                    const body = { project_id, milestone, poster, video, README, projectLog };


                    const response = await fetch(
                        "/submissions/create",
                        {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(body)
                        }
                    );

                    const parseRes = await response.json();

                    toast.success('Video link created!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                }

            } else {
                if (video !== undefined || README !== undefined || projectLog !== undefined) {
                    toast.error("Ensure links are valid and starts with http", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                } else {
                    toast.error("Please fill up your links", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                }
            }
        }
    };

    function getBase64(e) {
        var file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {

            //Initiate the JavaScript Image object.
            var image = new Image();

            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;

            //Validate the File Height and Width.
            image.onload = function (e) {
                var height = this.height;
                var width = this.width;
                if (height > 1200 || width > 860) {
                    toast.error("Ensure image size is within 860px x 1200px", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    setValidPoster(false);
                    return;
                }
                setPoster(reader.result);
                setValidPoster(true);
                return;
            };
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    };

    function validSite(site) {
        var siteRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/
        return siteRegex.test(site);
    }

    const getMemberName = async (userid) => {
        try {
            const response = await fetch(`/users/students/${userid}`);
            const jsonData = await response.json();
            return (jsonData.rows[0].firstname + " " + jsonData.rows[0].lastname);
        } catch (err) {
            console.error(err.message);
        }
    };

    function changeMilestone(milestone) {
        checkIfSubmissionExist(team.id, milestone);
        setMilestone(milestone);
        // console.log(milestone);
        // console.log(submission);
    };

    useEffect(() => {
        async function getUserId() {
            try {
                const response = await fetch("/users/me", {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                setUserId(parseRes.userid);
                getTeam(parseRes.userid);
            } catch (err) {
                console.error(err.message);
            }
        }
        getUserId();
    }, []);

    if (hasTeam === false) {
        return (
            <>
                <div className='emptyProject'>
                    <p>You are currently not in a project.</p>
                </div>
            </>
        )
    }
    else {
        return (
            <> {
                isLoading ? <LoadingSpinner /> :
                    <>
                        <main className="pt-5 mx-lg-5 my-5">
                            <div className='row'>
                                <div className='col-md-4' onClick={() => changeMilestone(1)}>
                                    <a href="/#" style={milestone !== 1 ? { pointerEvents: "none" } : {}}>
                                        <Milestone1 milestone={milestone} />
                                    </a>
                                </div>

                                <div className='col-md-4' onClick={() => changeMilestone(2)}>
                                    <a href="/#" style={milestone !== 2 ? { pointerEvents: "none" } : {}}>
                                        <Milestone2 milestone={milestone} />
                                    </a>
                                </div>


                                <div className='col-md-4' onClick={() => changeMilestone(3)}>
                                    <a href="/#" style={milestone !== 3 ? { pointerEvents: "none" } : {}}>
                                        <Milestone3 milestone={milestone} />
                                    </a>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    {/* <img src={poster} key={poster} height="360" width="258" /> */}
                                    <label className="control-label float-left mt-2">Poster</label>
                                    <br />
                                    <br />
                                    <input type="file" className="input-file" name="imgUpload" accept='image/*' onChange={e => getBase64(e)} />

                                    <br />




                                    <form>
                                        <label className="control-label float-left mt-2">Video Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={submission.video}
                                            onChange={e => setVideo(e.target.value)}
                                        />

                                        <br />

                                        <label className="control-label float-left mt-2">README Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={submission.readme}
                                            onChange={e => setREADME(e.target.value)}
                                        />

                                        <br />

                                        <label className="control-label float-left mt-2">Project Log Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={submission.project_log}
                                            onChange={e => setProjectLog(e.target.value)}
                                        />

                                        <br />

                                        <button onClick={e => updateSubmission(e)}>Submit</button>

                                        <br />
                                        <br />

                                    </form>

                                </div>
                            </div>




                        </main>
                    </>
            }
            </>
        )
    }
}


const Milestone1 = ({ milestone }) => {
    if (milestone !== 1) {
        return (
            <div className="card grey white-text mb-3">
                {/*Card content*/}
                <div className="card-body d-sm-flex justify-content-between">
                    <div className="panel box-shadow-none content-header">
                        <div className="panel-body">
                            <div className="col-md-12">
                                <h4>Milestone 1</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    } else {
        return (
            <div className="card blue white-text mb-3">
                {/*Card content*/}
                <div className="card-body d-sm-flex justify-content-between">
                    <div className="panel box-shadow-none content-header">
                        <div className="panel-body">
                            <div className="col-md-12">
                                <h4>Milestone 1</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}



const Milestone2 = ({ milestone }) => {
    if (milestone !== 2) {
        return (
            <div className="card grey white-text mb-3">
                {/*Card content*/}
                <div className="card-body d-sm-flex justify-content-between">
                    <div className="panel box-shadow-none content-header">
                        <div className="panel-body">
                            <div className="col-md-12">
                                <h4>Milestone 2</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    } else {
        return (
            <div className="card blue white-text mb-3">
                {/*Card content*/}
                <div className="card-body d-sm-flex justify-content-between">
                    <div className="panel box-shadow-none content-header">
                        <div className="panel-body">
                            <div className="col-md-12">
                                <h4>Milestone 2</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}



const Milestone3 = ({ milestone }) => {
    if (milestone !== 3) {
        return (
            <div className="card grey white-text mb-3">
                {/*Card content*/}
                <div className="card-body d-sm-flex justify-content-between">
                    <div className="panel box-shadow-none content-header">
                        <div className="panel-body">
                            <div className="col-md-12">
                                <h4>Milestone 3</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    } else {
        return (
            <div className="card blue white-text mb-3">
                {/*Card content*/}
                <div className="card-body d-sm-flex justify-content-between">
                    <div className="panel box-shadow-none content-header">
                        <div className="panel-body">
                            <div className="col-md-12">
                                <h4>Milestone 3</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default UserSubmission