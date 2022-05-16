import React from "react";
import { useLoadScript } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "100vh",
// };

export default function Base() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "", //process.env.REACT_APP_GOOGLE_MAPS_API, //
  });

  if (!isLoaded) return <div>Loading...</div>;
  //   return (
  //     <GoogleMap
  //       mapContainerStyle={containerStyle}
  //       // mapContainerClassName="map-container"
  //       center={{ lat: 15.475479, lng: 120.596352 }}
  //       zoom={10}
  //     ></GoogleMap>
  //   );
} //
