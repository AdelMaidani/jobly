import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../utils/Loader.css";

function JobDescription() {
  const id = useParams();
  const [description, setDescription] = useState({});
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const checkIfObjEmt =
    Object.keys(description).length === 0 && description.constructor === Object;

  const skills = () => {
    if (checkIfObjEmt === true) {
    } else {
      const text = description.skillsRequired;
      const newText = text
        .split(",")
        .map((str) => (
          <p className="mr-2 p-2 bg-black text-white text-xs">{str}</p>
        ));
      return newText;
    }
  };
  const aboutTheJob = () => {
    if (checkIfObjEmt === true) {
    } else {
      const text = description.aboutTheJob;
      const newText = text.split("\n").map((str) => <p>{str}</p>);
      return newText;
    }
  };
  const requirment = () => {
    if (checkIfObjEmt === true) {
    } else {
      const text = description.requirment;
      const newText = text.split("\n").map((str) => <p>{str}</p>);
      return newText;
    }
  };

  return (
    <div className="m-10 text-sm">
      <div
        className={`flex mt-5 flex-col w-full items-center ${
          loading ? "" : "hidden"
        }`}
      >
        <span class="loader"></span>
      </div>
      <div className={`${loading ? "hidden" : "block"}`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold flex flex-col text-lg">
              <p>{description.titleofJob}</p>
              <Link
                to={`/company/${description.companyId}`}
                className="text-gray-400 hover:text-black duration-500"
              >
                {" "}
                at Co: {description.companyName}
              </Link>
            </h3>
            <div className="flex mt-5">{skills()}</div>
          </div>
          <div>
            <img
              className="hidden md:block md:h-32"
              src={description.companyLogo}
              alt="Logo"
            />
          </div>
        </div>
        <div>
          <h3 className="text-md mt-10 font-bold">About the Job</h3>
          <br />
          <div className="">
            <p>{aboutTheJob()}</p>
          </div>
          <br />
          <h3 className="text-md font-bold">Requirements:</h3>
          <br />
          <div>
            <p>{requirment()}</p>
          </div>
          <br />
          <h3 className="text-md font-bold">Skills</h3>
          <br />
          <p>{description.skillsRequired}</p>
          <br />
          <h3 className="text-md font-bold">Salary</h3>
          <br />
          <p>{description.salary}</p>
        </div>
        <br />
        <div className=" transition duration-500 bg-black text-white w-20 text-center p-2 hover:bg-white border border-black hover:text-black hover:boder-black">
          <Link to="/employeeLogin">Apply</Link>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
