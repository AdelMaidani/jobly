const company = require("../../models/company");

const editCompanyName = (req, res) => {
  const { companyId } = req.body;
  const { companyName } = req.body;

  company
    .updateOne(
      { _id: companyId },
      {
        $set: {
          companyName: companyName,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editCompanyAddress = (req, res) => {
  const { companyId } = req.body;
  const { address } = req.body;

  company
    .updateOne(
      { _id: companyId },
      {
        $set: {
          address: address,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editCompanyCountry = (req, res) => {
  const { companyId } = req.body;
  const { country } = req.body;

  company
    .updateOne(
      { _id: companyId },
      {
        $set: {
          country: country,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editCompanyEmail = (req, res) => {
  const { companyId } = req.body;
  const { email } = req.body;

  company
    .updateOne(
      { _id: companyId },
      {
        $set: {
          email: email,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editCompanyLinkedin = (req, res) => {
  const { companyId } = req.body;
  const { linkedin } = req.body;

  company
    .updateOne(
      { _id: companyId },
      {
        $set: {
          linkedin: linkedin,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editCompanyMobileNumber = (req, res) => {
  const { companyId } = req.body;
  const { mobileNumber } = req.body;

  company
    .updateOne(
      { _id: companyId },
      {
        $set: {
          mobileNumber: mobileNumber,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const editCompanyAboutTheCompany = (req, res) => {
  const { companyId } = req.body;
  const { aboutTheCompany } = req.body;

  company
    .updateOne(
      { _id: companyId },
      {
        $set: {
          aboutTheCompany: aboutTheCompany,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

module.exports = {
  editCompanyName,
  editCompanyAddress,
  editCompanyCountry,
  editCompanyEmail,
  editCompanyLinkedin,
  editCompanyMobileNumber,
  editCompanyAboutTheCompany,
};
