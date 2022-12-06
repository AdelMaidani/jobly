import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/User";
import ApplicationCard from "../../components/ApplicationCard";

function Applications() {
  const { userId } = useUser();
  const [jobs, setJobs] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveMenu("All");
    axios({
      method: "Post",
      url: "http://localhost:3000/job/appliedjobs",
      headers: { "content-type": "Application/json" },
      data: { personId: userId },
    })
      .then((res) => {
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          setJobs(res.data);
          setDataStatus(true);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const allJobs = () => {
    setJobs([]);
    setActiveMenu("All");
    setDataStatus(true);
    axios({
      method: "Post",
      url: "http://localhost:3000/job/appliedjobs",
      headers: { "content-type": "Application/json" },
      data: { personId: userId },
    })
      .then((res) => {
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          setJobs(res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  const acceptedJobs = () => {
    setJobs([]);
    setActiveMenu("Accepted");
    setDataStatus(true);
    axios({
      method: "Post",
      url: "http://localhost:3000/job/acceptedJobs",
      headers: { "content-type": "Application/json" },
      data: { personId: userId },
    })
      .then((res) => {
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          setJobs(res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  const rejectedJobs = () => {
    setJobs([]);
    setActiveMenu("Rejected");
    setDataStatus(true);
    axios({
      method: "Post",
      url: "http://localhost:3000/job/rejectedjobs",
      headers: { "content-type": "Application/json" },
      data: { personId: userId },
    })
      .then((res) => {
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          setJobs(res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  const pendingForReview = () => {
    setJobs([]);
    setActiveMenu("Pending");
    setDataStatus(true);
    axios({
      method: "Post",
      url: "http://localhost:3000/job/pendingForReviewjobs",
      headers: { "content-type": "Application/json" },
      data: { personId: userId },
    })
      .then((res) => {
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          setJobs(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="md:ml-44 m-5 flex flex-col gap-4">
      <div className="text-lg flex gap-4 font-bold">
        <span>Sort by:</span>
        <button
          className={`${
            activeMenu === "All" ? "underline underline-offset-4" : ""
          }`}
          onClick={allJobs}
        >
          All
        </button>
        <button
          className={`${
            activeMenu === "Accepted" ? "underline underline-offset-4" : ""
          }`}
          onClick={acceptedJobs}
        >
          Accepted
        </button>
        <button
          className={`${
            activeMenu === "Rejected" ? "underline underline-offset-4" : ""
          }`}
          onClick={rejectedJobs}
        >
          Rejected
        </button>
        <button
          className={`${
            activeMenu === "Pending" ? "underline underline-offset-4" : ""
          }`}
          onClick={pendingForReview}
        >
          Pending
        </button>
      </div>
      <div className={`${dataStatus ? "hidden" : "block"}`}>No jobs yet !</div>
      <div>
        {jobs.map((data) => {
          return (
            <ApplicationCard
              companyId={data.companyId}
              Person={userId}
              titleofJob={data.titleofJob}
              key={data._id}
              companyName={data.companyName}
              _id={data._id}
              button="Company Profile"
            />
          );
        })}
      </div>
    </div>
  );
}

export default Applications;
