const express = require('express');
const { getAllContacts, getSingleContact, createContact } = require('../controllers/');

const router = express.Router()

router.get('/contacts/all', getAllContacts)
router.get('/contacts/:id', getSingleContact)
router.post('/contacts/create', createContact)

module.exports = router
