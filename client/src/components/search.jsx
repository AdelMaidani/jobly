import React, { useRef } from "react";
import searchIcon from "../assets/Icons/search.png";
import locationIcon from "../assets/Icons/Location.png";

function Search(props) {
  const firstInput = useRef("");
  const secondInput = useRef("");

  const getFirstInput = () => {
    props.firstInput(firstInput.current.value);
  };

  const getSecondInput = () => {
    props.secondInput(secondInput.current.value);
  };

  return (
    <div className="text-xs flex justify-around mt-10 ml-5 mr-5 border-4 border-black p-3 m-1 rounded-lg lg:ml-40 lg:mr-40 ">
      <div className="flex">
        <img className="h-6" src={searchIcon} alt="SearchIcon" />
        <input
          ref={firstInput}
          className="outline-0 pl-5 w-20 sm:w-40"
          type="text"
          placeholder={props.firstPlaceholder}
          onChange={getFirstInput}
        />
      </div>
      <div className="flex">
        <img className="h-6" src={locationIcon} alt="LocaionIcon" />
        <input
          className="outline-0 pl-5 w-20 sm:w-40"
          placeholder="Location"
          type="text"
          ref={secondInput}
          onChange={getSecondInput}
        />
      </div>
    </div>
  );
}

export default Search;
