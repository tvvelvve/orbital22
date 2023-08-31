import { Fragment, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import EditProjectList from './EditProjectList'
import AddProjectList from './AddProjectList'
import LoadingSpinner from '../LoadingSpinner'
import DataTable from 'react-data-table-component';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [deleteProject, setDeleteProject] = useState();
    const [isLoading, setLoading] = useState(true);

    const columns = [
        {
            name: 'Team Name',
            selector: row => row.teamname,
            sortable: true,
        },
        {
            name: 'Team Member 1',
            selector: row => row.teammember1,
            sortable: true,
        },
        {
            name: 'Team Member 2',
            selector: row => row.teammember2,
            sortable: true,

        },
        {
            name: 'Team Advisor',
            selector: row => row.teamadvisor,
            sortable: true,
        },
        {
            name: 'Achievement',
            selector: row => row.achievement,
            sortable: true,
        },
        {
            name: '',
            sortable: false,
            cell: row => <>

                <EditProjectList project={row} />

                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;

                <button
                    className="btn-small btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    onClick={() => setDeleteProject(row)}
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
                                <h6>Confirm deleting {deleteProject !== undefined ? deleteProject.teamname : ''}?</h6>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={() => deleteProjects(deleteProject.id)}
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
                </div></>,
        }
    ];


    const [filterText, setFilterText] = useState('');
    const filteredProjects = projects.filter(
        item => (item.teamname && item.teamname.toLowerCase().includes(filterText.toLowerCase()))
            || (item.teammember1 && item.teammember1.toLowerCase().includes(filterText.toLowerCase()))
            || (item.teammember2 && item.teammember2.toLowerCase().includes(filterText.toLowerCase()))
            || (item.teamadvisor && item.teamadvisor.toLowerCase().includes(filterText.toLowerCase()))
            || (item.achievement && item.achievement.toLowerCase().includes(filterText.toLowerCase()))
    );

    const deleteProjects = async id => {
        try {
            const deleteProject = await fetch(`/projects/del/${id}`, {
                method: "DELETE"
            });

            toast.success('Project is successfully deleted!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });

            setProjects(projects.filter(project => project.id !== id));

            return deleteProject;
        } catch (err) {
            console.error(err.message);
        }
    };

    const getMemberName = async (userid) => {
        try {
            const response = await fetch(`/users/students/${userid}`);
            const jsonData = await response.json();

            return (jsonData.rows[0].firstname + " " + jsonData.rows[0].lastname);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await fetch("/projects");
                const jsonData = await response.json();
                for (let i = 0; i < jsonData.rows.length; i++) {
                    jsonData.rows[i].teammember1 = await getMemberName(jsonData.rows[i].teammember1)
                    jsonData.rows[i].teammember2 = await getMemberName(jsonData.rows[i].teammember2)
                }
    
                setLoading(false);
                setProjects(jsonData.rows);
            } catch (err) {
                console.error(err.message);
            }
        };
        setInterval(function () { getProjects(); }, 2000)
    }, []);

    return (
        <Fragment>
            <main className="pt-5 mx-lg-5 my-5">
                <div className="card blue white-text mb-3">
                    {/*Card content*/}
                    <div className="card-body d-sm-flex justify-content-between">
                        <div className="panel box-shadow-none content-header">
                            <div className="panel-body">
                                <div className="col-md-12">
                                    <h3 className="mb-0">Project Information</h3>
                                </div>
                            </div>
                        </div>
                        <div >
                            <input type="text" className="searchBtn" placeholder="Search" onChange={e => setFilterText(e.target.value)} defaultValue={filterText} />
                            <AddProjectList />
                        </div>
                    </div>
                </div>
                {isLoading ? <LoadingSpinner /> : <>{projects.length !== 0 ?
                    <div className="card">
                        <div className="card-body"><div className="chartjs-size-monitor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div className="chartjs-size-monitor-expand" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '1000000px', height: '1000000px', left: 0, top: 0 }} /></div><div className="chartjs-size-monitor-shrink" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '200%', height: '200%', left: 0, top: 0 }} /></div></div>
                            <DataTable
                                columns={columns}
                                data={filteredProjects}
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
                        </div>
                    </div> :
                    <>
                        <div className='emptyProject'>
                            <p>There are no projects available.</p>
                        </div>
                    </>
                }</>}

            </main>
        </Fragment>
    );
};

export default ProjectList;