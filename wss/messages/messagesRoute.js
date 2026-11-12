const express = require('express');
const router = express.Router();
const { getConversationKey, getConversations } = require("./getConversation");
const { initialMessages } = require('./initialMessages');

router.post("/get-conversation-key",getConversationKey);
router.get("/get-conversations", getConversations);
router.get("/initial-messages", initialMessages);

module.exports = router;