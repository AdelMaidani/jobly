import { useEffect, useState } from "react";
import axios from "axios";
import editIcon from "../../assets/Icons/edit.png";
import { useUser } from "../../context/User";
import { useFormik } from "formik";

function Profile() {
  const { userId, userInfo } = useUser();
  const [label, setLabel] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [change, setChange] = useState(false);
  const id = { companyId: userId };

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      mobileNumber: "",
      website: "",
      linkedin: "",
      address: "",
      aboutTheCompany: "",
    },

    onSubmit: (values) => {
      const merged = { ...values, ...id };
      axios({
        method: "Post",
        headers: { "content-type": "application/json" },
        url: `http://localhost:3000/company/editCompanyData/${fieldName}`,
        data: merged,
      })
        .then(() => {
          setChange(!change);
        })
        .catch((err) => console.log(err));
    },
  });

  const edit = (Label, fieldName) => {
    document.getElementById("editing").style.overflow = "hidden";
    setLabel(Label);
    setFieldName(fieldName);
    setChange(!change);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setChange(false);
      }
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div id="editing" className="md:ml-44 m-5 flex flex-col z-10">
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
            <p className="font-bold">Company Name:</p>
            <p>{userInfo.companyName}</p>
          </span>
          <img
            className="h-4 hover:rotate-45 duration-200"
            src={editIcon}
            alt="edit"
            onClick={() => edit("Company Name", "companyName")}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="flex gap-4">
            <p className="font-bold">Address:</p>
            <p>{userInfo.address}</p>
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
            <p>{userInfo.country}</p>
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
            <p>{userInfo.email}</p>
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
            <p className="font-bold">Linkedin:</p>
            <p>{userInfo.linkedin}</p>
          </span>
          <img
            className="h-4 hover:rotate-45 duration-200"
            src={editIcon}
            onClick={() => edit("Linkedin", "linkedin")}
            alt="edit"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="flex gap-4">
            <p className="font-bold">Mobile Number:</p>
            <p>{userInfo.mobileNumber}</p>
          </span>
          <img
            className="h-4 hover:rotate-45 duration-200"
            src={editIcon}
            alt="edit"
            onClick={() => edit("Mobile Number", "mobileNumber")}
          />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <span className="flex gap-4">
              <p className="font-bold">About the Company:</p>
              <img
                className="h-4 hover:rotate-45 duration-200"
                src={editIcon}
                onClick={() => edit("About the company", "aboutTheCompany")}
                alt="edit"
              />
            </span>
          </div>
          <span>
            <p>{userInfo.aboutTheCompany}</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
