import '../css/bootstrap/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../css/responsive/resprojectdisplay.css';
import '../css/homepage.css';

import Navigation from "../components/Header/Navigation";
import ProjectTitle from "../components/Projects/ProjectTitle";
import ProjectContent from "../components/Projects/ProjectContent";
import LoadingSpinner from '../components/LoadingSpinner'
import Footer from "../components/Footer/Footer";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProjectsPage = ({ setAuth, isAuthenticated }) => {
    let { achievement } = useParams();

    return (
        <>
            <Navigation setAuth={setAuth} isAuthenticated={isAuthenticated} />
            <div className="page-container">
                <ProjectTitle level={achievement} />
                <div id="projects-div">
                    <div className="projects-grid container-xxxl">
                        <Project />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}


const Project = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setLoading] = useState(true);
    let { achievement } = useParams();


    const getProjects = async (achievement) => {
        try {
            const response = await fetch(`/projects/achievement/${achievement}`);
            const jsonData = await response.json();
            setProjects(jsonData);
            setLoading(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getProjects(achievement);
    }, [])


    if (projects.length === 0) {
        return (
            isLoading ? <LoadingSpinner /> : <>
                <div className='emptyProject'>
                    <p>There are no projects available.</p>
                </div>
            </>
        )
    } else {
        return (
            isLoading ? <LoadingSpinner /> : <>
                {projects.map(project => (
                    <div key={project.id}>
                        <ProjectContent teamName={project.teamname} teamID={project.id} teamMember1={project.teammember1} teamMember2={project.teammember2} teamAdvisor={project.teamadvisor}
                            achievement={project.achievement} poster={project.poster} video={project.video} />
                    </div>
                ))}
            </>
        )
    }
}

export default ProjectsPage