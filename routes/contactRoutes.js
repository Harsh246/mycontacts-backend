const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactControllers");
const validateRequest = require("../middleware/validateRequest");

router.use(validateRequest);

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
