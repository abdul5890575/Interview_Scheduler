import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

const FormatSpots = (spots) => {
    if (spots === 1) {
        return `${spots} spot remaining`;
    } else if ( spots === 0) {
        return 'no spots remaining'
    } else {
        return `${spots} spots remaining`
    }
}

export default function DayListItem(props) {
    const dayClass = classnames('day-list__item',{
        "day-list__item--selected": props.selected,
        "day-list__item--full" : props.spots === 0
    });
  
    return (
    <li  className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{FormatSpots(props.spots)}</h3>
    </li>
  );
}