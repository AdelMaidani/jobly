import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function ListedCompanyJobCard(props) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (props.status === "Active") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [props]);
  return (
    <ApplicationCardContainer className="mb-2 p-2 flex justify-between bg-black text-white">
      <div className="sm:flex w-full justify-between sm:p-2">
        <div className="flex items-center">
          <p>{props.titleofJob}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <p>Status: </p>
            <p className={`${active ? "text-green-500" : "text-red-500"}`}>
              {props.status}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          to={`/job/applicants/${props._id}`}
          className="border border-white p-2 duration-500 hover:bg-white cursor-default hover:text-black"
        >
          {props.button}
        </Link>
        <Link
          to={`/job/${props._id}`}
          className="border text-center duration-500 border-white p-2 hover:bg-white cursor-default hover:text-black"
        >
          Edit
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

export default ListedCompanyJobCard;
