import Navigation from "../components/Header/Navigation";
import UserProject from "../components/User/UserProject";
import Sidebar from "../components/User/UserSidebar";
import Footer from "../components/Footer/Footer";

const UserProjectPage = ({ setAuth, isAuthenticated }) => {

    return (
        <>
            <Navigation setAuth={setAuth} isAuthenticated={isAuthenticated} />
            <div className="page-container">
                <Sidebar activePage={"team"}/>
                <div className="container-fluid">
                    <UserProject />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default UserProjectPage