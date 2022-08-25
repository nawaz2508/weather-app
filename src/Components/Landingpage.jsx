import { useState } from "react";
import { useEffect } from "react";
import "../App.css";

import {
  Box,
  Center,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import Graph1 from "./Graph1";
import Graph2 from "./Graph2";
// import {days} from "./Days";

const getAllDays = () => {
  const weakday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let arr = [];

  const d = new Date();

  const day = weakday[d.getDay()];

  weakday.filter((ele, ind) => {
    if (day === ele) {
      for (let i = 0; i < 8; i++) arr.push(weakday[(ind + i) % 7]);
    }

    return 1;
  });

  return arr;
};

export const CurrentLocation = () => {
  const days = getAllDays();
  const [list, setlist] = useState([]);
  const [change, setchange] = useState([]);
  const [index, setIndex] = useState(0);

  const [citiesdata, setcitiesdata] = useState([]);

  const [cityname, setCityname] = useState("");
  const Obj = {
    max: "",
    pressure: "",
    humidity: "",
    sunrise: "",
    sunset: "",
  };

  const key = "8f90377745b347188210fd84d69d4390";
  const key1 = "f75baa644bb10f8f6d085bfdd8cc6121";

  useEffect(() => {
    getlocation();
    getCity();
  }, []);

  useEffect(() => {
    getCity();
  }, [cityname]);

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
    // console.log(typeof position);
    // console.log(position.coords);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setlist(data.daily);
        setchange(data);
        console.log("forecast", data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setCityname(e.target.value);
    // console.log(cityname);
  };

  const getCity = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key1}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setcitiesdata(data);
        console.log("city", data);
        console.log(citiesdata.coord.lat);
        getForecast(citiesdata);
      })
      .catch((err) => console.log(err));
  };

  const getForecast = (e) => {
    console.log(e.coord.lat);

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${e.coord.lat}&lon=${e.coord.lon}&appid=${key}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setlist(data.daily);
        setchange(data);
        console.log("forecast", data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Center py={6}>
        <Box
          maxW={"550px"}
          h={"1000px"}
          w={"full"}
          //   bg={useColorModeValue('white', 'gray.800')}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <InputGroup w="540px">
            <Input
              placeholder="search"
              size="lg"
              w="540px"
              h="50px"
              m="10px"
              onChange={handleChange}
            />

            <InputRightElement
              children={
                <SearchIcon
                  fontSize="25px"
                  position="relative"
                  top="4"
                  right="10px"
                />
              }
            />
          </InputGroup>

          {/* week day chart start */}

          {change.daily ? (
            <div className="days">
              {days.map((el, ind) => (
                <div
                  onClick={() => setIndex(ind)}
                  key={ind}
                  className="day"
                  style={{
                    border: `4px solid ${index === ind ? "blue" : "white"}`,
                  }}
                >
                  <p style={{ fontSize: "20px", fontWeight: "600" }}>{el}</p>
                  {list ? (
                    <>
                      <p>
                        <span>{Math.round(change.daily[ind].temp.max)}°</span>
                        <span style={{ color: "gray" }}>
                          {Math.round(change.daily[ind].temp.min)}°
                        </span>
                      </p>
                      <img
                        src={
                          change.daily[ind].weather[0].main === "Clouds"
                            ? "https://cdn-icons-png.flaticon.com/512/1146/1146856.png"
                            : change.daily[ind].weather[0].main === "Rain"
                            ? "https://cdn-icons-png.flaticon.com/512/1146/1146858.png"
                            : change.daily[ind].weather[0].main === "Clear"
                            ? "https://cdn-icons-png.flaticon.com/512/890/890347.png"
                            : ""
                        }
                        alt=""
                      />
                      <p style={{ fontSize: "20px" }}>
                        {change.daily[ind].weather[0].main}
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}

          {/* week day chart start end */}

          {/* Temp and logo start */}

          <div
            style={{
              fontSize: "60px",
              display: "flex",
              fontWeight: "700",
              width: "200px",
              justifyContent: "space-between",
              marginTop: "10px",
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            {change.daily ? (
              <>
                {Math.round(change.daily[index].temp.max)}°C
                <img
                  style={{ width: "60px", height: "60px" }}
                  src={
                    change.daily[index].weather[0].main === "Clouds"
                      ? "https://cdn-icons-png.flaticon.com/512/1146/1146856.png"
                      : change.daily[index].weather[0].main === "Rain"
                      ? "https://cdn-icons-png.flaticon.com/512/1146/1146858.png"
                      : change.daily[index].weather[0].main === "Clear"
                      ? "https://cdn-icons-png.flaticon.com/512/890/890347.png"
                      : ""
                  }
                  alt=""
                />
              </>
            ) : (
              ""
            )}
          </div>

          {/* Temp and logo end*/}

          {/* 1st graph start */}
          <Graph1 data={list} />
          {/* 1st graph end */}

          {/*other data details start */}
          {change.daily ? (
            <>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "50%",
                    backgroundColor: "#0887e129",
                    borderRadius: "5px",
                    padding: "10px",
                    margin: "5px",
                    fontSize: "16px",
                    lineHeight: "18.4px",
                  }}
                >
                  <div style={{ fontWeight: "700", lineHeight: "18.4px" }}>
                    Pressure
                  </div>
                  <div>{change.daily[index].pressure} hpa</div>
                </div>
                <div
                  style={{
                    width: "50%",
                    backgroundColor: "#0887e129",
                    borderRadius: "5px",
                    padding: "10px",
                    margin: "5px",
                    fontSize: "16px",
                    lineHeight: "18.4px",
                  }}
                >
                  <div style={{ fontWeight: "700" }}>Humidity</div>
                  <div>{change.daily[index].humidity}%</div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  fontSize: "16px",
                  lineHeight: "18.4px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "700" }}>Sunrise</div>
                  <div>
                    {new Date(
                      +change.daily[index].sunrise * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: "700" }}>Sunset</div>
                  <div>
                    {new Date(
                      +change.daily[index].sunset * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {/*other data details end */}

          {/*2nd graph start */}
          <Graph2 />
          {/*2nd graph end */}
        </Box>
      </Center>
    </>
  );
};
