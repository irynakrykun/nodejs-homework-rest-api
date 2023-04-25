const validateBody = require("./validatesBody");
const isValidId = require("./isValidId");
const updateFavoriteStatus = require('./updateFavoriteStatus');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
    validateBody,
    isValidId,
    updateFavoriteStatus,
    authenticate,
    upload,
};