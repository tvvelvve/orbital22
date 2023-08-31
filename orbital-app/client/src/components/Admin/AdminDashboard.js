import { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import ReactTooltip from 'react-tooltip';

const AdminDashBoard = () => {
    const [users, setUsers] = useState(0);
    const [projects, setProjects] = useState(0);
    const [hovered, setHovered] = useState();

    const [artemis, setArtemis] = useState(0);
    const [apollo11, setApollo11] = useState(0);
    const [gemini, setGemini] = useState(0);
    const [vostok, setVostok] = useState(0);

    const projectsData = [
        { title: 'Artemis', value: artemis, color: '#003f5c' },
        { title: 'Apollo 11', value: apollo11, color: '#00608f' },
        { title: 'Gemini', value: gemini, color: '#0083c5' },
        { title: 'Vostok', value: vostok, color: '#7bc0f1' },
    ];

    function makeTooltipContent(level, count) {
        return `${level} (${count})`;
    }

    async function getUserCount() {
        try {
            const response = await fetch("/users/", {
                method: "GET",
            });

            const parseRes = await response.json();

            setUsers(parseRes.rowCount);

        } catch (err) {
            console.error(err.message);
        }
    }

    async function getProjectCount() {
        try {
            const response = await fetch("/projects/", {
                method: "GET",
            });

            const parseRes = await response.json();

            setProjects(parseRes.rowCount);

        } catch (err) {
            console.error(err.message);
        }
    }

    async function getProjectData() {
        try {
            const artemis = await fetch("/projects/achievement/artemis", {
                method: "GET",
            });

            const artemisRes = await artemis.json();

            setArtemis(artemisRes.length);

            const apollo11 = await fetch("/projects/achievement/apollo11", {
                method: "GET",
            });

            const apollo11Res = await apollo11.json();

            setApollo11(apollo11Res.length);

            const gemini = await fetch("/projects/achievement/gemini", {
                method: "GET",
            });

            const geminiRes = await gemini.json();

            setGemini(geminiRes.length);

            const vostok = await fetch("/projects/achievement/vostok", {
                method: "GET",
            });

            const vostokRes = await vostok.json();

            setVostok(vostokRes.length);

        } catch (err) {
            console.error(err.message);
        }

    }


    useEffect(() => {
        getUserCount();
        getProjectCount();
        getProjectData();
    }, []);


    return (
        <>
            <div className="adminDashboard">
                <main className="pt-5 mx-lg-5 my-5">
                        <div className="card wow fadeIn animated blue white-text mb-3" style={{ visibility: 'visible', animationName: 'fadeIn' }}>
                            {/*Card content*/}
                            <div className="card-body d-sm-flex justify-content-between">
                                <div className="panel box-shadow-none content-header">
                                    <div className="panel-body">
                                        <div className="col-md-12">
                                            <h3>My Dashboard</h3>
                                            <p className="animated fadeInDown" style={{ lineHeight: '.4' }}>
                                                Welcome To Orbital's Admin Dashboard.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row wow fadeIn" style={{ visibility: 'visible', animationName: 'fadeIn' }}>
                            {/*Grid column*/}
                            <div className="col-md-4 mb-4">
                                {/*Card*/}
                                <div className="card">
                                    {/*Card content*/}
                                    <div className="card-body"><div className="chartjs-size-monitor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div className="chartjs-size-monitor-expand" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '1000000px', height: '1000000px', left: 0, top: 0 }} /></div><div className="chartjs-size-monitor-shrink" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '200%', height: '200%', left: 0, top: 0 }} /></div></div>
                                        <div className="panel box-v1">
                                            <div className="panel-heading bg-white border-none">
                                                <div className="col-md-6 col-sm-6 col-xs-6 text-left padding-0">
                                                    <h4 className="text-left blue-text">Users</h4>
                                                </div>
                                                <div className="col-md-12 col-sm-6 col-xs-6 text-center">
                                                    <span className="fa-solid fa-users" style={{ fontSize: '30px' }} />
                                                </div>
                                            </div>
                                            <div className="panel-body text-center">
                                                <label id="usercount" ><h1>{users}</h1></label>
                                                <p>Users Active</p>
                                                <hr />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*/.Card*/}
                                &nbsp;
                                {/*Card*/}
                                <div className="card">
                                    {/*Card content*/}
                                    <div className="card-body"><div className="chartjs-size-monitor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div className="chartjs-size-monitor-expand" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '1000000px', height: '1000000px', left: 0, top: 0 }} /></div><div className="chartjs-size-monitor-shrink" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '200%', height: '200%', left: 0, top: 0 }} /></div></div>
                                        <div className="panel box-v1">
                                            <div className="panel-heading bg-white border-none">
                                                <div className="col-md-6 col-sm-6 col-xs-6 text-left padding-0">
                                                    <h4 className="text-left blue-text">Projects</h4>
                                                </div>
                                                <div className="col-md-12 col-sm-6 col-xs-6 text-center">
                                                    <span className="fa-solid fa-rectangle-history" style={{ fontSize: '30px' }} />
                                                </div>
                                            </div>
                                            <div className="panel-body text-center">
                                                <label id="projectcount" ><h1>{projects}</h1></label>
                                                <p>Projects Created</p>
                                                <hr />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*/.Card*/}
                            </div>
                            {/*Grid column*/}
                            <div className="col-md-8 mb-4">
                                {/*Card*/}
                                <div className="card">
                                    {/*Card content*/}
                                    <div className="card-body" style={{ marginTop: '14px', marginBottom: '14px', height: "510px" }}>
                                        <div className="col-md-6 col-sm-6 col-xs-6 text-left padding-0">
                                            <h4 className="text-left blue-text">Project Distribution</h4>
                                        </div>
                                        <div id="project-piechart" data-tip="" data-for="chart">
                                            <PieChart
                                                animate
                                                animationDuration={500}
                                                animationEasing="ease-out"
                                                center={[85, 50]}
                                                data={projectsData}
                                                lineWidth={20}
                                                paddingAngle={18}
                                                rounded
                                                label={({ dataEntry }) => dataEntry.value !== 0 ? `${Math.round(dataEntry.percentage)}%` : ''}
                                                labelStyle={(index) => ({
                                                    fill: projectsData[index].color,
                                                    fontSize: '5px',
                                                    fontFamily: 'sans-serif',
                                                })}
                                                labelPosition={60}
                                                lengthAngle={360}
                                                radius={40}
                                                startAngle={0}
                                                viewBoxSize={[175, 100]}
                                                onMouseOver={(_, index) => {
                                                    setHovered(index);
                                                }}
                                                onMouseOut={() => {
                                                    setHovered(null);
                                                }}
                                            />
                                            <ReactTooltip
                                                id="chart"
                                                getContent={() =>
                                                    typeof hovered === 'number' ?
                                                        makeTooltipContent(projectsData[hovered].title, projectsData[hovered].value) : null
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/*/.Card*/}
                            </div>
                            {/*Grid column*/}
                        </div>
                    </main>
            </div>
        </>
    )
}

export default AdminDashBoard