module.exports = function (req, res, next) {
    const { firstName, lastName, studentNumber, userID, email, contactNumber, programme, password, activateEmail, OTP } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        if (![firstName, lastName, studentNumber, userID, email, contactNumber, programme, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/email") {
        if (![activateEmail].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(activateEmail)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/verifyotp") {
        if (![activateEmail, OTP].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(activateEmail)) {
            return res.status(401).json("Invalid Email");
        }
    }
    // TODO: include empty validation check here
    else if (req.path === "/update/*") {
        if (![firstName, lastName, studentNumber, userid, email, contactNumber, programme].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/update/*") {
        if (![firstName, lastName, studentNumber, userid, email, contactNumber, programme].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }

    next();
};