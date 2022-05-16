import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
//import { GoogleMap, useLoadScript } from "@react-google-maps/api";
//import Base from "./Base.js";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  // marginTop: "5%",
  width: "100%",
  height: "100vh",
};
const center = { lat: 15.475479, lng: 120.596352 };
const libraries = ["places"];
function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBs1ILgcX75f1Zxs9D72I94x2DO_q4lFJQ", //process.env.REACT_APP_GOOGLE_MAPS_API, //
    libraries,
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box left={0} top={0} h="100%" w="100%">
        <GoogleMap
          mapContainerStyle={containerStyle}
          // mapContainerClassName="map-container"
          center={center}
          zoom={10}
          onLoad={(map) => setMap(map)}
        ></GoogleMap>
      </Box>

      <Box
        position="absolute"
        p={4}
        borderRadius="lg"
        mt={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="modal"
      >
        <HStack spacing={4}>
          <Autocomplete>
            <Input type="text" placeholder="Origin" />
          </Autocomplete>
          <Autocomplete>
            <Input type="text" placeholder="Destination" />
          </Autocomplete>
          <ButtonGroup>
            <Button colorScheme="pink" type="submit">
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={() => alert(123)}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: </Text>
          <Text>Duration: </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo(center)}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

// function App() {
//   return <Base />;
// }

export default App;
