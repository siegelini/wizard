const express = require("express");
const router = require(".");
const postRouter = express.Router();
const postBank = require("../postBank");

postRouter.get("/", (req, res) => {
  const allPosts = postBank.list();

  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
        ${allPosts
          .map(
            (post) => `
          <div class='news-item'>
            <p>
              <span class="news-position">${post.id}. ▲</span>
              <a href="/posts/${post.id}">${post.title}</a>
              <small>(by ${post.name})</small>
            </p>
            <small class="news-info">
              ${post.upvotes} upvotes | ${post.date}
            </small>
          </div>`
          )
          .join("")}
      </div>
    </body>
  </html>`;

  res.send(html);
});

postRouter.get("/posts/:id", (req, res) => {
  const post = postBank.find(req.params.id);

  if (!post.id) {
    // throw new Error("Not Found");
    post.title = "Post Not Found";
    post.content = "";
    post.name = "";
  } else {
    post.name = `(by ${post.name})`;
  }

  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <h3>${post.title} <small>${post.name}</small></h3>
            <p>${post.content}</p>
          </div>
      </div>
    </body>
  </html>`;

  res.send(html);
});

module.exports = postRouter;
