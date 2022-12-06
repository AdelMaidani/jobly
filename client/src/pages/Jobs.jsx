import React, { useEffect, useState } from "react";
import Search from "../components/search";
import axios from "axios";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";

function Jobs() {
  const [job, setJob] = useState([]);
  const [FirstInput, setFirstInput] = useState("");
  const [SecondInput, setSecondInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [postsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios({
      method: "Get",
      url: "http://localhost:3000/job/allListedJob",
    })
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3000/job/searchbycompany/?p=${FirstInput}`,
    })
      .then((res) => {
        if (res.data.length === 0) {
          setNotFound(true);
          setJob(res.data);
        } else {
          setNotFound(false);
          setJob(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [FirstInput]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3000/job/searchbyJob/?q=${SecondInput}`,
    })
      .then((res) => {
        if (res.data.length === 0) {
          setNotFound(true);
          setJob(res.data);
        } else {
          setNotFound(false);
          setJob(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [SecondInput]);

  const handleJob = (key) => {
    setSecondInput(key);
  };
  const handleLocation = (key) => {
    setFirstInput(key);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = job.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (number) => {
    setCurrentPage(number);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Search
        secondInput={handleLocation}
        firstInput={handleJob}
        firstPlaceholder="Job"
      />
      <div>
        <div
          className={`flex mt-10 flex-col w-full items-center ${
            loading ? "" : "hidden"
          }`}
        >
          <span class="loader"></span>
        </div>
        <div
          className={`flex mt-10 flex-col w-full items-center ${
            notFound ? "" : "hidden"
          }`}
        >
          <span>Not found</span>
        </div>
        <div className="flex flex-col justify-center mb-10 lg:mr-32">
          {currentPosts.map(
            ({
              companyName,
              titleofJob,
              companyId,
              skillsRequired,
              _id,
              companyLogo,
            }) => (
              <JobCard
                key={_id}
                companyName={companyName}
                titleofJob={titleofJob}
                skillsRequired={skillsRequired}
                companyLogo={companyLogo}
                link={_id}
                companyId={companyId}
              />
            )
          )}
        </div>
        <Pagination
          totalPosts={job.length}
          paginate={paginate}
          postsPerPage={postsPerPage}
        />
      </div>
    </div>
  );
}

export default Jobs;
