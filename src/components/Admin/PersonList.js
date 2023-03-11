import React from "react";
import Cardsingle from "./Cardsingle";
import "../../css/Search.css";

function PersonList({ items }) {
  return (
    <div className="individualCard">
      {items.map((person) => (
        <Cardsingle key={person.id} person={person} />
      ))}
    </div>
  );
}

export default PersonList;
