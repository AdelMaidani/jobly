import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import editIcon from "../../assets/Icons/edit.png";
import PersonContext from "../../context/personContext";

function Profile() {
  const { Person } = useContext(PersonContext);
  const [description, setDescription] = useState({});
  const [label, setLabel] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [change, setChange] = useState(false);
  const id = { personId: Person._id };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      skills: "",
      linkedin: "",
      address: "",
      country: "",
      mobileNumber: "",
    },

    onSubmit: (values) => {
      const merged = { ...values, ...id };
      console.log(merged);
      axios({
        method: "Post",
        headers: { "content-type": "application/json" },
        url: `http://localhost:3000/person/editPersonData/${fieldName}`,
        data: merged,
      })
        .then((res) => {
          // console.log(res);
          setChange(!change);
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    axios({
      method: "Post",
      headers: { "content-type": "application/json" },
      url: "http://localhost:3000/person/personData",
      data: { id: Person._id },
    }).then((res) => setDescription(res.data[0]));
  }, [Person]);

  const edit = (Label, fieldName) => {
    setLabel(Label);
    setFieldName(fieldName);
    setChange(!change);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setChange(false);
      }
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:ml-44 m-5 flex flex-col z-10 ">
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className={`absolute w-5/6 h-4/5 justify-between flex flex-col gap-4 bg-black text-white p-4 border border-black ${
            change ? `absolute z-30` : `hidden`
          }`}
        >
          <div className="flex justify-between">
            <span className="font-bold">Edit {label}</span>
            <span
              className="font-bold hover:cursor-pointer"
              onClick={() => setChange(!change)}
            >
              X
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <label>{label}</label>
            <textarea
              name={fieldName}
              placeholder={label}
              className="text-xs border-2 text-black h-44 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
            />
          </div>

          <button
            onBlur={formik.handleBlur}
            className="bg-white text-xs p-1 text-black border duration-300 hover:bg-black hover:text-white"
            type="submit"
          >
            Save Change
          </button>
        </form>
      </div>
      <div className={` flex flex-col gap-4 ${change ? "blur z-10" : ""}`}>
        <div className="flex items-center gap-3">
          <span className="flex gap-4">
            <p className="font-bold">Full Name:</p>
            <p>{description.fullName}</p>
          </span>
          <img
            className="h-4 hover:rotate-45 duration-200"
            src={editIcon}
            alt="edit"
            onClick={() => edit("Full Name", "fullName")}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="flex gap-4">
            <p className="font-bold">Address:</p>
            <p>{description.address}</p>
          </span>
          <img
            className="h-4 hover:rotate-45 duration-200"
            src={editIcon}
            alt="edit"
            onClick={() => edit("Address", "address")}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="flex gap-4">
            <p className="font-bold">Country:</p>
            <p>{description.country}</p>
          </span>
          <img
            className="h-4 hover:rotate-45 duration-200"
            src={editIcon}
            onClick={() => edit("Country", "country")}
            alt="edit"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="flex gap-4">
            <p className="font-bold">Email:</p>
            <p>{description.email}</p>
          </span>
          <img
            className="h-4 hover:rotate-45 duration-200"
            src={editIcon}
            onClick={() => edit("Email", "email")}
            alt="edit"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="flex gap-4">
            <p className="font-bold">Mobile Number:</p>
            <p>{description.mobileNumber}</p>
          </span>
          <img
            className="h-4 hover:rotate-45 duration-200"
            src={editIcon}
            alt="edit"
            onClick={() => edit("Mobile Number", "mobileNumber")}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="flex gap-4">
            <p className="font-bold">Skills:</p>
            <p>{description.mobileNumber}</p>
          </span>
          <img
            className="h-4 hover:rotate-45 duration-200"
            src={editIcon}
            alt="edit"
            onClick={() => edit("Skills", "skills")}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
