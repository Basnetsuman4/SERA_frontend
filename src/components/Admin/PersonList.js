import React from "react";
import Cardsingle from "./Cardsingle";
import Details from "./../Details";
import "../../css/Search.css";

function PersonList({ items }) {
  return (
    <div className="individualCardd">
      {items.map((person) => (<>
        <Cardsingle key={person.id} person={person} />
        <Details key={person.id} person={person} />
      </>
      ))}
    </div>
  );
}

export default PersonList;
