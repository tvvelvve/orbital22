import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Admin/AdminSidebar";

import ProjectList from "../components/Admin/ProjectList";


const AdminUserPage = ({ setAuth, isAuthenticated }) => {

    return (
        <>
            <Navigation setAuth={setAuth} isAuthenticated={isAuthenticated} />
            <div className="page-container">
                <Sidebar activePage={"project"}/>
                <div className="container-fluid">
                    <ProjectList />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default AdminUserPage