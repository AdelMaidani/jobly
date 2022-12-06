import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Search from "../components/search";
import axios from "axios";
import Pagination from "../components/Pagination";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [FirstInput, setFirstInput] = useState("");
  const [SecondInput, setSecondInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    axios({
      method: "Get",
      url: "http://localhost:3000/company/companies",
    })
      .then((res) => {
        setCompanies(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3000/company/searchbycompany/?q=${FirstInput}`,
    })
      .then((res) => {
        if (res.data.length === 0) {
          setNotFound(true);
          setCompanies(res.data);
        } else {
          setNotFound(false);
          setCompanies(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [FirstInput]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3000/company/searchbyplace/?p=${SecondInput}`,
    })
      .then((res) => {
        if (res.data.length === 0) {
          setNotFound(true);
          setCompanies(res.data);
        } else {
          setNotFound(false);
          setCompanies(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [SecondInput]);

  const handleLocation = (key) => {
    setSecondInput(key);
  };
  const handleCompany = (key) => {
    setFirstInput(key);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = companies.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (number) => setCurrentPage(number);

  return (
    <div>
      <Search
        secondInput={handleLocation}
        firstInput={handleCompany}
        firstPlaceholder="Company"
      />
      <div className="mt-10">
        <div
          className={`flex flex-col w-full items-center ${
            loading ? "" : "hidden"
          }`}
        >
          <span class="loader"></span>
        </div>
        <div
          className={`flex mt-10 mb-10 flex-col w-full items-center ${
            notFound ? "" : "hidden"
          }`}
        >
          <span>Not found</span>
        </div>
        <div className="flex gap-4 cursor-default justify-center flex-wrap m-10">
          {currentPosts.map((data) => (
            <CompanyContainer
              key={data._id}
              className="flex flex-col w-52 items-center justify-center border-4 bg-black border-black p-5"
            >
              <div>
                <img
                  src={data.companyLogo}
                  className="h-24 rounded-full bg-black"
                  alt="logo"
                />
              </div>
              <div className="flex flex-col text-center text-white">
                <span className="p-2 font-bold text-xs text-ellipsis whitespace-nowrap ">
                  {data.companyName}
                </span>
                <span className="p-2 text-xs">{data.country}</span>
                <div className="mt-5">
                  <Link
                    className="p-2 text-black bg-white border transition duration-500 hover:bg-black hover:text-white hover:border-white text-xs"
                    to={`/company/${data._id}`}
                  >
                    Connect
                  </Link>
                </div>
              </div>
            </CompanyContainer>
          ))}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={companies.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

const CompanyContainer = styled.div`
  transition: 1s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

export default Companies;
