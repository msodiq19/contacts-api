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
    const {firstname, lastname, email, phone} = req.body
    try {
        if (!firstname || !lastname || !email || !phone)
            return res.status(400).json({ message: 'incorrect payload' });

            const newContact = new ContactModel({
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone
            })
            const savedContact = await newContact.save()

            res.status(200).json({ messgae: "contact added successfully!", data: newContact })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateContact = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send({ message: `No contact with id: ${id}` });

        const newContact = req.body
        const Contact = await ContactModel.findByIdAndUpdate(id, newContact, { new: true })

        res.status(200).json({ message: "contact updated successfully!", data: newContact})
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

const deleteContact = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send({ message: `No contact with id: ${id}` });

        const Contact = await ContactModel.findByIdAndDelete(id)
        res.status(200).json({ message: 'contact deleted successfully!'})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



module.exports = { getAllContacts, getSingleContact, createContact, updateContact, deleteContact }
