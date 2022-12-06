import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/User";

function JobDescription() {
  const { userId } = useUser();
  const id = useParams();
  const [description, setDescription] = useState({});
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    axios({
      method: "Post",
      url: "http://localhost:3000/job/checkIfApplied",
      headers: { "content-type": "application/json" },
      data: { jobId: id.id, personId: userId },
    })
      .then((res) => {
        if (res.data === true) {
          setApplied(true);
        } else {
          setApplied(false);
        }
      })
      .catch((err) => console.log(err));

    axios({
      method: "Post",
      url: "http://localhost:3000/job/listedjob/description",
      headers: { "content-type": "application/json" },
      data: id,
    })
      .then((res) => setDescription(res.data[0]))
      .catch((err) => console.log(err));
  }, [id, userId]);

  const Apply = () => {
    axios({
      method: "Post",
      url: "http://localhost:3000/job/apply",
      headers: { "content-type": "application/json" },
      data: { jobId: id.id, personId: userId },
    })
      .then(() => setApplied(true))
      .catch((err) => console.log(err));
  };

  const checkIfObjEmt =
    Object.keys(description).length === 0 && description.constructor === Object;

  const Tags = () => {
    if (checkIfObjEmt === true) {
    } else {
      const tag = description.skillsRequired;
      const newTag = tag
        .split(",")
        .map((str) => (
          <p className="text-white text-xs bg-black m-1 p-1">{str}</p>
        ));
      return newTag;
    }
  };

  return (
    <div className="ml-44 mb-5 mr-5 mt-5">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">
            {description.titleofJob} at Co: {description.companyName}
          </h3>
          <div className="flex mt-5">{Tags()}</div>
        </div>
        <div>
          <img className="h-40" src={description.companyLogo} alt="Logo" />
        </div>
      </div>
      <div>
        <h3 className="text-md font-bold">About the Job</h3>
        <br />
        <p>{description.aboutTheJob}</p>
        <br />
        <h3 className="text-md font-bold">Requirements:</h3>
        <br />
        <p>{description.requirment}</p>
        <br />
        <h3 className="text-md font-bold">Skills</h3>
        <br />
        <p>{description.skillsRequired}</p>
        <br />
        <h3 className="text-md font-bold">Salary</h3>
        <br />
        <p>Rs. {description.salary}</p>
      </div>
      <br />
      <div className=" transition duration-500">
        {applied ? (
          <button className=" w-20 text-center p-2 bg-white border border-black text-black ">
            Applied
          </button>
        ) : (
          <button
            className=" bg-black text-white w-20 text-center p-2 hover:bg-white border border-black hover:text-black hover:boder-black"
            onClick={Apply}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}

export default JobDescription;
