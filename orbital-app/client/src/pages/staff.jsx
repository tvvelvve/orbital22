import '../css/bootstrap/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../css/homepage.css';
import '../css/staff.css';
import '../css/responsive/resstaffdisplay.css';


import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
import StaffContent from "../components/Staff/StaffContent";
import StaffTitle from "../components/Staff/StaffTitle";

import React, { useEffect, useState } from "react";

const StaffPage = ({ setAuth, isAuthenticated }) => {
    return (
        <>
            <Navigation setAuth={setAuth} isAuthenticated={isAuthenticated} />
            <div className="page-container">
                <StaffTitle />
                <div id="staffs-div">
                    <div className="staffs-grid container-xxxl">
                        <Staff />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

const Staff = () => {
    const [staffs, setStaffs] = useState([]);

    const getStaffs = async () => {
        try {
            const response = await fetch(`/staffs`);
            const jsonData = await response.json();
            setStaffs(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getStaffs();
    }, [])

    if (staffs.length === 0) {
        return (
            <>
                <div className='emptyStaff'>
                    <p>There are no staffs available.</p>
                </div>
            </>
        )
    } else {
        return (
            <>
                {staffs.map(staff => (
                    <div key={staff.id}>
                        <StaffContent staffName={staff.staffname} staffEmail={staff.staffemail} staffGithub={staff.staffgithub}
                            staffWebsite={staff.staffwebsite} staffLinkedin={staff.stafflinkedin} staffTitle={staff.stafftitle} />
                    </div>
                ))}
            </>
        )
    }
}

export default StaffPage