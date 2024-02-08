const express = require('express');
const { getAllContacts, getSingleContact, createContact, updateContact, deleteContact } = require('../controllers/contacts');

const router = express.Router()

router.get('/contacts/all', getAllContacts)
router.get('/contacts/:id', getSingleContact)
router.post('/contacts/create', createContact)
router.patch('/contacts/:id', updateContact)
router.delete('/contacts/:id', deleteContact)

module.exports = router
