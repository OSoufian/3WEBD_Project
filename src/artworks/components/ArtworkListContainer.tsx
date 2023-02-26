import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Artwork from "./Artwork";
import ArtworkList from "./ArtworkList";
import { useArtworkListQuery } from "./queries";


function ArtworkListContainer() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects")
      .then((response) => response.json())
      .then((data) => setArtworks(data.objectIDs));
  }, []);

  const [searchArtwork, setSearchArtwork] = useState("");
  const ArtworkListQuery = useArtworkListQuery({searchArtwork});

  if (ArtworkListQuery.isLoading) return <p>Loading</p>;
  if (ArtworkListQuery.isError) return <p>Error</p>;

  const { data: Artworks } = ArtworkListQuery;
  const filteredArtworks = Artworks.results.filter((artwork) => artwork.objectName.includes(searchArtwork));
  return <ArtworkList>
    <TextField
        name="search bar"
        placeholder="Search"
        value={searchArtwork}
        style={{
          width: "100%",
          marginBottom: 10,
        }}
        onChange={(e) => setSearchArtwork(e.target.value)}
      />
    {filteredArtworks.map((artwork) => (
      <Artwork key={artwork.objectID} artwork={artwork} />
    ))}
</ArtworkList>;
}

export default ArtworkListContainer;