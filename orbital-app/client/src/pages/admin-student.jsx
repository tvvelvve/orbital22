import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Admin/AdminSidebar";
import StudentList from "../components/Admin/StudentList";

const AdminUserPage = ({ setAuth, isAuthenticated }) => {

    return (
        <>
            <Navigation setAuth={setAuth} isAuthenticated={isAuthenticated} />
            <div className="page-container">
                <Sidebar activePage={"user"}/>
                <div className="container-fluid">
                    <StudentList />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default AdminUserPage