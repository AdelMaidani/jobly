import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function CompanyProfile() {
  const id = useParams();
  const [description, setDescription] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    axios({
      method: "Post",
      headers: { "content-type": "application/json" },
      url: "http://localhost:3000/company/data",
      data: id,
    })
      .then((res) => {
        setDescription(res.data[0]);
      })
      .catch((err) => console.log(err));

    axios({
      method: "Post",
      headers: { "content-type": "application/json" },
      url: "http://localhost:3000/job/specificCompanyJobs",
      data: id,
    })
      .then((res) => {
        setLoading(false);
        setJobs(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="mt-5 flex flex-col items-center text-sm">
      <div className={` absolute mt-10 z-40 ${loading ? "" : "hidden"}`}>
        <span className="loader"></span>
      </div>
      <div className={` ml-5 mr-5 mb-5 ${loading ? "hidden" : ""}`}>
        <div className="flex justify-between items-center">
          <span className="font-bold text-2xl md:text-4xl">
            {description.companyName}
          </span>
          <img
            className="h-36 rounded-full"
            src={description.companyLogo}
            alt="Logo"
          />
        </div>
        <div>
          <h3 className="font-bold md:text-lg">About the Company</h3>
          <br />
          <p>{description.aboutTheCompany}</p>
          <br />
          <span className="font-bold md:text-lg">Jobs at Etherscan</span>
          <div>
            <br />
            <div className="flex flex-col md:grid md:grid-cols-3 md:gap-10">
              {jobs.map((data) => (
                <MiniJobCard className="mb-5 bg-black text-white p-3 text-sm flex justify-between items-center">
                  <span>{data.titleofJob}</span>
                  <Link
                    to={`/job/${data._id}`}
                    className="transition duration-500 border bg-white text-black hover:bg-black hover:text-white p-2"
                  >
                    View
                  </Link>
                </MiniJobCard>
              ))}
            </div>
            <br />
          </div>
          <div className="flex justify-center">
            <Link
              to="/employeeLogin"
              className="text-white bg-black p-5 hover:text-black hover:bg-white border border-black transition duration-500"
            >
              Connect
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const MiniJobCard = styled.div`
  transition: 1s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

export default CompanyProfile;
