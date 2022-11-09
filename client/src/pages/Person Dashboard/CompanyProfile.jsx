import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function CompanyProfile() {
  const [description, setDescription] = useState([]);
  const [jobs, setJobs] = useState([]);
  const id = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    axios({
      method: "Post",
      url: "http://localhost:3000/company/CompanyDescription",
      headers: { "content-type": "application/json" },
      data: id,
    })
      .then((res) => setDescription(res.data[0]))
      .catch((err) => console.log(err));

    axios({
      method: "Post",
      url: "http://localhost:3000/company/personDashboardCOJobs",
      headers: { "content-type": "application/json" },
      data: id,
    })
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="ml-5 mr-5 md:ml-44">
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
              <MiniJobCard
                key={data._id}
                className="mb-5 bg-black text-white p-5 flex justify-between items-center"
              >
                <span>{data.titleofJob}</span>
                <Link
                  to={`/job/${data._id}`}
                  className="transition duration-500 border bg-white text-black hover:bg-black hover:text-white p-2"
                >
                  Veiw
                </Link>
              </MiniJobCard>
            ))}
          </div>
          <br />
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
