require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const port = 5002 || 3000;
const mongoUrl = process.env.MONGO_URL;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

function connectToDatabase() {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {})
    .catch((error) => {});
}

const User = require("./schema_mongo");

async function checkEmailExists(email) {
  const existingUser = await User.findOne({ email });
  return !!existingUser;
}
app.post("/addData", async (req, res) => {
  try {
    const UserModel = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      motDePasse: req.body.motDePasse,
      confirmerMotDP: req.body.confirmerMotDP,
      likes: {},
    });
    const emailExists = await checkEmailExists(req.body.email);

    if (emailExists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    } else {
      const result = await UserModel.save();
      res.status(200).send({ message: "Data added successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error adding data" });
  }
});

async function getUserData(email, motDePasse) {
  const userData = await User.findOne({ email: email, motDePasse: motDePasse });
  return userData;
}

// exemple d'utilisation de `getUserData()`
app.post("/userExist", async (req, res) => {
  const userData = await getUserData(req.body.email, req.body.motDePasse);
  if (userData) {
    res.status(200).send(userData);
  } else {
    res.status(400).send();
  }
});

async function addOrUpdatePreference(email, element, value) {
  const user = await User.findOneAndUpdate(
    { email: email },
    { $set: { likes: { [element]: value } } }
  );
  return user;
}

app.post("/updateUserPreference", async (req, res) => {
  const userData = await addOrUpdatePreference(
    req.body.email,
    req.body.id,
    req.body.value
  );
  if (userData) {
    if (userData) {
      res.status(200).send(userData);
    } else {
      res.status(400).send();
    }
  }
});

app.get("/getLikesHistory/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.send({ status: "utilisateur introuvable" });
    } else {
      const likes = user.likes;
      res.send({ likes: likes });
    }
  } catch (error) {
    res.send({ status: "erreur" });
  }
});

// Démarrage de l'API!
async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {});
}

startServer();
