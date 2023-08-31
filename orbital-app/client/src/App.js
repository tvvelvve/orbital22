// eslint-disable-next-line
import { HashRouter, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./pages/main";
import StaffPage from "./pages/staff";
import ProjectsPage from "./pages/projects";
import AdminPage from "./pages/admin-dashboard";
import AdminStudentPage from "./pages/admin-student";
import AdminProjectPage from "./pages/admin-project";
import AdminSubmissionPage from "./pages/admin-submission";
import UserProjectPage from "./pages/user-project";
import UserSubmissionPage from "./pages/user-submission";
import UserProfilePage from "./pages/user-profile";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {
      const response = await fetch("/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      })

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

    } catch (err) {
      console.error(err.message);
    }
  }

  async function getName() {
    try {
      const response = await fetch("/users/me", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      setName(parseRes.studentnumber)

    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    isAuth();
    getName();
  });


  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={!isAuthenticated ? (<MainPage setAuth={setAuth} />) : (name === "admin") ? (<AdminPage setAuth={setAuth} isAuthenticated={isAuthenticated} />) : (<UserProjectPage setAuth={setAuth} isAuthenticated={isAuthenticated} />)} />
        <Route exact path='/staff' element={<StaffPage setAuth={setAuth} isAuthenticated={isAuthenticated} />} />
        <Route exact path='/projects/:achievement' element={<ProjectsPage setAuth={setAuth} isAuthenticated={isAuthenticated} />} />
        <Route exact path='/admin' element={!isAuthenticated ? <MainPage setAuth={setAuth} /> : name === "admin" ? <AdminPage setAuth={setAuth} isAuthenticated={isAuthenticated} /> : <UserProjectPage setAuth={setAuth} isAuthenticated={isAuthenticated} />} />
        <Route exact path='/admin/students' element={!isAuthenticated ? <MainPage setAuth={setAuth} /> : name === "admin" ? <AdminStudentPage setAuth={setAuth} isAuthenticated={isAuthenticated} /> : <UserProjectPage setAuth={setAuth} isAuthenticated={isAuthenticated} />} />
        <Route exact path='/admin/projects' element={!isAuthenticated ? <MainPage setAuth={setAuth} /> : name === "admin" ? <AdminProjectPage setAuth={setAuth} isAuthenticated={isAuthenticated} /> : <UserProjectPage setAuth={setAuth} isAuthenticated={isAuthenticated} />} />
        <Route exact path='/admin/submissions' element={!isAuthenticated ? <MainPage setAuth={setAuth} /> : name === "admin" ? <AdminSubmissionPage setAuth={setAuth} isAuthenticated={isAuthenticated} /> : <UserProjectPage setAuth={setAuth} isAuthenticated={isAuthenticated} />} />
        <Route exact path='/user' element={!isAuthenticated ? <MainPage setAuth={setAuth} /> : name === "admin" ? <AdminPage setAuth={setAuth} isAuthenticated={isAuthenticated} /> : <UserProjectPage setAuth={setAuth} isAuthenticated={isAuthenticated} />} />
        <Route exact path='/user/submission' element={!isAuthenticated ? <MainPage setAuth={setAuth} /> : name === "admin" ? <AdminPage setAuth={setAuth} isAuthenticated={isAuthenticated} /> : <UserSubmissionPage setAuth={setAuth} isAuthenticated={isAuthenticated} />} />
        <Route exact path='/user/profile' element={!isAuthenticated ? <MainPage setAuth={setAuth} /> : name === "admin" ? <AdminPage setAuth={setAuth} isAuthenticated={isAuthenticated} /> : <UserProfilePage setAuth={setAuth} isAuthenticated={isAuthenticated} />} />
      </Routes>
    </HashRouter>
  )
}

export default App;