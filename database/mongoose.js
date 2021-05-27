const mongo = require("mongoose");

mongo.connect("mongodb://localhost/link", {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongo.Promise = global.Promise;

module.exports = mongo;
