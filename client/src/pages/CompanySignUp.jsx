import { useEffect } from "react";
import { Link } from "react-router-dom";
import Illustration from "../assets/Illustrations/work.webp";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

function CompanySignUp() {
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
      companyName: "",
      email: "",
      password: "",
      mobileNumber: "",
      website: "",
      linkedin: "",
      address: "",
      aboutTheCompany: "",
      companyLogo: "",
      country: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string()
        .required("Company Name is Required")
        .min(4, "Minimum 4 charecter required"),
      email: Yup.string()
        .required("Email is Required")
        .email("Incorrect email ID"),
      password: Yup.string()
        .required("Password required")
        .min(4, "Minimum 4 charecter required"),
      mobileNumber: Yup.string()
        .required("Mobile number required")
        .min(10, "Invalid number")
        .max(35, "Invalid number"),
      website: Yup.string()
        .required("Website link is required")
        .min(4, "Website not valid"),
      linkedin: Yup.string()
        .required("Linkedin is required")
        .min(5, "Invalid linkedin URL"),
      address: Yup.string()
        .required("Address is required")
        .min(5, "Please enter full address")
        .max(100),
      aboutTheCompany: Yup.string()
        .required("Details about the company is required")
        .min(30, "Please add more details about the company"),
      companyLogo: Yup.string().required("Company logo is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const file = document.getElementById("logo").files[0];
      const { url } = await fetch("http://localhost:3000/s3url").then((res) =>
        res.json()
      );

      await fetch(url, {
        method: "PUT",
        headers: { "content-type": "multipart/form-data" },
        body: file,
      }).then(() => console.log("done"));

      formik.values.companyLogo = url.split("?")[0];

      await axios({
        method: "Post",
        data: values,
        withCredentials: true,
        url: "http://localhost:3000/company/register",
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
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
          <div className="text-xl font-bold">Register Company</div>
          <br />
          <form
            id="formCompany"
            className="flex flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label>Company Name</label>
              <input
                name="companyName"
                placeholder="Wipro"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyName}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.companyName && formik.errors.companyName ? (
                  <p>{formik.errors.companyName}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                placeholder="hr@company.com"
                name="email"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
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
                placeholder="P@ssW0rd"
                name="password"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                type="password"
              />
              <div className="h-5 text-red-700">
                {formik.touched.password && formik.errors.password ? (
                  <p>{formik.errors.password}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Mobile Number</label>
              <input
                placeholder="1001010101"
                name="mobileNumber"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
                onChange={formik.handleChange}
                value={formik.values.mobileNumber}
                onBlur={formik.handleBlur}
                type="number"
              />
              <div className="h-5 text-red-700">
                {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                  <p>{formik.errors.mobileNumber}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Website</label>
              <input
                placeholder="www.website.com"
                name="website"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
                onChange={formik.handleChange}
                value={formik.values.website}
                onBlur={formik.handleBlur}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.website && formik.errors.website ? (
                  <p>{formik.errors.website}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Linkedin</label>
              <input
                placeholder="linkedin.com/company/wipro"
                name="linkedin"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
                onChange={formik.handleChange}
                value={formik.values.linkedin}
                onBlur={formik.handleBlur}
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
                placeholder="28/1650D, Cyberpark Kozhikode Park Rd"
                name="address"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
                onChange={formik.handleChange}
                value={formik.values.address}
                onBlur={formik.handleBlur}
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
                placeholder="28/1650D, Cyberpark Kozhikode Park Rd"
                name="country"
                className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
                onChange={formik.handleChange}
                value={formik.values.country}
                onBlur={formik.handleBlur}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.country && formik.errors.country ? (
                  <p>{formik.errors.country}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>About the company</label>
              <textarea
                className="text-xs border-2 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
                name="aboutTheCompany"
                rows="6"
                onChange={formik.handleChange}
                value={formik.values.aboutTheCompany}
                onBlur={formik.handleBlur}
                type="text"
              />
              <div className="h-5 text-red-700">
                {formik.touched.aboutTheCompany &&
                formik.errors.aboutTheCompany ? (
                  <p>{formik.errors.aboutTheCompany}</p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>Company Logo</label>
              <input
                className="text-xs border-2 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
                name="companyLogo"
                id="logo"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="file"
              />
              <div className="h-5 text-red-700">
                {formik.touched.companyLogo && formik.errors.companyLogo ? (
                  <p>{formik.errors.companyLogo}</p>
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
              {error}
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

export default CompanySignUp;
