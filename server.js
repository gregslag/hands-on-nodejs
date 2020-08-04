const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.routes"));

const port = 3001;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});
