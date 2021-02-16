import React from 'react';
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function(spots){
    if(spots === 0){
      return `no spots remaining`;
    }else{
      return spots === 1 ? `1 spot remaining`: `${spots} spots remaining`;
    }
  }

  const spotOutputString = formatSpots(props.spots);

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotOutputString}</h3>
    </li>
  );
}

