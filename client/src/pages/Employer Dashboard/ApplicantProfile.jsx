import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ApplicantProfile() {
  const [description, setDescription] = useState({});
  const [status, setStatus] = useState("");
  const id = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    axios({
      method: "Post",
      url: "http://localhost:3000/job/checkIfAppliedCompany",
      headers: { "content-type": "application/json" },
      data: { jobId: id.jobId, personId: id.personId },
    }).then((res) => setStatus(res.data));

    axios({
      method: "Post",
      url: "http://localhost:3000/person/persondata",
      headers: { "content-type": "application/json" },
      data: { id: id.personId },
    })
      .then((res) => setDescription(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const checkStatus = () => {
    if (status === "Accepted") {
      return (
        <div className="mt-5 mb-5 flex gap-10 text-center transition">
          <button className="duration-500 border-green-500 border p-3 bg-green-500 text-white  ">
            Accepted
          </button>
        </div>
      );
    } else if (status === "Rejected") {
      return (
        <div className="mt-5 mb-5 flex gap-10 text-center">
          <button className="duration-500 border-red-500 border p-3 bg-red-500 text-white ">
            Rejected
          </button>
        </div>
      );
    } else if (status === "Pending") {
      return (
        <div className="mt-5 mb-5 flex gap-10 text-center">
          <button
            onClick={acceptApplicant}
            className=" duration-500 border-green-500 border p-3 text-green-500 hover:bg-green-500 hover:text-white "
          >
            Accept
          </button>
          <button
            onClick={rejectApplicant}
            className="duration-500 border-red-500 border p-3 text-red-500 hover:bg-red-500 hover:text-white "
          >
            Reject
          </button>
        </div>
      );
    }
  };

  const acceptApplicant = () => {
    axios({
      method: "Post",
      url: "http://localhost:3000/job/acceptApplicant",
      headers: { "content-type": "application/json" },
      data: { jobId: id.jobId, personId: id.personId },
    })
      .then(() => {
        setStatus("Accepted");
      })
      .catch((err) => console.log(err));
  };
  const rejectApplicant = () => {
    axios({
      method: "Post",
      url: "http://localhost:3000/job/rejectApplicant",
      headers: { "content-type": "application/json" },
      data: { jobId: id.jobId, personId: id.personId },
    })
      .then(() => {
        setStatus("Rejected");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="md:ml-44 m-5 ">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl">{description.fullName}</h3>
          <p className="text-gray-500">
            {description.address}, {description.country}
          </p>
        </div>
        <img
          className="h-24 rounded-full"
          src={description.profilePicture}
          alt="Person"
        />
      </div>
      <hr className="mt-5 mb-5" />
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-4">
          <h3>Email:</h3>
          <button
            className="text-gray-500"
            onClick={() => window.open(`mailto:${description.email}`)}
          >
            {description.email}
          </button>
        </div>
        <div className="flex gap-4">
          <h3>Skills:</h3>
          <p className="text-gray-500">{description.skills}</p>
        </div>
        <div className="flex gap-4">
          <h3>Mobile Number:</h3>
          <button className="text-gray-500">{description.mobileNumber}</button>
        </div>
        <div className="flex gap-4">
          <h3>Portfilio Page:</h3>
          <button
            className="text-gray-500 hover:text-black "
            onClick={() =>
              window.open(`http://${description.portfolioWebsite}`)
            }
          >
            Click to veiw
          </button>
        </div>
      </div>
      {checkStatus()}
    </div>
  );
}

export default ApplicantProfile;
