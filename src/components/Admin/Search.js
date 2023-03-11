import React, { useState } from "react";
import PersonList from "./PersonList";

function Search({ details }) {
  const [searchField, setSearchField] = useState("");

  const filteredPersons = details.filter((person) => {
    return person.userName.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <>
      <div className="header">
        <div className="SearchBarDiv">
          <div className="SearchStudent">
            {/* <div id="combo-box-demo" className="SearchPanel"> */}
            {/* <div> */}
            <input
              type="search"
              // id="combo-box-demo"
              // className="SearchPanel"
              placeholder="Search User"
              onChange={handleChange}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="body">
        <div className="Scard">
          <PersonList items={filteredPersons} />
        </div>
      </div>
    </>
  );
}

export default Search;
