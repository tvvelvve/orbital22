import { useState, useEffect } from 'react';
import { Link as LinkNav } from 'react-router-dom'

import '../../css/sidebar.css';
import '../../css/admin.css';

function getOrdinalNum(n) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}


const AdminSidebar = ({ activePage }) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDate(new Date()), 1000);
    }, []);

    return (
        <>
            <div className="sidebar sidebar-fixed position-fixed">
                <div className="time">
                    <h1 className="admin-time" style={{ fontWeight: 500, fontSize: '70px', textAlign: 'center', color: '#918C8C' }}>
                        {date.toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hourCycle: 'h23',
                        })}
                    </h1>
                    <p className="admin-date text-center">
                        {date.toLocaleString('en-US', {
                            weekday: 'long',
                        })}
                        ,&nbsp;
                        {date.toLocaleString('en-US', {
                            month: 'long',
                        })}
                        &nbsp;
                        {getOrdinalNum(date.getDate())}
                        &nbsp;
                        {date.toLocaleString('en-US', {
                            year: 'numeric',
                        })}
                    </p>
                </div>
                <SidebarNav activePage={activePage} />
            </div>
        </>
    )
}


const SidebarNav = ({ activePage }) => {
    if (activePage === "dashboard") {
        return (
            <div className="list-group list-group-flush">
                <LinkNav to={`/admin`} className="list-group-item active white-text">
                    <i className="fa-solid fa-chart-line mr-3" />Dashboard
                </LinkNav>
                <LinkNav to={`/admin/students`} className="list-group-item list-group-item-action">
                    <i className="fa-solid fa-users mr-3" />Students
                </LinkNav>
                <LinkNav to={`/admin/projects`} className="list-group-item list-group-item-action">
                    <i className="fa-solid fa-rectangle-history mr-3" />Projects
                </LinkNav>
                <LinkNav to={`/admin/submissions`} className="list-group-item list-group-item-action">
                    <i className="fa-solid fa-flag-pennant mr-3" />Submission
                </LinkNav>
            </div>
        )
    } else if (activePage === "user") {
        return (
            <div className="list-group list-group-flush">
                <LinkNav to={`/admin`} className="list-group-item list-group-item-action ">
                    <i className="fa-solid fa-chart-line mr-3" />Dashboard
                </LinkNav>
                <LinkNav to={`/admin/students`} className="list-group-item active white-text">
                    <i className="fa-solid fa-users mr-3" />Students
                </LinkNav>
                <LinkNav to={`/admin/projects`} className="list-group-item list-group-item-action">
                    <i className="fa-solid fa-rectangle-history mr-3" />Projects
                </LinkNav>
                <LinkNav to={`/admin/submissions`} className="list-group-item list-group-item-action">
                    <i className="fa-solid fa-flag-pennant mr-3" />Submission
                </LinkNav>
            </div>
        )
    } else if (activePage === "project") {
        return (
            <div className="list-group list-group-flush">
                <LinkNav to={`/admin`} className="list-group-item list-group-item-action ">
                    <i className="fa-solid fa-chart-line mr-3" />Dashboard
                </LinkNav>
                <LinkNav to={`/admin/students`} className="list-group-item list-group-item-action">
                    <i className="fa-solid fa-users mr-3" />Students
                </LinkNav>
                <LinkNav to={`/admin/projects`} className="list-group-item active white-text">
                    <i className="fa-solid fa-rectangle-history mr-3" />Projects
                </LinkNav>
                <LinkNav to={`/admin/submissions`} className="list-group-item list-group-item-action">
                    <i className="fa-solid fa-flag-pennant mr-3" />Submission
                </LinkNav>
            </div>
        )
    } else {
        return (
            <div className="list-group list-group-flush">
                <LinkNav to={`/admin`} className="list-group-item list-group-item-action">
                    <i className="fa-solid fa-chart-line mr-3" />Dashboard
                </LinkNav>
                <LinkNav to={`/admin/students`} className="list-group-item list-group-item-action">
                    <i className="fa-solid fa-users mr-3" />Students
                </LinkNav>
                <LinkNav to={`/admin/projects`} className="list-group-item list-group-item-action">
                    <i className="fa-solid fa-rectangle-history mr-3" />Projects
                </LinkNav>
                <LinkNav to={`/admin/submissions`} className="list-group-item active white-text">
                    <i className="fa-solid fa-flag-pennant mr-3" />Submission
                </LinkNav>
            </div>
        )
    }
}

export default AdminSidebar