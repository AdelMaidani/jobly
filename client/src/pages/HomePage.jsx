import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import company1 from "../assets/Random Company Logos/preview_image20200910-30152-dudasm.png";
import company2 from "../assets/Random Company Logos/preview_image20201021-12242-yijvzg.png";
import company3 from "../assets/Random Company Logos/preview_image20201024-18693-1cwylj1.png";
import company4 from "../assets/Random Company Logos/preview_image20210726-8632-1sqqpzc.png";
import company6 from "../assets/Random Company Logos/preview_image20210802-26855-1h0d6zl.png";
import Jobs from "./Jobs";

function HomePage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="bg-white">
      <div className="flex flex-col text-center gap-10 m-10 lg:m-20">
        <h2 className="text-xl font-black lg:mt-5">
          Hire. Get Hired. We're the Best Place for Both.
        </h2>
        <p className="text-sm">
          Whether you need to find top talent, your next great job opportunity
          or a consulting solution for managing your business and resourcing
          challenges, we can help.
        </p>
        <div className="flex justify-center gap-5 items-center">
          <Link
            to="/companyLogin"
            className="lg:text-sm ml-5 bg-black text-white border border-black p-3 ease-out duration-500 hover:bg-white hover:text-black "
          >
            Hire
          </Link>
          <span className="lg:text-xl ">OR</span>
          <Link
            to="/employeeLogin"
            className="lg:text-sm bg-black text-white border border-black p-3 ease-out duration-500 hover:bg-white hover:text-black "
          >
            Get Hired
          </Link>
        </div>
        <div className="flex flex-col gap-10 sm:flex-row justify-between">
          <div>
            <h2 className="font-bold lg:text-xl">1723</h2>
            <span className="lg:text-sm text-lg:mt-14 lg font-bold">Jobs</span>
          </div>
          <div>
            <h2 className="font-bold lg:text-xl">2120</h2>
            <span className="lg:text-sm text-lg:mt-14 lg font-bold">
              Applications
            </span>
          </div>
          <div>
            <h2 className="font-bold lg:text-xl">120</h2>
            <span className="lg:text-sm text-lg:mt-14 lg font-bold">
              Companies
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold text-lg">
            Trusted by World's leading Companies:
          </h2>
          <div className="lg:mt-14 lg:grid-cols-5 grid justify-center items-center grid-cols-3 overflow-hidden">
            <img
              src={company1}
              className="transition duration-500  hover:scale-150 min-h-40"
              alt="company logo 1"
            />
            <img
              src={company2}
              className="transition duration-500  hover:scale-150 min-h-40"
              alt="company logo 2"
            />
            <img
              src={company3}
              className="transition duration-500  hover:scale-150 min-h-40"
              alt="company logo 3"
            />
            <img
              src={company4}
              className="transition duration-500  hover:scale-150 min-h-40"
              alt="company logo 4"
            />
            <img
              src={company6}
              className="transition duration-500  hover:scale-150 min-h-40"
              alt="company logo 6"
            />
          </div>
        </div>
      </div>
      <div>
        <Jobs />
      </div>
    </div>
  );
}

export default HomePage;
