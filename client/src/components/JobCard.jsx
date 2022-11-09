import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Jobs(props) {
  const checkIfObjEmt =
    Object.keys(props).length === 0 && props.constructor === Object;

  const TagsMobileView = () => {
    if (checkIfObjEmt === true) {
    } else {
      const tag = props.skillsRequired;
      const newTag = tag
        .split(",")
        .slice(0, 2)
        .map((str) => (
          <p className="text-black bg-white p-1 rounded-sm max-w-14 h-6 text-ellipsis overflow-hidden">
            {str}
          </p>
        ));
      return newTag;
    }
  };
  const Tags = () => {
    if (checkIfObjEmt === true) {
    } else {
      const tag = props.skillsRequired;
      const newTag = tag
        .split(",")
        .map((str) => (
          <p className="text-black bg-white p-1 rounded-sm max-w-14 h-6 text-ellipsis overflow-hidden">
            {str}
          </p>
        ));
      return newTag;
    }
  };

  return (
    <JobContainer className="mr-5 mt-10 ml-5 justify-between flex text-xs items-center bg-black text-white h-30 p-3 lg:ml-40 ">
      <Link to={`/job/${props.link}`} className="flex items-center">
        <div className="p-2 w-20 md:w-auto">
          <img
            className="md:h-24 bg-white"
            src={props.companyLogo}
            alt="Logo"
          />
        </div>
        <div className="p-2 w-60 md:w-auto">
          <span className="flex flex-col md:flex-row gap-1">
            {props.titleofJob}
            <Link
              to={`/company/${props.companyId}`}
              className="text-gray-500 font-bold hover:text-white duration-500"
            >
              at: {props.companyName}
            </Link>
          </span>
          <div className="mt-4">
            <span className="flex sm:hidden gap-4 mr-4 rounded-sm">
              {TagsMobileView()}
            </span>
            <span className="hidden sm:flex gap-4 mr-4 rounded-sm">
              {Tags()}
            </span>
          </div>
        </div>
      </Link>
      <div>
        <Link
          to={`/job/${props.link}`}
          className="border border-white bg-black hover:bg-white hover:text-black duration-500  p-2 "
        >
          View
        </Link>
      </div>
    </JobContainer>
  );
}

const JobContainer = styled.div`
  transition: 1s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

export default Jobs;
