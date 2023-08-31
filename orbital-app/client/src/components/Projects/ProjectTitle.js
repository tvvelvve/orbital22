const ProjectTitle = ({ level }) => {

    return (
        <>
            <div className="project-title-container">
                <div className="project-title">
                    <p className="project-title-orbital my-0">ORBITAL'S</p>
                    <ProjectLevel level={level} />
                </div>
            </div>
        </>
    )
}

const ProjectLevel = ({ level }) => {
    if (level === "vostok") {
        return <p className="project-title-level my-0">Vostok</p>
    } else if (level === "gemini") {
        return <p className="project-title-level my-0">Gemini</p>
    } else if (level === "apollo11") {
        return <p className="project-title-level my-0">Apollo 11</p>
    } else {
        return <p className="project-title-level my-0">Artemis</p>
    }
}

export default ProjectTitle