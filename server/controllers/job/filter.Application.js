const person = require("../../models/person");
const job = require("../../models/job");

const appliedJobs = (req, res) => {
  const { personId } = req.body;
  person
    .find({
      _id: { $in: personId },
    })
    .then((resp) => {
      if (resp.length === 0) {
      } else {
        job
          .find({
            _id: { $in: resp[0].jobs },
          })
          .then((resp) => res.send(resp))
          .catch((err) => res.send(err));
      }
    });
};

const acceptedJobs = (req, res) => {
  const { personId } = req.body;
  person
    .find({
      _id: { $in: personId },
    })
    .then((resp) => {
      if (resp.length === 0) {
      } else {
        job
          .find({
            _id: { $in: resp[0].acceptedJobs },
          })
          .then((resp) => res.send(resp))
          .catch((err) => res.send(err));
      }
    });
};

const rejectedJobs = (req, res) => {
  const { personId } = req.body;
  person
    .find({
      _id: { $in: personId },
    })
    .then((resp) => {
      if (resp.length === 0) {
      } else {
        job
          .find({
            _id: { $in: resp[0].rejectedJobs },
          })
          .then((resp) => res.send(resp))
          .catch((err) => res.send(err));
      }
    });
};

const pendingForReviewJobs = (req, res) => {
  const { personId } = req.body;
  person
    .find({
      _id: { $in: personId },
    })
    .then((resp) => {
      if (resp.length === 0) {
      } else {
        job
          .find({
            _id: { $in: resp[0].pendingForReview },
          })
          .then((resp) => res.send(resp))
          .catch((err) => res.send(err));
      }
    });
};

module.exports = {
  appliedJobs,
  acceptedJobs,
  rejectedJobs,
  pendingForReviewJobs,
};
