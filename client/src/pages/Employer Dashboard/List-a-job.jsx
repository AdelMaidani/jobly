import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/User";

function ListAjob() {
  const [change, setChange] = useState(false);
  const navigate = useNavigate("");
  const { userInfo, userId } = useUser();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setChange(false);
      }
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const formik = useFormik({
    initialValues: {
      titleOfJob: "",
      requirement: "",
      skillsRequired: "",
      aboutTheJob: "",
      salary: "",
    },
    validationSchema: Yup.object({
      titleOfJob: Yup.string()
        .required("Job title is Required")
        .min(6, "Minimum 6 charecter required")
        .max(40, "Please shorted the Job Title"),
      requirement: Yup.string()
        .required("Please add some requirement")
        .min(20, "Please add more details about your requirement")
        .max(2000, "Charecter should not exceed 2000"),
      skillsRequired: Yup.string()
        .required("Please add some skill terms")
        .max(100, "Remove some skills, skills should not exceed 20 charecter"),
      aboutTheJob: Yup.string()
        .required("Please add some Details of the job")
        .min(120, "Add some more details, atleast 120 charecter")
        .max(5000, "Charecter should not exceed 5000"),
      salary: Yup.string()
        .required("Please add the salary range in the form of digits")
        .min(5, "Enter valid digits")
        .max(20, "Enter valid digits"),
    }),
    onSubmit: (values, { resetForm }) => {
      formik.values.companyName = userInfo.companyName;
      formik.values.companyLogo = userInfo.companyLogo;
      formik.values.companyId = userId;

      axios({
        method: "Post",
        headers: { "content-type": "application/json" },
        url: "http://localhost:3000/job/createjob",
        data: values,
      })
        .then((res) => {
          console.log(res);
          setChange(!change);
          resetForm({ values: "" });
          scrollToTop();
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="md:ml-44 m-5 text-xs flex flex-col items-center">
      <div
        className={`fixed flex w-5/6 gap-4 z-20 translate-y-2/3 bg-black text-white rounded-md p-3 flex-col justify-center items-center ${
          change ? "fixed" : "hidden"
        }`}
      >
        <h1>Job has been listed</h1>
        <button
          onClick={() => {
            setChange(!change);
            navigate("/listajob");
          }}
          className="text-black border hover:bg-black pl-5 pr-5 hover:text-white duration-300 border-white bg-white p-1"
        >
          Okay
        </button>
      </div>
      <form
        id="updateForm"
        onSubmit={formik.handleSubmit}
        className={`flex w-full flex-col ${change ? "blur z-10" : ""}`}
      >
        <div className="flex flex-col gap-2">
          <label>Title of the Job</label>
          <input
            placeholder="Web Developer"
            name="titleOfJob"
            className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
            onChange={formik.handleChange}
            value={formik.values.titleOfJob}
            onBlur={formik.handleBlur}
            type="text"
          />
          <div className="h-5 text-red-700">
            {formik.touched.titleOfJob && formik.errors.titleOfJob ? (
              <p>{formik.errors.titleOfJob}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Requirement</label>
          <textarea
            placeholder="Use coma to more skills ie: NodeJS, ReactJS, Java"
            name="requirement"
            className="text-xs border-2 h-40 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
            onChange={formik.handleChange}
            value={formik.values.requirement}
            onBlur={formik.handleBlur}
            type="text"
          />
          <div className="h-5 text-red-700">
            {formik.touched.requirement && formik.errors.requirement ? (
              <p>{formik.errors.requirement}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Skills Required</label>
          <input
            placeholder="Use coma to more skills ie: NodeJS, ReactJS, Java"
            name="skillsRequired"
            className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
            onChange={formik.handleChange}
            value={formik.values.skillsRequired}
            onBlur={formik.handleBlur}
            type="text"
          />
          <div className="h-5 text-red-700">
            {formik.touched.skillsRequired && formik.errors.skillsRequired ? (
              <p>{formik.errors.skillsRequired}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>About the Job</label>
          <textarea
            placeholder="Use coma to more skills ie: NodeJS, ReactJS, Java"
            name="aboutTheJob"
            className="text-xs border-2 h-40 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
            onChange={formik.handleChange}
            value={formik.values.aboutTheJob}
            onBlur={formik.handleBlur}
            type="text"
          />
          <div className="h-5 text-red-700">
            {formik.touched.aboutTheJob && formik.errors.aboutTheJob ? (
              <p>{formik.errors.aboutTheJob}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Salary Per Year in Rupees</label>
          <input
            placeholder="10,00,000"
            name="salary"
            className="text-xs border-2 h-6 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
            onChange={formik.handleChange}
            value={formik.values.salary}
            onBlur={formik.handleBlur}
            type="text"
          />
          <div className="h-5 text-red-700">
            {formik.touched.salary && formik.errors.salary ? (
              <p>{formik.errors.salary}</p>
            ) : null}
          </div>
        </div>
        <button
          onBlur={formik.handleBlur}
          type="submit"
          name="submit"
          className="mt-5 mb-5 p-5 bg-white border border-black hover:bg-black hover:text-white transition duration-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ListAjob;
