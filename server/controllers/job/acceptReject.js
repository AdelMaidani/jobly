const person = require("../../models/person");
const job = require("../../models/job");

const acceptApplicant = (req, res) => {
  const { personId } = req.body;
  const { jobId } = req.body;

  job
    .updateMany(
      { _id: jobId },
      {
        $push: {
          acceptedApplicants: personId,
        },
      }
    )
    .then(() =>
      person.updateMany(
        { _id: personId },
        {
          $push: {
            acceptedJobs: jobId,
          },
        }
      )
    )
    .then(() =>
      job.updateOne(
        {
          _id: jobId,
        },
        {
          $pull: {
            pendingForReview: personId,
          },
        }
      )
    )
    .then(() =>
      person.updateOne(
        {
          _id: personId,
        },
        {
          $pull: {
            pendingForReview: jobId,
          },
        }
      )
    )
    .then(() => res.send("Accept"))
    .catch((err) => res.send(err));
};

const rejectApplicant = (req, res) => {
  const { personId } = req.body;
  const { jobId } = req.body;

  job
    .updateMany(
      { _id: jobId },
      {
        $push: {
          rejectedApplicants: personId,
        },
      }
    )
    .then(() =>
      person.updateMany(
        { _id: personId },
        {
          $push: {
            rejectedJobs: jobId,
          },
        }
      )
    )
    .then(() =>
      job.updateOne(
        {
          _id: jobId,
        },
        {
          $pull: {
            pendingForReview: personId,
          },
        }
      )
    )
    .then(() =>
      person.updateOne(
        {
          _id: personId,
        },
        {
          $pull: {
            pendingForReview: jobId,
          },
        }
      )
    )
    .then(() => res.send("Reject"))
    .catch((err) => res.send(err));
};

const checkIfAppliedCompany = (req, res) => {
  const { jobId } = req.body;
  const { personId } = req.body;
  job
    .find({
      _id: jobId,
    })
    .then((resp) => {
      if (resp[0].acceptedApplicants.includes(personId)) {
        res.send("Accepted");
      } else if (resp[0].rejectedApplicants.includes(personId)) {
        res.send("Rejected");
      } else {
        res.send("Pending");
      }
    });
};

const pending = (req, res) => {
  job
    .deleteOne(
      {
        _id: req.body.jobId,
      },
      {
        pendingForReview: { $in: req.body.personId },
      }
    )
    .then((resp) => res.send(resp));
};

module.exports = {
  pending,
  checkIfAppliedCompany,
  acceptApplicant,
  rejectApplicant,
};
