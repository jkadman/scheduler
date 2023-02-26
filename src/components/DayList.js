import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  console.log('daylist:', props)
  // console.log('setday:', props.setDay)
  const dayMap = props.days.map(day => {
    // console.log('day:', day.name)
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay} 
      />
    )
  })
  return (
    <ul>
     {dayMap}
    </ul>
  )
}