// routes.js
const express = require('express');
const contactRoute = require('./routes/contacts');

const router = express.Router()

router.use("/contacts", contactsRoute);

module.exports = router
