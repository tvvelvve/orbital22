const router = require("express").Router()
const pool = require("../db")

//create a staff
router.post("/create", async (req) => {
    try {
        const { staffName, staffEmail, staffGithub, staffWebsite, staffLinkedin, staffTitle } = req.body;
        await pool.query("INSERT into staffs (staffName, staffEmail, staffGithub, staffWebsite, staffLinkedin, staffTitle) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [staffName, staffEmail, staffGithub, staffWebsite, staffLinkedin, staffTitle]
        );
    } catch (err) {
        console.error(err.message);
    }
});

//get all staffs
router.get("/", async (req, res) => {
    try {
        const staffs = await pool.query("SELECT * FROM staffs ORDER BY staffName ASC")
        res.json(staffs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get id by name
router.get("/", async (req, res) => {
    try {
        const staffs = await pool.query("SELECT * FROM staffs WHERE staffname = $1", [staffName])
        res.json(staffs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//update staff info by id
router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { staffName, staffEmail, staffGithub, staffWebsite, staffLinkedin, staffTitle } = req.body;
        await pool.query("UPDATE staffs SET staffName = $1, staffEmail = $2, staffGithub = $3, staffWebsite = $4, staffLinkedin = $5, staffTitle = $6 WHERE id = $7", 
        [staffName, staffEmail, staffGithub, staffWebsite, staffLinkedin, staffTitle, id]
        );
        res.json("Staff info was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//update staffName by id
router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { staffName } = req.body;
        await pool.query("UPDATE staffs SET staffName = $1 WHERE id = $2", 
        [staffName, id]
        );
        res.json("StaffName was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//update staffGithub by id
router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { staffGithub } = req.body;
        await pool.query("UPDATE staffs SET staffGithub= $1 WHERE id = $2", 
        [staffGithub, id]
        );
        res.json("StaffGithub was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//update staffEmail by id
router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { staffEmail } = req.body;
        await pool.query("UPDATE staffs SET staffEmail= $1 WHERE id = $2", 
        [staffEmail, id]
        );
        res.json("StaffEmail was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//update staffLinkedin by id
router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { staffLinkedin } = req.body;
        await pool.query("UPDATE staffs SET staffLinkedin= $1 WHERE id = $2", 
        [staffLinkedin, id]
        );
        res.json("StaffLinkedin was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//update staffWebsite by id
router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { staffWebsite } = req.body;
        await pool.query("UPDATE staffs SET staffWebsite= $1 WHERE id = $2", 
        [staffWebsite, id]
        );
        res.json("StaffWebsite was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//update staffTitle by id
router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { staffTitle } = req.body;
        await pool.query("UPDATE staffs SET staffTitle= $1 WHERE id = $2", 
        [staffTitle, id]
        );
        res.json("StaffTitle was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//delete a staff by id 
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE from staffs WHERE id = $1", [id]);
        res.json("Staff was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;