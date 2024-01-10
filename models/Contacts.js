const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ContactModel = mongoose.model('contacts', ContactSchema)

module.exports = ContactModel
