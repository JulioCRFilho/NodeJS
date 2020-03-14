const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://@web-gimnf.gcp.mongodb.net/test?retryWrites=true&w=majority";

const user = "tod";
const pass = "ib3f7nmj";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    user: user,
    pass: pass
  })
  .then(() => {
    console.log("Conectado");
  })
  .catch(r => {
    console.log(r);
  });

requireDir("./src/models");

app.use("/api", require("./src/routes"));

app.listen(3001);
