const router = require("express").Router();
const authorization = require("../middleware/authorization");
const validation = require("../middleware/validation")
const bcrypt = require("bcrypt");
const pool = require("../db");

router.get("/me", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [req.user]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/email", validation, async (req, res) => {
  try {
    const { activateEmail } = req.body;

    //2. Check if user exist (if user exist then throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [activateEmail]);

    if (user.rows.length !== 0) {
      return res.json("Success");
    } else {
      return res.json("User does not exist");
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.get("/", async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM users"
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/students", async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE NOT studentnumber = 'admin'"
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/students/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE userid = $1", [userid]
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/update/:id", validation, async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, studentNumber, userid, email, contactNumber, programme } = req.body;
    const updatedUser = await pool.query(
      "UPDATE users SET firstname = $1, lastname = $2, studentnumber = $3, userid = $4, email = $5, contactnumber = $6, programme = $7 WHERE id = $8",
      [firstName, lastName, studentNumber, userid, email, contactNumber, programme, id]
    );

    res.json("User was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/updatepw", async (req, res) => {
  try {
    const { newPassword, activateEmail } = req.body;

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    bcryptPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await pool.query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [bcryptPassword, activateEmail]
    );

    res.json("Password was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/updateotp", async (req, res) => {
  try {
    const { OTP, activateEmail } = req.body;
    const updatedUser = await pool.query(
      "UPDATE users SET otp = $1 WHERE email = $2",
      [OTP, activateEmail]
    );

    res.json("OTP was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verifyotp", validation, async (req, res) => {
  try {

    const { OTP, activateEmail } = req.body;

    //2. Check if user doesn't exist (If not then we throw error)
    const user = await pool.query("SELECT * FROM users where email = $1 and OTP = $2",
      [activateEmail, OTP]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid OTP");
    }

    res.json("Correct OTP!");

  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.delete("/del/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id])

    res.json("User is successfully deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;