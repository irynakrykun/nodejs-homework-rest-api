const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {  contactsSchema,updateSchema,updateFavoriteSchema } = require("../../models/contact");
const { validateBody,isValidId,updateFavoriteStatus,authenticate } = require("../../middlewares");


router.get("/",authenticate,ctrl.getAll );

router.get("/:contactId",authenticate,isValidId,ctrl.getById);

router.post("/",authenticate,validateBody(contactsSchema), ctrl.add);

router.delete("/:contactId",authenticate, isValidId,ctrl.deleteById);

router.put("/:contactId",authenticate, isValidId, validateBody(updateSchema), ctrl.updateById);

router.patch("/:contactId/favorite",authenticate,isValidId, updateFavoriteStatus(updateFavoriteSchema),ctrl.updateStatusContact);

module.exports = router;
