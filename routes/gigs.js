const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");
const sequelize = require("sequelize");
const op = sequelize.Op;

router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs =>
      res.render("gigs", {
        gigs
      })
    )
    .catch(err => console.log(err))
);

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact e-mail" });
  }
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }

    technologies = technologies.toLowerCase().replace(/, /g, ",");

    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
      .then(gig => res.redirect("/gigs"))
      .catch(err => console.log(err));
  }
});

router.get("/search", (req, res) => {
  const { term } = req.query;

  Gig.findAll({ where: { technologies: { [op.like]: "%" + term + "%" } } })
    .then(gigs => {
      res.render("gigs", { gigs });
    })
    .catch(error => console.log(error));
});

module.exports = router;
