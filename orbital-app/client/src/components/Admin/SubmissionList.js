import { Fragment, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import EditStudentList from './EditStudentList'
import LoadingSpinner from '../LoadingSpinner'
import DataTable from 'react-data-table-component';

const SubmissionList = () => {
    const [submission, setSubmissions] = useState([]);
    const [deleteSubmission, setDeleteSubmission] = useState();
    const [isLoading, setLoading] = useState(true);

    const columns = [
        {
            name: 'Project Name',
            selector: row => row.teamname,
            sortable: true,
            width: "150px",

        },
        {
            name: 'Team Member 1',
            selector: row => row.teammember1,
            sortable: true,
            width: "200px",
        },
        {
            name: 'Team Member 2',
            selector: row => row.teammember2,
            sortable: true,
            width: "200px",

        },
        {
            name: 'Milestone',
            selector: row => row.milestone,
            sortable: true,
            width: "120px",
        },
        {
            name: 'Video',
            selector: row => row.video,
            sortable: true,
            width: "220px",
        },
        {
            name: 'README',
            selector: row => row.readme,
            sortable: true,
            width: "220px",
        },
        {
            name: 'Project Log',
            selector: row => row.project_log,
            sortable: true,
            width: "220px",
        },
        {
            name: '',
            sortable: false,
            cell: row => <>

                <button
                    className="btn-small btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    onClick={() => setDeleteSubmission(row)}
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>

                <div
                    className="modal"
                    id="deleteModal"
                >
                    <div className="modal-dialog modal-dialog-centered modal-sm">
                        <div className="modal-content ">
                            <div className="modal-body">
                                <i
                                    className="fa fa-exclamation-triangle modal-icon modal-icon-danger"
                                    aria-hidden="true"
                                ></i>
                                <h6>Confirm deletion?</h6>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={() => deleteSubmissions(deleteSubmission.project_id, deleteSubmission.milestone)}
                                >
                                    Delete
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
            </>
        }
    ];


    const [filterText, setFilterText] = useState('');
    const filteredSubmission = submission.filter(
        item => (item.project_id && item.project_id.toLowerCase().includes(filterText.toLowerCase()))
            || (item.milestone && item.milestone.toLowerCase().includes(filterText.toLowerCase()))
            || (item.video && item.video.toLowerCase().includes(filterText.toLowerCase()))
            || (item.readme && item.readme.toLowerCase().includes(filterText.toLowerCase()))
            || (item.project_log && item.project_log.toLowerCase().includes(filterText.toLowerCase()))
    );

    const deleteSubmissions = async (project_id, milestone) => {
        try {
            const deleteSubmission = await fetch(`/submissions/del/${project_id}/${milestone}`, {
                method: "DELETE"
            });

            toast.success('Submission is successfully deleted!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });

            setSubmissions(submission.filter(submission => submission.project_id !== project_id && submission.milestone !== milestone));

            return deleteSubmission;
        } catch (err) {
            // console.error(err.message);
        }
    };

    const getTeamInfo = async (projectid) => {
        try {
            const response = await fetch(`/projects/projectid/${projectid}`);
            const jsonData = await response.json();
            const teamList = [jsonData.teamname, await getMemberName(jsonData.teammember1), await getMemberName(jsonData.teammember2)]
            return (teamList);
        } catch (err) {
            console.error(err.message);
        }
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

    const getSubmissions = async () => {
        try {
            const response = await fetch("/submissions");
            const jsonData = await response.json();
            for (let i = 0; i < jsonData.rows.length; i++) {
                const teamInfo = await getTeamInfo(jsonData.rows[i].project_id);
                jsonData.rows[i].teamname = teamInfo[0];
                jsonData.rows[i].teammember1 = teamInfo[1];
                jsonData.rows[i].teammember2 = teamInfo[2];
            }
            
            setLoading(false);
            setSubmissions(jsonData.rows);
        } catch (err) {
            // console.error(err.message);
        }
    };

    useEffect(() => {
        getSubmissions();
    });


    return (
        <Fragment>
            <main className="pt-5 mx-lg-5 my-5">
                <div className="card blue white-text mb-3">
                    {/*Card content*/}
                    <div className="card-body d-sm-flex justify-content-between">
                        <div className="panel box-shadow-none content-header">
                            <div className="panel-body">
                                <div className="col-md-12">
                                    <h3 className="mb-0">Submissions</h3>
                                </div>
                            </div>
                        </div>
                        <div >
                            <input type="text" className="searchBtn" placeholder="Search" onChange={e => setFilterText(e.target.value)} defaultValue={filterText} />
                        </div>
                    </div>
                </div>
                {isLoading ? <LoadingSpinner /> : <> {submission.length !== 0 ?
                    < div className="card" >
                        < div className="card-body" ><div className="chartjs-size-monitor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div className="chartjs-size-monitor-expand" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '1000000px', height: '1000000px', left: 0, top: 0 }} /></div><div className="chartjs-size-monitor-shrink" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '200%', height: '200%', left: 0, top: 0 }} /></div></div>
                            <DataTable
                                columns={columns}
                                data={filteredSubmission}
                                customStyles={{
                                    cells: {
                                        style: {
                                            textAlign: "center",
                                        },
                                    },
                                    headCells: {
                                        style: {
                                            fontSize: "13px",
                                            textAlign: "center",
                                        },
                                    },
                                }}
                                pagination
                                paginationComponentOptions={{
                                    selectAllRowsItem: true,
                                }}
                            />
                        </div >
                    </div >
                    : <>
                        <div className='emptyProject mt-5'>
                            <p>There are currently no submissions.</p>
                        </div>
                    </>
                }</>}
            </main>
        </Fragment>
    );
};

export default SubmissionList;