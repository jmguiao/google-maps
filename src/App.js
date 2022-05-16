import React, { useState, useRef } from "react";
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
  DirectionsRenderer,
  TrafficLayer,
} from "@react-google-maps/api";

const containerStyle = {
  // marginTop: "5%",
  width: "100%",
  height: "100vh",
};

const center = { lat: 14.554729, lng: 121.024445 };
//const center = { lat: 15.475479, lng: 120.596352 };
const libraries = ["places"];
function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "", //process.env.REACT_APP_GOOGLE_MAPS_API, //
    libraries,
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) return <div>Loading...</div>;

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        // departureTime: new Date(
        //   "Sun May 15 2022 08:04:03 GMT+0800 (Philippine Standard Time)"
        // ),
        departureTime: new Date(Date.now() + 10000), // for the time 10000 milliseconds from now.
        //trafficModel: "pessimistic",
        //trafficModel: "optimistic",
        trafficModel: "bestguess",
      },
      //for testing route
      //provideRouteAlternatives: true,
      // avoidTolls: true,
      // avoidHighways: false,
    });
    //console.log("with data end",result);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

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
          zoom={12}
          onLoad={(map) => setMap(map)}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          <TrafficLayer autoUpdate />
        </GoogleMap>
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
            <Input type="text" placeholder="Origin" ref={originRef} />
          </Autocomplete>
          <Autocomplete>
            <Input type="text" placeholder="Destination" ref={destiantionRef} />
          </Autocomplete>
          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
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
