import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function JobDescription() {
  const id = useParams();
  const [description, setDescription] = useState({});
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    axios({
      method: "Post",
      headers: { "content-type": "application/json" },
      url: "http://localhost:3000/job/listedjob/description",
      data: id,
    })
      .then((res) => {
        setDescription(res.data[0]);
        setStatus(res.data[0].status);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const checkStatus = () => {
    if (status === "Active") {
      return (
        <div className=" transition duration-500 flex gap-5">
          <button className="text-green-500 ">Activated</button>
          <button
            onClick={Deactivate}
            className=" bg-red-500 text-white text-center p-2 hover:bg-white border border-red-500 hover:text-red-500"
          >
            Deactivate
          </button>
        </div>
      );
    } else {
      return (
        <div className=" transition duration-500 flex gap-5">
          <button
            onClick={Activate}
            className=" bg-green-500 text-white text-center p-2 hover:bg-white border border-green-500 hover:text-green-500 "
          >
            Activate
          </button>
          <button className="text-red-500">Deactivated</button>
        </div>
      );
    }
  };

  const Activate = () => {
    axios({
      method: "Post",
      headers: { "content-type": "application/json" },
      url: "http://localhost:3000/job/setstatus",
      data: { jobId: id.id, status: "Active" },
    }).then(() => setStatus("Active"));
  };

  const Deactivate = () => {
    axios({
      method: "Post",
      headers: { "content-type": "application/json" },
      url: "http://localhost:3000/job/setstatus",
      data: { jobId: id.id, status: "Inactive" },
    }).then(() => setStatus("Inactive"));
  };

  const deleteJob = () => {
    axios({
      method: "Post",
      headers: { "content-type": "application/json" },
      url: "http://localhost:3000/job/deletejob",
      data: { id: id.id },
    }).then(() => navigate("/application"));
  };
  const checkIfObjEmt =
    Object.keys(description).length === 0 && description.constructor === Object;

  const aboutTheJob = () => {
    if (checkIfObjEmt === true) {
    } else {
      const text = description.aboutTheJob;
      const newText = text.split("\n").map((str) => <p>{str}</p>);
      return newText;
    }
  };

  const requirement = () => {
    if (checkIfObjEmt === true) {
    } else {
      const text = description.aboutTheJob;
      const newText = text.split("\n").map((str) => <p>{str}</p>);
      return newText;
    }
  };

  return (
    <div className="m-5 md:ml-44 mt-5 mr-5 mb-5 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">
            {description.titleofJob} at Co: {description.companyName}
          </h3>
          <div className="flex mt-5">
            <span className="mr-2 p-2 bg-black text-white text-xs">Node</span>
            <span className="mr-2 p-2 bg-black text-white text-xs">React</span>
          </div>
        </div>
        <div>
          <img className="h-40" src={description.companyLogo} alt="Logo" />
        </div>
      </div>
      <div>
        <h3 className="text-md font-bold">About the Job</h3>
        <br />
        <div className="text-xs">{aboutTheJob()}</div>
        <br />
        <h3 className="text-md font-bold">Requirements</h3>
        <br />
        <div className="text-xs">{requirement()}</div>
        <br />
        <h3 className="text-md font-bold">Skills</h3>
        <br />
        <p className="text-xs">{description.skillsRequired}</p>
        <br />
        <h3 className="text-md font-bold">Salary</h3>
        <br />
        <p className="text-xs">{description.salary}</p>
      </div>
      <br />
      {checkStatus()}

      <span
        onClick={deleteJob}
        className="pt-5 hover:underline hover:text-red-500 hover:cursor-pointer"
      >
        Click here to delete this job
      </span>
    </div>
  );
}

export default JobDescription;
