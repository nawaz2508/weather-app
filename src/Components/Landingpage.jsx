import { useState } from "react";
import { useEffect } from "react";
import "../App.css";

import Graph1 from "./Graph1";
import Graph2 from "./Graph2";

export const CurrentLocation = () => {
  const [list, setlist] = useState([]);

  const key = "8f90377745b347188210fd84d69d4390";
  
  useEffect(() => {
    getlocation();
  }, []);
  
  const getlocation = () => {
    //current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("NS");
    }
  };

  const showPosition = (position) => {
    //current location
    console.log(typeof position);
    console.log(position.coords);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setlist(data.daily))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Graph1 data={list} />
      <Graph2 />
    </>
  );
};
