import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const [isEditable, setEditable] = useState(true);
    const [me, setMe] = useState({
        firstname: "",
        lastname: "",
        contactnumber: "",
        email: "",
        studentnumber: "",
        userid: "",
        programme: ""
    });

    const { firstname, lastname, studentnumber, userid, email, contactnumber, programme } = me;

    const onSubmitProfileForm = async e => {
        e.preventDefault();
        const firstName = firstname;
        const lastName = lastname;
        const studentNumber = studentnumber;
        const contactNumber = contactnumber;
        try {
            const body = { firstName, lastName, studentNumber, userid, email, contactNumber, programme };
            console.log(JSON.stringify(body));
            const response = await fetch(
                `/users/update/${me.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }

            );
            const parseRes = await response.json();
            if (parseRes === "User was updated!") {
                toast.success('Profile successfully updated', {
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

    useEffect(() => {
        async function getUserId() {
            try {
                const response = await fetch("/users/me", {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();

                console.log(parseRes);
                setMe(parseRes);
            } catch (err) {
                console.error(err.message);
            }
        }
        getUserId();
    }, []);

    const onChange = e => {
        setMe({ ...me, [e.target.name]: e.target.value });
    };
    return (
        <>
            <main className="pt-5 mx-lg-5 my-5">
                <div className="col d-flex justify-content-center">
                    <div className="card py-2" style={{ width: '600px' }}>
                        <div className="card-body">
                            <h2>My Profile</h2>
                            <form onSubmit={isEditable ? onSubmitProfileForm : null}>
                                <div class="input-group">

                                    <div>
                                        <label className="control-label float-left mt-2">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstname"
                                            defaultValue={firstname}
                                            readOnly={isEditable}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>

                                    &nbsp;
                                    &nbsp;

                                    <div>
                                        <label className="control-label float-left mt-2">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastname"
                                            defaultValue={lastname}
                                            readOnly={isEditable}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>

                                </div>

                                <br />

                                <label className="control-label float-left mt-2">Contact Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="contactnumber"
                                    defaultValue={contactnumber}
                                    readOnly={isEditable}
                                />

                                <br />

                                <label className="control-label float-left mt-2">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    defaultValue={email}
                                    readOnly={isEditable}
                                />

                                <br />

                                <label className="control-label float-left mt-2">Student Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="studentnumber"
                                    defaultValue={studentnumber}
                                    readOnly
                                    onChange={(e) => onChange(e)} />

                                <br />


                                <label className="control-label float-left mt-2">User ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="userid"
                                    defaultValue={userid}
                                    readOnly
                                    onChange={(e) => onChange(e)} />


                                <br />

                                <label className="control-label float-left mt-2">Programme</label>
                                <select className="form-select" aria-label="Default select example" name="programme" defaultValue={programme} disabled={true} onChange={(e) => onChange(e)}>
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

                                <br />

                                <button type="submit" onClick={() => setEditable(prevState => !prevState)}>{isEditable ? 'Edit' : 'Submit'}</button>


                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default UserProfile