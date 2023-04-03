const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

// @desc GEt all contacts
// @route
// @access

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });

  res.status(200).json({ contacts });
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Missing fields");
  }

  const isExist = await Contact.findOne({ user_id: req.user.id, email, phone });
  if (!!isExist) {
    res.status(401);
    throw new Error("Already exists");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
  console.log("req.params.id: ", req.params.id);
  console.log("req.params.id: ", req.user.id);
  const contact = await Contact.findOne({
    _id: req.params.id,

    user_id: req.user.id,
  });
  console.log("contact: ", contact);
  if (!contact) {
    res.status(400);
    throw new Error("No contact found");
  }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Missing field");
  }

  const contact = await Contact.findOne({
    _id: req.params.id,
    user_id: req.user.id,
  });

  if (!contact) {
    res.status(400);
    throw new Error("No contact found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(201).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
    user_id: req.user.id,
  });

  if (!contact) {
    res.status(400);
    throw new Error("No contact found");
  }

  const deletedContact = await Contact.deleteOne({ _id: req.params.id });
  res
    .status(201)
    .json({ message: `Delete contact for ${JSON.stringify(deletedContact)}` });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
