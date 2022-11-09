import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function ApplicationCard(props) {
  const [status, setStatus] = useState("");

  axios({
    method: "Post",
    url: "http://localhost:3000/job/checkIfAppliedCompany",
    headers: { "content-type": "application/json" },
    data: { jobId: props._id, personId: props.Person },
  }).then((res) => setStatus(res.data));

  const renderStatus = () => {
    if (status === "Pending") {
      return <p className="text-yellow-500">Pending</p>;
    } else if (status === "Accepted") {
      return <p className="text-green-500">Accepted</p>;
    } else if (status === "Rejected") {
      return <p className="text-red-500">Rejected</p>;
    }
  };

  return (
    <ApplicationCardContainer className="flex justify-between text-xs bg-black items-center mb-5 text-white p-5">
      <div>
        <h3>{props.titleofJob}</h3>
        <h3>{props.companyName}</h3>
      </div>
      <div className="flex gap-5">
        <h3 className="p-1 flex gap-3">Status: {renderStatus()} </h3>
        <Link
          to={`/company/${props.companyId}`}
          className="border border-white p-1 hover:bg-white cursor-default hover:text-black"
        >
          {props.button}
        </Link>
        <Link
          to={`/job/${props._id}`}
          className="border text-center border-white p-1 hover:bg-white cursor-default hover:text-black"
        >
          Job Description
        </Link>
      </div>
    </ApplicationCardContainer>
  );
}

const ApplicationCardContainer = styled.div`
  transition: 1s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

export default ApplicationCard;
