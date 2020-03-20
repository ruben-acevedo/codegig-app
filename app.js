const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { layout: "landing" });
});

app.use(express.static(path.join(__dirname, "/public")));

app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
