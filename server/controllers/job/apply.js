const job = require("../../models/job");
const person = require("../../models/person");

const apply = (req, res) => {
  const { personId } = req.body;
  const { jobId } = req.body;

  job
    .updateMany(
      { _id: jobId },
      {
        $push: {
          applicants: personId,
          pendingForReview: personId,
        },
      }
    )
    .then(() =>
      person.updateMany(
        { _id: personId },
        {
          $push: {
            jobs: jobId,
          },
        }
      )
    )
    .then(() =>
      person.updateMany(
        { _id: personId },
        {
          $push: {
            pendingForReview: jobId,
          },
        }
      )
    )
    .then(() => res.send("done"))
    .catch((err) => res.send(err));
};

const checkIfAppliedPerson = (req, res) => {
  job
    .find({
      _id: { $in: req.body.jobId },
    })
    .then((resp) => res.send(resp[0].applicants.includes(req.body.personId)))
    .catch((err) => res.send(err));
};

module.exports = {
  apply,
  checkIfAppliedPerson,
};
