import Navigation from "../components/Header/Navigation";
import UserSubmission from "../components/User/UserSubmission";
import Sidebar from "../components/User/UserSidebar";
import Footer from "../components/Footer/Footer";

const UserSubmissionPage = ({ setAuth, isAuthenticated }) => {

    return (
        <>
            <Navigation setAuth={setAuth} isAuthenticated={isAuthenticated} />
            <div className="page-container">
                <Sidebar activePage={"submission"}/>
                <div className="container-fluid">
                    <UserSubmission />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default UserSubmissionPage