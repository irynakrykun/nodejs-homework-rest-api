const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const contacts = await Contact.find({ owner });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.findById({ _id: req.params.contactId, owner });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const add = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.findByIdAndRemove({
      _id: req.params.contactId,
      owner,
    });

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    if (JSON.stringify(req.body) === "{}") {
      throw HttpError(400, "Missing fields");
    }
    const { _id: owner } = req.user;
    
    const result = await Contact.findByIdAndUpdate({ _id: req.params.contactId, owner }, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
   
    const { _id:owner } = req.user;
    const result = await Contact.findByIdAndUpdate({ _id: req.params.contactId, owner }, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
};
