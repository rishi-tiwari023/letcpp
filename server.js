const path = require("path");
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  const viewsDir = path.join(__dirname, "views");
  fs.readdir(viewsDir, (err, files) => {
    if (err) {
      console.error("Error reading views directory:", err);
      return res.render("home", {
        title: "Home",
        message: "Welcome to the homepage!",
        solutionCount: 0,
      });
    }

    const excludedFiles = [
      "home.ejs",
      "solutions.ejs",
      "solution-template.ejs",
      "404.ejs",
      "error.ejs",
    ];

    const solutionCount = files.filter(
      (file) => file.endsWith(".ejs") && !excludedFiles.includes(file)
    ).length;

    res.render("home", {
      title: "Home",
      message: "Welcome to the homepage!",
      solutionCount,
    });
  });
});

// API route to serve solutions list
app.get("/api/solutions", (req, res) => {
  const solutionsPath = path.join(__dirname, "solutions.json");
  if (fs.existsSync(solutionsPath)) {
    const solutionsData = JSON.parse(fs.readFileSync(solutionsPath, "utf8"));
    res.json(solutionsData);
  } else {
    res.status(404).json({ error: "Solutions list not found" });
  }
});

// Route to serve solutions list page
app.get("/solutions", (req, res) => {
  const solutionsPath = path.join(__dirname, "solutions.json");
  if (fs.existsSync(solutionsPath)) {
    const solutionsData = JSON.parse(fs.readFileSync(solutionsPath, "utf8"));
    res.render("solutions", {
      title: "Solutions List",
      solutions: solutionsData.solutions,
      totalCount: solutionsData.totalCount,
      lastUpdated: solutionsData.lastUpdated
    });
  } else {
    res.status(404).render("404", { title: "Solutions Not Found" });
  }
});

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

// Developer page route
app.get("/developer", (req, res) => {
  res.render("developer", { title: "Developer Info" });
});

// Fallback 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});

// Export app for Vercel serverless functions
module.exports = app;

// Start server only if not running on Vercel
if (require.main === module) {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || "0.0.0.0";

  app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://${host}:${port}`);
  });
}
