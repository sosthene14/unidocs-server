require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require('cors');
app.use(cors())
const mongoUrl = process.env.MONGO_URL
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connecté");
  })
  .catch((e) => console.log(e));

  require('./schema_mongo')
 
  const files = mongoose.model(process.env.DB_NAME)


 

app.get("/get/genie_info/l2", async (req, res) => {
    try {
      await files.find({}).then((data) => {
        res.send({ data: data });
      });
    } catch (error) {
      res.send({ status: "erreur" });
    }
  });




  app.listen(5001, () => {
    console.log("server started 5001");
  });