import React from "react";

const SearchBox = (props) => {
  const handleSearch = (e) => {
    props.setSearchValue(e.target.value);
  };
  return (
    <div className="col col-sm-4">
      <input
        value={props.searchValue}
        onChange={handleSearch}
        type="text"
        className="form-control"
        placeholder="영화 검색..."
      />
    </div>
  );
};

export default SearchBox;
