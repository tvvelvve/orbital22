import { Fragment, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import EditStudentList from './EditStudentList'
import AddStudentList from './AddStudentList'
import LoadingSpinner from '../LoadingSpinner'
import DataTable from 'react-data-table-component';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [deleteUser, setDeleteUser] = useState();
    const [isLoading, setLoading] = useState(true);

    const columns = [
        {
            name: 'First Name',
            selector: row => row.firstname,
            sortable: true,
            width: "120px",

        },
        {
            name: 'Last Name',
            selector: row => row.lastname,
            sortable: true,
            width: "120px",
        },
        {
            name: 'Student Number',
            selector: row => row.studentnumber,
            sortable: true,
            width: "150px",

        },
        {
            name: 'User ID',
            selector: row => row.userid,
            sortable: true,
            width: "100px",
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Contact Number',
            selector: row => row.contactnumber,
            sortable: true,
        },
        {
            name: 'Programme',
            selector: row => row.programme,
            sortable: true,
        },
        {
            name: '',
            sortable: false,
            cell: row => <>

                <EditStudentList user={row} />

                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;

                <button
                    className="btn-small btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    onClick={() => setDeleteUser(row)}
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
                                <h6>Confirm deleting {deleteUser !== undefined ? deleteUser.firstname : ''}?</h6>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={() => deleteUsers(deleteUser.id)}
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
    const filteredUsers = users.filter(
        item => (item.firstname && item.firstname.toLowerCase().includes(filterText.toLowerCase()))
            || (item.lastname && item.lastname.toLowerCase().includes(filterText.toLowerCase()))
            || (item.studentnumber && item.studentnumber.toLowerCase().includes(filterText.toLowerCase()))
            || (item.userid && item.userid.toLowerCase().includes(filterText.toLowerCase()))
            || (item.email && item.email.toLowerCase().includes(filterText.toLowerCase()))
            || (item.contactnumber && item.contactnumber.toLowerCase().includes(filterText.toLowerCase()))
            || (item.programme && item.programme.toLowerCase().includes(filterText.toLowerCase()))
    );

    const deleteUsers = async id => {
        try {
            const deleteUser = await fetch(`/users/del/${id}`, {
                method: "DELETE"
            });

            toast.success('User is successfully deleted!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });

            setUsers(users.filter(user => user.id !== id));

            return deleteUser;
        } catch (err) {
            // console.error(err.message);
        }
    };

    const getUsers = async () => {
        try {
            const response = await fetch("/users/students");
            const jsonData = await response.json();

            setLoading(false);
            setUsers(jsonData.rows);
        } catch (err) {
            // console.error(err.message);
        }
    };

    useEffect(() => {
        getUsers();
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
                                    <h3 className="mb-0">Students Information</h3>
                                </div>
                            </div>
                        </div>
                        <div >
                            <input type="text" className="searchBtn" placeholder="Search" onChange={e => setFilterText(e.target.value)} defaultValue={filterText} />
                            <AddStudentList />
                        </div>
                    </div>
                </div>
                {isLoading ? <LoadingSpinner /> : <> {users.length !== 0 ?
                    < div className="card" >
                        < div className="card-body" ><div className="chartjs-size-monitor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div className="chartjs-size-monitor-expand" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '1000000px', height: '1000000px', left: 0, top: 0 }} /></div><div className="chartjs-size-monitor-shrink" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '200%', height: '200%', left: 0, top: 0 }} /></div></div>
                            <DataTable
                                columns={columns}
                                data={filteredUsers}
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
                        <div className='emptyProject'>
                            <p>There are no active students.</p>
                        </div>
                    </>
                }</>}
            </main>
        </Fragment>
    );
};

export default UserList;