const mongo = require("mongoose");

let id = mongo.Schema.Types.ObjectId();

const LinkSchema = new mongo.Schema({
  userId: { type: String, ref: "Users" },
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

const LinkCollection = mongo.model("LinkCollec", LinkSchema);

module.exports = LinkCollection;
