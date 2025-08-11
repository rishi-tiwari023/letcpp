const path = require("path");
const express = require("express");
const morgan = require("morgan");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("home", { title: "Home", message: "Welcome to the homepage!" });
});

const fs = require("fs");

// Generic route for any EJS file in views
app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  if (page === "home") {
    return res.redirect("/");
  }
  const viewPath = path.join(__dirname, "views", `${page}.ejs`);
  if (fs.existsSync(viewPath)) {
    res.render(page, { title: `LeetCode ${page}` });
  } else {
    next();
  }
});

// Fallback 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});

// Start server
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://${host}:${port}`);
});
