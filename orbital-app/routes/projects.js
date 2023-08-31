const router = require("express").Router()
const pool = require("../db")

//create a project
router.post("/create", async (req, res) => {
    try {
        const { teamName, teamMember1, teamMember2, teamAdvisor, achievement } = req.body;
        const newProject = await pool.query("INSERT into projects (teamName, teamMember1, teamMember2, teamAdvisor, achievement) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [teamName, teamMember1, teamMember2, teamAdvisor, achievement]
        );

        return res.json({ newProject });
    } catch (err) {
        console.error(err.message);
    }
});

//get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await pool.query("SELECT * FROM projects")
        res.json(projects);
    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/del/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM projects WHERE id = $1", [id])

        res.json("Project is successfully deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//get all projects by level
router.get("/achievement/:achievement", async (req, res) => {
    try {
        const { achievement } = req.params;
        const project = await pool.query("SELECT * FROM projects WHERE achievement = $1", [achievement])

        res.json(project.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//get projects from user
router.get("/userid/:userid", async (req, res) => {
    try {
        const { userid } = req.params;
        const project = await pool.query("SELECT * FROM projects WHERE teammember1 = $1 or teammember2 = $1", [userid])
        res.json(project.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

//get projects from user
router.get("/projectid/:projectid", async (req, res) => {
    try {
        const { projectid } = req.params;
        const project = await pool.query("SELECT * FROM projects WHERE id = $1", [projectid])
        res.json(project.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

//get all projects by level
router.get("/id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const project = await pool.query("SELECT * FROM projects WHERE id = $1", [id])

        res.json(project.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

//get all members in project
router.get("/members", async (req, res) => {
    try {
        const projectMembers = await pool.query("select distinct unnest(array[ teammember1, teammember2 ]) from projects")
        res.json(projectMembers.rows)
    } catch (err) {
        console.error(err.message);
    }
})


//update a project poster
router.put("/poster/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { poster } = req.body;
        const updatedProject = await pool.query("UPDATE projects SET poster = $1 WHERE teammember1 = $2 or teammember2 = $2",
            [poster, id]
        );

        res.json("Poster was uploaded!");
    } catch (err) {
        console.error(err.message);
    }
})

//update a project poster
router.put("/video/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { video } = req.body;
        const updatedProject = await pool.query("UPDATE projects SET video = $1 WHERE teammember1 = $2 or teammember2 = $2",
            [video, id]
        );


        res.json("Video link was uploaded!");
    } catch (err) {
        console.error(err.message);
    }
})

//update a project
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { teamName, teamMember1, teamMember2, teamAdvisor } = req.body;
        const updatedProject = await pool.query("UPDATE projects SET teamName = $1, teamMember1 = $2, teamMember2 = $3, teamAdvisor = $4 WHERE id = $5",
            [teamName, teamMember1, teamMember2, teamAdvisor, id]
        );

        res.json("Project was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;