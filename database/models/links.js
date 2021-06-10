const mongo = require("mongoose");

// let id = mongo.Schema.Types.ObjectId();

const LinkSchema = new mongo.Schema({
  id_usuario: {
    type: mongo.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },
  label: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  isSocial: {
    type: Boolean,
    required: true,
    default: 0,
  },
});

const LinkCollection = mongo.model("LinkCollecs", LinkSchema);

module.exports = LinkCollection;
