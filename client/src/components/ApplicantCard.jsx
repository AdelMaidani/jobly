import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function ApplicantCard(props) {
  const [status, setStatus] = useState("");

  axios({
    method: "Post",
    url: "http://localhost:3000/job/checkIfAppliedCompany",
    headers: { "content-type": "application/json" },
    data: { jobId: props.jobId, personId: props._id },
  }).then((res) => setStatus(res.data));

  const checkStatus = () => {
    if (status === "Accepted") {
      return (
        <div className="text-gray-400 flex gap-2">
          {" "}
          Status: <p className="text-green-500">{status}</p>
        </div>
      );
    } else if (status === "Rejected") {
      return (
        <div className="text-gray-400 flex gap-2">
          {" "}
          Status: <p className="text-red-500">{status}</p>
        </div>
      );
    } else {
      return (
        <div className="text-gray-400 flex gap-2">
          {" "}
          Status: <p className="text-yellow-500">{status}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <ApplicantsCard
        key={props._id}
        className="bg-black text-xs text-white p-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <img
            src={props.profilePicture}
            className=" w-14 h-14 object-cover rounded-full"
            alt="Person"
          />
          <div>
            <h3>{props.fullName}</h3>
            <p className="text-gray-500 hidden lg:block">
              {props.address}, {props.country}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {/* Status: <p className="text-white">{status}</p> */}
          {checkStatus()}

          <Link
            to={`/applicant/${props.jobId}/${props._id}`}
            className="border border-white p-2 hover:bg-white hover:text-black duration-500"
          >
            Review
          </Link>
        </div>
      </ApplicantsCard>
    </div>
  );
}

const ApplicantsCard = styled.div`
  transition: 1s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

export default ApplicantCard;
