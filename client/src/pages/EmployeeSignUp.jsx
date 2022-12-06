import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Illustration from "../assets/Illustrations/work.webp";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function EmployeeSignUp() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      portfolioWebsite: "",
      skills: "",
      linkedin: "",
      address: "",
      country: "",
      mobileNumber: "",
      profilePicture: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Company Name is Required")
        .min(4, "Minimum 4 charecter required"),
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(4, "Add more character to make your password strong"),
      portfolioWebsite: Yup.string()
        .required("portfolioWebsite link is required")
        .min(6, "Please enter valid portfolioWebsite link")
        .max(35, "Please enter valid portfolioWebsite link"),
      skills: Yup.string()
        .required("Please add some skills")
        .min(5, "Add more skills")
        .max(55, "Please remove some skills"),
      linkedin: Yup.string()
        .required("Linkedin link is required")
        .min(6, "Please enter valid link")
        .max(35, "Please enter valid link"),
      address: Yup.string()
        .required("Address is required")
        .min(10, "Please enter valid address")
        .max(100, "Please enter valid address"),
      mobileNumber: Yup.string()
        .required("Mobile Number is required")
        .max(10, "Enter valid mobile number")
        .min(10, "Enter valid mobile number"),
      profilePicture: Yup.string().required("Pofile picture is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const file = document.getElementById("profilePicture").files[0];
      const { url } = await fetch("http://localhost:3000/s3url").then((res) =>
        res.json()
      );
      await fetch(url, {
        method: "PUT",
        headers: { "content-type": "multipart/form-data" },
        body: file,
      }).then(() => console.log("done"));
      formik.values.profilePicture = url.split("?")[0];
      await axios({
        method: "Post",
        data: values,
        url: "http://localhost:3000/person/register",
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      })
        .then(async (res) => {
          setLoading(false);
          window.location.href = "/";
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data);
        });
    },
  });
  return (
    <div className="flex flex-col items-center text-sm">
      <div className={` absolute mt-10 z-40 ${loading ? "" : "hidden"}`}>
        <span className="loader"></span>
      </div>
      <div
        className={` ml-5 mr-5 mt-10 mb-10 md:grid grid-cols-2 ${
          loading ? "blur" : ""
        }`}
      >
        <div>
          <img
            src={Illustration}
            alt="Work Illustration"
            className="hidden md:block m-h-screen grayscale w-full sticky top-20"
          />
        </div>
        <div>
          <div className="text-xl font-bold">Register as Person</div>
          <br />
          <form
            id="formCompany"
            className="flex flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label>Full Name</label>
              <input
                name="fullName"
                placeholder="Jacob John"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.fullName && formik.errors.fullName ? (
                  <p>{formik.errors.fullName}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                name="email"
                placeholder="name@email.com"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.email && formik.errors.email ? (
                  <p>{formik.errors.email}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <input
                name="password"
                placeholder="Pa$$w0rd"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
              />
              <div className="h-5 text-red-700">
                {formik.touched.password && formik.errors.password ? (
                  <p>{formik.errors.password}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Portfolio Website Link</label>
              <input
                name="portfolioWebsite"
                placeholder="www.johnJacob.com"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.portfolioWebsite}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.portfolioWebsite &&
                formik.errors.portfolioWebsite ? (
                  <p>{formik.errors.portfolioWebsite}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Skills</label>
              <input
                name="skills"
                placeholder="NodeJS, React, MERN Stack"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.skills}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.skills && formik.errors.skills ? (
                  <p>{formik.errors.skills}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Linkedin</label>
              <input
                name="linkedin"
                placeholder="www.Linkedin.com/user/john"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.linkedin}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.linkedin && formik.errors.linkedin ? (
                  <p>{formik.errors.linkedin}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Address</label>
              <input
                name="address"
                placeholder="West Nadakkavu, Major Santhosh Road, Kozhikode, Kerala 673011"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.address && formik.errors.address ? (
                  <p>{formik.errors.address}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Country</label>
              <input
                name="country"
                placeholder="West Nadakkavu, Major Santhosh Road, Kozhikode, Kerala 673011"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.country && formik.errors.country ? (
                  <p>{formik.errors.country}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Mobile Number</label>
              <input
                name="mobileNumber"
                placeholder="8129333374"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobileNumber}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                  <p>{formik.errors.mobileNumber}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Profile Picture</label>
              <input
                name="profilePicture"
                placeholder="Profile Picture"
                className="text-xs border-2 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="profilePicture"
                type="file"
              />
              <div className="h-5 text-red-700">
                {formik.touched.profilePicture &&
                formik.errors.profilePicture ? (
                  <p>{formik.errors.profilePicture}</p>
                ) : null}
              </div>
            </div>

            <div
              className={`${
                error
                  ? "text-red-500 text-xl border border-spacing-3 border-red-500 text-center "
                  : null
              }`}
            >
              {error.toUpperCase()}
            </div>

            <div className="flex justify-between mt-5 mb-5 items-center">
              <button
                onBlur={formik.handleBlur}
                type="submit"
                name="submit"
                className="mt-5 mb-5 p-5 bg-white border border-black hover:bg-black hover:text-white transition duration-500"
              >
                Register
              </button>

              <Link
                to="/companyLogin"
                className="hover:underline underline-offset-8"
              >
                Login as Employer
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSignUp;
