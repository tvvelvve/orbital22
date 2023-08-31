import '../css/bootstrap/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../css/homepage.css';
import '../css/responsive/reshomepage.css';

import Navigation from "../components/Header/Navigation";
import Login from "../components/Login";
import Footer from "../components/Footer/Footer";

const MainPage = ({ setAuth, isAuthenticated }) => {
    return (
        <>
            <Navigation setAuth={setAuth} isAuthenticated={isAuthenticated} />
            <div className="page-container">
                <Login setAuth={setAuth} />
                <Footer />
            </div>
        </>
    )
}

export default MainPage