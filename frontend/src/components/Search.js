import React, { useState, useEffect } from "react";

function Search(props) {
  const [searchVal, setSearchVal] = useState("");
  const [time, setTime] = useState(0);
  const onSetSearchVal = (e) => {
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    if (time) clearTimeout(time);
    setTime(
      setTimeout(() => {
        if (searchVal.length >= 3) {
          props.search(searchVal);
        }
      }, 300)
    );
  }, [searchVal]);

  return (
    <div>
      <form className="search-form">
        <input
          onChange={onSetSearchVal}
          value={searchVal}
          type="text"
          placeholder="Please type title of movie you want..."
        />
      </form>
    </div>
  );
}

export default Search;
