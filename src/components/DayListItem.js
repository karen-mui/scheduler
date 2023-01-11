import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  let dayClass = classNames('day-list__item', {
    '--selected': props.selected,
    '--full': props.spots === 0
  }).replaceAll(' ', '');


  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}