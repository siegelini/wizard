const express = require("express");
const volleyball = require("volleyball");
const app = express();

app.use(volleyball);
app.use(express.static("public"));
app.use("/", require("./Routes/index"));
app.use((err, req, res, next) => {
  res.status(500);
  res.send({
    name: err.name,
    message: err.message,
  });
});

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
