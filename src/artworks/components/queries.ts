import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";

import { ArtworkType } from "../../types";

const baseUrl = "https://collectionapi.metmuseum.org";

// {
//     searchArtwork = "",
//   }: { searchArtwork?: string } = {}

export function useArtworkListQuery() {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  //   const [museums, setMuseums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects"
      );
      const objectIDs = response.data.objectIDs.slice(0, 100); // Get the first 20 object IDs
      const promises = objectIDs.map((objectID: number) => {
        return axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
      });
      const artworks = await Promise.all(promises);
      setArtworks(artworks.map((artwork) => artwork.data));

      //   axios
      //     .get(
      //       "https://collectionapi.metmuseum.org/public/collection/v1/departments"
      //     )
      //     .then((response) => {
      //       setMuseums(response.data.departments);
      //     });
    };
    fetchData();
  }, []);

  return artworks;
}

export function useArtworkDetailsQuery(ArtworkId: number | null) {
  return useQuery(["Artworks"], async () => {
    const response = await fetch(`${baseUrl}/Artworks/${ArtworkId}`);
    const json = await response.json();

    return json as ArtworkType;
  });
}
