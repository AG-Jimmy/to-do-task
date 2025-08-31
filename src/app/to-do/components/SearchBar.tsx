"use client";
import { Search } from "lucide-react";
import React from "react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) => {
  return (
    <div className=" col-12 col-md-7 col-lg-9   ">
      <div className="position-relative w-100">
        {/* Icon inside the input */}
        <span
          className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
          style={{ pointerEvents: "none" }}
        >
          <Search size={18} />
        </span>

        <input
          type="text"
          className="form-control ps-5 rounded-3 w-100"
          placeholder="Search by task title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ outline: "none", boxShadow: "none" }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
