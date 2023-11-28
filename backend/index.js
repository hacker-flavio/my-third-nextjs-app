const express = require("express");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: path.resolve(__dirname, "../frontend") });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve static files from the .next/static directory
  server.use(
    "/_next/static",
    express.static(path.join(__dirname, "../frontend/.next/static"))
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(8000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:8000");
  });
});
