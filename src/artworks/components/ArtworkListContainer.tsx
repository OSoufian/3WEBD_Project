import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Artwork from "./Artwork";
// import ArtworkList from "./ArtworkList";
import { useArtworkListQuery } from "./queries";
import axios from "axios";

import { ArtworkType } from "../../types";
import { baseUrl } from "../config";
import { ArtworkList } from "./ArtworkList";

function ArtworkListContainer() {
  // const [artworks, setArtworks] = useState<number[] | null>(null);

  // useEffect(() => {
  //   const fetchArtworks = async () => {
  //     const response = await axios.get<number[]>(`${baseUrl}`);
  //     setArtworks(response.data);
  //   };
  //   fetchArtworks();
  // }, []);

  // const [searchArtwork, setSearchArtwork] = useState("");
  // const ArtworkListQuery = useArtworkListQuery({ searchArtwork });

  // if (ArtworkListQuery.isLoading) return <p>Loading</p>;
  // if (ArtworkListQuery.isError) return <p>Error</p>;

  // const { data: Artworks } = ArtworkListQuery;
  // // const filteredArtworks = Artworks.results.filter((artwork) => artwork.objectName.includes(searchArtwork));
  // return <div> Hello </div>;
  //   <ArtworkList>
  //     <TextField
  //         name="search bar"
  //         placeholder="Search"
  //         value={searchArtwork}
  //         style={{
  //           width: "100%",
  //           marginBottom: 10,
  //         }}
  //         onChange={(e) => setSearchArtwork(e.target.value)}
  //       />
  //     {filteredArtworks.map((artwork) => (
  //       <Artwork key={artwork.objectID} artwork={artwork} />
  //     ))}
  // </ArtworkList>;

  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  // const [artworksId, setArtworksId] = useState<number[]>([]);

  // useEffect(() => {
  //   fetch(`${baseUrl}`)
  //     .then((responses) => responses.json())
  //     .then((data) => {
  //       const objectIDs: number[] = data.objectIDs;
  //       const promises = objectIDs.map((objectID) => {
  //         return fetch(
  //           `{${baseUrl}/${objectID}`
  //         ).then((response) => response.json())
  //         .then((artwork) => {
  //           setArtworks((prevArtworks) => [...prevArtworks, artwork]);
  //         });
  //     });
  //     return Promise.all(promises);
  //       });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}`);
      console.log("lol");
      console.log(response);
      const objectIDs = response.data.objectIDs;
      console.log(objectIDs);
      objectIDs.map(async (objectID: number) => {
        const response = await axios.get(`${baseUrl}/${objectID}`);
        console.log(response);
        setArtworks((prevArtworks) => [...prevArtworks, response.data]);
      });
    };
    fetchData();
  }, []);

  console.log(artworks);
  return <ArtworkList Artworks={artworks} />;
}

export default ArtworkListContainer;
