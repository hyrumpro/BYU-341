const Contact = require('../models/Contact');
const mongoose = require('mongoose');

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        console.error('Error retrieving contacts:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getContactById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid contact ID' });
    }

    try {
        const contact = await Contact.findById(id);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        console.error('Error retrieving contact:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        console.error('Error creating contact:', err);
        res.status(400).json({ message: 'Bad request', error: err.message });
    }
};


exports.updateContact = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid contact ID' });
    }

    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedContact) {
            res.status(200).json({ message: 'Contact updated successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(400).json({ message: 'Bad request', error: err.message });
    }
};

exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid contact ID' });
    }

    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (deletedContact) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        console.error('Error deleting contact:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};