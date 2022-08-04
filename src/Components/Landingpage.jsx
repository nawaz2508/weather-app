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


import sunny from "../Images/sunny.png";
import rainy from "../Images/rainy.png";
import cloudy from "../Images/cloudy.png";
import { SearchIcon } from "@chakra-ui/icons";
import Graph1 from "./Graph1";
import Graph2 from "./Graph2";

export const CurrentLocation = () => {
  const [list, setlist] = useState([]);
  const [change, setchange] = useState();
  const [Toggle, setToggle] = useState(true);
  const [Maximum, setMaximum] = useState();
  const [Humidity, setHumidity] = useState();
  const [Pressure, setPressure] = useState();
  const [Sun, setSun] = useState();
  const [Rise, setRise] = useState();
  const [suggest, setsuggest] = useState(false);
  const [citiesdata, setcitiesdata] = useState([]);
  const [GraphData, setGraphdata] = useState({});
  const Obj = {
    max: "",
    pressure: "",
    humidity: "",
    sunrise: "",
    sunset: "",
  };

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
          <Input placeholder="Search" size="lg" w="540px" h="50px" m="10px" />
          {/* <InputLeftElement children={<MdLocationOn fontSize='40px' margin='20px'/>}/> */}
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
        {/* <h1>{data.name}</h1> */}

        {/* <Box p={6} border="1px solid red"></Box> */}

        <Graph1 data={list} />
      <Graph2 />
      </Box>
    </Center>
    </>
  );
};
