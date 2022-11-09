const person = require("../../models/person");

const personData = (req, res) => {
  person
    .find({
      _id: { $in: req.body.id },
    })
    .then((resp) => {
      if (resp.length === 0) {
      } else {
        res.send(resp);
      }
    })
    .catch((err) => res.send(err));
};

module.exports = {
  personData,
};
