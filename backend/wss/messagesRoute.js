const express = require('express');
const router = express.Router();
const { getConversationKey } = require("./getConversation")
router.post("/get-conversation-key",getConversationKey);

module.exports = router;