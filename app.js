const express = require("express");
const morgan = require('morgan');
const postBank = require('./postBank');
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/posts/:id', (req, res,next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if(!post.id){
    const error = new Error('Sorry post not found');
    error.status = 404;
    return next(error);
  }
  
  const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>The Wiz News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <header><img src="/logo.png"/>Wizard News</header>
        <div class='news-list'>
          <small class="news-detail"> 
            <ul>
              <li>${post.title}</li>
              <li>${post.content}</li>
              <li>${post.name}</li>
              <li>${post.date}</li>
            </ul>
          </small>
        </div>
      </body>
    </html>`;
  res.send(html);
})
;

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="news-list">
          <header><img src="/logo.png"/>Wizard News</header>
          ${posts.map(post => `
            <div class='news-item'>
              <p>
                <span class="news-position">${post.id}. ❤️</span>
                <a href="/posts/${post.id}">${post.title}</a> 
                <small>(by ${post.name})</small>
              </p>
              <small class="news-info">
                ${post.upvotes} upvotes | ${post.date}
              </small>
            </div>`
          ).join('')}
        </div>
      </body>
    </html>`;
  res.send(html);
});

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});