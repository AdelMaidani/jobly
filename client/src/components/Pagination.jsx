function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex gap-3 justify-center items-center m-10">
      <span>{"<"}</span>
      {pageNumbers.map((number) => (
        <span
          onClick={() => paginate(number)}
          className="border duration-300 hover:bg-black cursor-pointer hover:text-white w-7 text-center p-1 border-black"
        >
          {number}
        </span>
      ))}
      <span>{">"}</span>
    </div>
  );
}

export default Pagination;
