const mongoose = require('mongoose');

const ContactModel = require('../models/Contacts');


const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find()
        res.status(200).json({ message: "contacts retrieved successfully!", data: contacts})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getSingleContact = async (req, res) => {
    try {
        const id = req.params.id;
    const contact = await ContactModel.findById(id);
    res
      .status(200)
      .json({ message: "contact retrieved successfully!", data: contact });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createContact = async (req, res) => {
    try {
        const newContact = new ContactModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone
        })
        const savedContact = await newContact.save()
        res.status(200).json({ messgae: "contact added successfully!", data: savedContact })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



module.exports = { getAllContacts, getSingleContact, createContact }
