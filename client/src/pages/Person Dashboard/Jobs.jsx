import React, { useEffect } from "react";
import ListJobs from "../../pages/Jobs";

function Jobs() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="ml-5 mr-5">
      <ListJobs />
    </div>
  );
}

export default Jobs;
