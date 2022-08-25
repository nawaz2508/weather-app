import {
  Box,
  Center,
  Input,
  InputGroup,
  InputRightElement,

} from "@chakra-ui/react";

// import { MdLocationOn } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";

import { useEffect,useState } from "react";

export const Chakra = ({ coords }) => {
//   console.log(coords.coordinates.lat, "latitude");

  
    const [data, setData] = useState(null);
  const weather_key = "8f90377745b347188210fd84d69d4390";


  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=bhiwandi&appid=${weather_key}&units=metric`).then((res)=>{
    console.log(res.data)
    setData(res.data)
    console.log(data,"data")
    });
  },[]);

  return (
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
        <h1>{data.name}</h1>

        <Box p={6} border="1px solid red"></Box>
      </Box>
    </Center>
  );
};
