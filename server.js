const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes"));

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for feedback page
app.get("/feedback", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/pages/feedback.html"))
);

// Wildcard route to direct users to a 404 page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/pages/404.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
