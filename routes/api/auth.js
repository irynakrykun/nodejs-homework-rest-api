const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
// const jsonParser = express.json();

const { validateBody }  = require('../../middlewares');
const { schemas }  = require('../../models/user');

router.post("/register",validateBody(schemas.registerSchema),ctrl.register)

module.exports = router;