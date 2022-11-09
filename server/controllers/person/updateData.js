const person = require("../../models/person");

const editFullName = (req, res) => {
  const { personId } = req.body;
  const { fullName } = req.body;

  person
    .updateOne(
      { _id: personId },
      {
        $set: {
          fullName: fullName,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editEmail = (req, res) => {
  const { personId } = req.body;
  const { email } = req.body;

  person
    .updateOne(
      { _id: personId },
      {
        $set: {
          email: email,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editSkills = (req, res) => {
  const { personId } = req.body;
  const { skills } = req.body;

  person
    .updateOne(
      { _id: personId },
      {
        $set: {
          skills: skills,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editLinkedin = (req, res) => {
  const { personId } = req.body;
  const { linkedin } = req.body;

  person
    .updateOne(
      { _id: personId },
      {
        $set: {
          linkedin: linkedin,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editAddress = (req, res) => {
  const { personId } = req.body;
  const { address } = req.body;

  person
    .updateOne(
      { _id: personId },
      {
        $set: {
          address: address,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editCountry = (req, res) => {
  const { personId } = req.body;
  const { country } = req.body;

  person
    .updateOne(
      { _id: personId },
      {
        $set: {
          country: country,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

module.exports = {
  editAddress,
  editCountry,
  editEmail,
  editFullName,
  editLinkedin,
  editSkills,
};
