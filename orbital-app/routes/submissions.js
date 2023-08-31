const router = require("express").Router()
const pool = require("../db")

//create a submission
router.post("/create", async (req, res) => {
    try {
        const { project_id, milestone, poster, video, README, projectLog } = req.body;
        const newSubmission = await pool.query("INSERT into submissions (project_id, milestone, poster, video, readme, project_log) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [project_id, milestone, poster, video, README, projectLog]
        );

        return res.json({ newSubmission });
    } catch (err) {
        console.error(err.message);
    }
});

//get all submission
router.get("/", async (req, res) => {
    try {
        const submissions = await pool.query("SELECT * FROM submissions")
        res.json(submissions);
    } catch (err) {
        console.error(err.message);
    }
});

//get all submission by project id and milestone
router.get("/:project_id/:milestone", async (req, res) => {
    try {
        const { project_id, milestone } = req.params;
        const project = await pool.query("SELECT * FROM submissions WHERE project_id = $1 and milestone = $2", [project_id, milestone])

        res.json(project)
    } catch (err) {
        console.error(err.message);
    }
})

//update a submission
router.put("/update/:project_id/:milestone", async (req, res) => {
    try {
        const { project_id, milestone } = req.params;
        const { poster, video, README, projectLog } = req.body;
        const updatedSubmission = await pool.query("UPDATE submissions SET poster = $1, video = $2, readme = $3, project_log = $4 WHERE project_id = $5 and milestone = $6",
            [poster, video, README, projectLog, project_id, milestone]
        );

        res.json("Submission was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

router.delete("/del/:project_id/:milestone", async (req, res) => {
    try {
        const { project_id, milestone } = req.params;
        const deleteUser = await pool.query("DELETE FROM submissions WHERE project_id = $1 and milestone = $2", [project_id, milestone])

        res.json("Submission is successfully deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;