import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApplicantCard from "../../components/ApplicantCard";
import axios from "axios";

function Applicants() {
  const id = useParams();
  const [person, setPerson] = useState([]);
  const [dataStatus, setDataStatus] = useState(true);
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    axios({
      method: "Post",
      url: "http://localhost:3000/job/allApplicants",
      headers: { "content-type": "application/json" },
      data: id,
    })
      .then((res) => {
        setActiveMenu("allApplicants");
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          setPerson(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const acceptedApplicants = () => {
    setPerson([]);
    setActiveMenu("acceptedApplicants");
    axios({
      method: "Post",
      url: "http://localhost:3000/job/acceptedApplicants",
      headers: { "content-type": "application/json" },
      data: id,
    })
      .then((res) => {
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const allApplicants = () => {
    setDataStatus(true);
    setActiveMenu("allApplicants");

    setPerson([]);
    axios({
      method: "Post",
      url: "http://localhost:3000/job/allApplicants",
      headers: { "content-type": "application/json" },
      data: id,
    })
      .then((res) => {
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          setPerson(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const rejectedApplicants = () => {
    setActiveMenu("rejectedApplicants");
    setDataStatus(true);
    setPerson([]);
    axios({
      method: "Post",
      url: "http://localhost:3000/job/rejectedApplicants",
      headers: { "content-type": "application/json" },
      data: id,
    })
      .then((res) => {
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          setPerson(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const pendingApplicants = () => {
    setActiveMenu("pendingApplicants");
    setDataStatus(true);
    setPerson([]);
    axios({
      method: "Post",
      url: "http://localhost:3000/job/pendingApplicants",
      headers: { "content-type": "application/json" },
      data: id,
    })
      .then((res) => {
        if (res.data.length === 0) {
          setDataStatus(false);
        } else {
          setPerson(res.data);
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
            activeMenu === "allApplicants" ? "underline underline-offset-4" : ""
          }`}
          onClick={allApplicants}
        >
          All
        </button>
        <button
          className={`${
            activeMenu === "acceptedApplicants"
              ? "underline underline-offset-4"
              : ""
          }`}
          onClick={acceptedApplicants}
        >
          Accepted
        </button>
        <button
          className={`${
            activeMenu === "rejectedApplicants"
              ? "underline underline-offset-4"
              : ""
          }`}
          onClick={rejectedApplicants}
        >
          Rejected
        </button>
        <button
          className={`${
            activeMenu === "pendingApplicants"
              ? "underline underline-offset-4"
              : ""
          }`}
          onClick={pendingApplicants}
        >
          Pending
        </button>
      </div>
      <div className={`${dataStatus ? "hidden" : "block"}`}>
        No applicants yet !
      </div>
      <div className="flex flex-col gap-5">
        {person.map((data) => (
          <ApplicantCard
            _id={data._id}
            profilePicture={data.profilePicture}
            fullName={data.fullName}
            address={data.address}
            country={data.country}
            jobId={id.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Applicants;
