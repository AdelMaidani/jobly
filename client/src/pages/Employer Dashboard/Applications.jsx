import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationCard from "../../components/ListedCompanyJobCard";
import CompanyContext from "../../context/companyContext";

function Applications() {
  const { company } = useContext(CompanyContext);
  const [job, setJobs] = useState([]);
  const navigate = useNavigate();
  const [dataStatus, setDataStatus] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    axios({
      method: "Post",
      headers: { "content-type": "application/json" },
      url: "http://localhost:3000/job/listedjob",
      data: { companyName: company.companyName },
    })
      .then((res) => {
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          setDataStatus(true);
          setJobs(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [company]);

  return (
    <div className="md:ml-44 m-5 flex flex-col gap-4">
      <div className="text-ls font-bold">Listed Jobs</div>
      <div
        onClick={() => navigate("/listajob")}
        className={` hover:underline ${dataStatus ? "hidden" : "block"}`}
      >
        Click here to list a job
      </div>
      <div className="text-xs">
        {job.map(({ titleofJob, companyName, _id, status }) => (
          <ApplicationCard
            key={_id}
            _id={_id}
            companyName={companyName}
            titleofJob={titleofJob}
            status={status}
            button="Applicants"
          />
        ))}
      </div>
    </div>
  );
}

export default Applications;
