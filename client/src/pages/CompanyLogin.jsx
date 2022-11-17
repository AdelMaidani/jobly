import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Illustration from "../assets/Illustrations/work.webp";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useUser } from "../context/User";
import { useState } from "react";

function CompanyLogin() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { setUser } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is Required")
        .email("Incorrect email ID"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "Post",
        headers: { "Content-Type": "Application/json" },
        url: "http://localhost:3000/company/login",
        data: values,
        withCredentials: true,
      })
        .then((res) => {
          setUser("Employer");
        })
        .catch((err) => setError(err.response.data));
    },
  });
  return (
    <div className="ml-5 mr-5 mt-10 mb-10 md:grid grid-cols-2 text-sm">
      <div>
        <img
          src={Illustration}
          alt="Work Illustration"
          className="hidden md:block m-h-screen grayscale w-full sticky top-20"
        />
      </div>
      <div>
        <div className="text-xl font-bold">Login as Company</div>
        <br />
        <form
          id="formCompany"
          className="flex flex-col gap-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              placeholder="person@gmail.com"
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

          <div
            className={`${
              error
                ? "text-red-500 text-xl border border-spacing-3 border-red-500 text-center "
                : null
            }`}
          >
            {error}
          </div>

          <div className="flex justify-between mt-5 mb-5 items-center ">
            <button
              onBlur={formik.handleBlur}
              type="submit"
              name="submit"
              className=" p-5 bg-white border border-black hover:bg-black hover:text-white transition duration-500"
            >
              Login
            </button>
            <Link
              to="/companySignup"
              className="hover:underline underline-offset-8"
            >
              Register as Company
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyLogin;
