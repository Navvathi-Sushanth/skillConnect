const express = require("express");
const router = express.Router();
const getDetails = require("./getDetails.js");
const getUsers = require("./getUsers.js");
const saveDetails = require("./saveDetails.js");
const { getSkills, addSkill, deleteSkill } = require("./getSkills.js");
const { postRequest, getRequests, requestResponse } = require("./request.js");

router.get("/get-details",getDetails);
router.post("/get-users", getUsers);
router.post("/save-details", saveDetails);
router.post("/send-request", postRequest);
router.post("/request-response",requestResponse);
router.get("/get-skills", getSkills);
router.get("/get-requests",getRequests);
router.post("/add-skill",addSkill);
router.delete("/delete-skill", deleteSkill);

module.exports = router;