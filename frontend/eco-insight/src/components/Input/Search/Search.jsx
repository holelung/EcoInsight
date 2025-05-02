import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Search = ({ value, onChange, onClick }) => {

  return (
    <>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded w-64"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
        <button
          className="bg-lime-400 px-3 py-2 mx-2 rounded border hover:bg-lime-300 active:scale-95"
          type="button"
          onClick={ onClick }
        >
          <svg
            id="searchIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Search;
