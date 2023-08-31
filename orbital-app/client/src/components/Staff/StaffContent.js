import profile from "../../images/profile.jpg"

const StaffContent = ({ staffName, staffEmail, staffGithub, staffWebsite, staffLinkedin, staffTitle }) => {
    return (
        <>
            <div className="staff float-left m-5">
                <div className="card">
                    <div className="our-team">
                        <div className="picture">
                            <img className="img-fluid" src={profile} alt="Profile"></img>
                        </div>
                        <div className="team-content">
                            <h3 className="name">{staffName}</h3>
                            <h4 className="title">{staffTitle}</h4>
                        </div>
                        <ul className="social">
                            <li><a href={"mailto:"+staffEmail} target="_blank" rel="noreferrer" className="fa-solid fa-envelope" aria-hidden="true"></a></li>
                            <li><a href={staffGithub} target="_blank" rel="noreferrer" className="fa-brands fa-github" aria-hidden="true"></a></li>
                            <li><a href={staffWebsite} target="_blank" rel="noreferrer" className="fa-solid fa-globe" aria-hidden="true"></a></li>
                            <li><a href={staffLinkedin} target="_blank" rel="noreferrer" className="fa-brands fa-linkedin" aria-hidden="true"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}       
        

export default StaffContent