import Navigation from "../components/Header/Navigation";
import UserProfile from "../components/User/UserProfile";
import Sidebar from "../components/User/UserSidebar";
import Footer from "../components/Footer/Footer";

const UserProfilePage = ({ setAuth, isAuthenticated }) => {

    return (
        <>
            <Navigation setAuth={setAuth} isAuthenticated={isAuthenticated} />
            <div className="page-container">
                <Sidebar activePage={"profile"}/>
                <div className="container-fluid">
                    <UserProfile />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default UserProfilePage