import React, { useEffect, useState } from "react";
import ArtworkList from "./ArtworkList";

function ArtworkListContainer() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects")
      .then((response) => response.json())
      .then((data) => setArtworks(data.objectIDs));
  }, []);

  return <ArtworkList children={artworks} />;
}

export default ArtworkListContainer;