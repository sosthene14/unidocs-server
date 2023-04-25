const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true,
  },
  confirmerMotDP: {
    type: String,
    required: true,
  },
  likes: {
    type: Object
  }
  
});
const model = mongoose.model("bibliothequeNumerique", Schema, "users");
module.exports = model;
