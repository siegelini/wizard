const morgan = require("morgan");
const express = require("express");
const postBank = require("./postBank");
const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.get("/posts", (req, res) => {
  const allPosts = postBank.list();
  const html = `<body>
  <ul>
  ${allPosts.map((post) => `<li>${post.name}: ${post.title}</li>`)}
  </ul>
  </body>`;
  res.send(html);
});
const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
