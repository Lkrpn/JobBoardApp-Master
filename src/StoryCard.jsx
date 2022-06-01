import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { starToggle } from "./store/favoriteSlice";

const StoryCard = ({title,locations,jobId,department}) => {
    const favoriteList = useSelector(state=>state.favorite.favoriteList);
  const dispatcher = useDispatch()
  return (
    <div className="story-card">
      <h1 className="story-card-title">{title}</h1>

      <div className="story-card-bottom">
        <span className="story-card-locations">
          {locations}
        </span>
        <span>| {department}</span>
        <span className="story-card-star" onClick={()=>{
          dispatcher(starToggle(jobId))
        }}>{favoriteList.includes(jobId)?"★":"☆"}</span>
      </div>
    </div>
  );
};

export default StoryCard;
