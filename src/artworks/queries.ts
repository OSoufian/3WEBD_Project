import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./config";

import { ArtworkType } from "../types";

export function useArtworkListQuery(
  options: { searchText?: string; offset?: number; limit?: number } = {}
) {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  //   const [museums, setMuseums] = useState([]);
  const { searchText = "", limit = 9, offset = 0 } = options;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects`
      );
      console.log(response.data);
      const objectIDs = response.data.objectIDs.slice(0,90);
      const promises = objectIDs.map((objectID: number) => {
        return axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
      });
      const artworks = await Promise.all(promises);
      setArtworks(artworks.map((artwork) => artwork.data));
    };
    fetchData();
  }, []);

  return artworks;
}

export function useArtworkHighlightListQuery(
  options: { searchText?: string; offset?: number; limit?: number } = {}
) {
  const [artworksHighlight, setArtworks] = useState<ArtworkType[]>([]);
  //   const [museums, setMuseums] = useState([]);
  const { searchText = "", limit = 9, offset = 0 } = options;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=sun`
      );
      console.log(response.data);
      const objectIDs = response.data.objectIDs.slice(0,100);
      const promises = objectIDs.map((objectID: number) => {
        return axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
      });
      const artworksHighlight = await Promise.all(promises);
      setArtworks(artworksHighlight.map((artwork) => artwork.data));
    };
    fetchData();
  }, []);

  return artworksHighlight;
}

// export function useArtworkDetailsQuery(ArtworkId: number | null) {
//   const [artwork, setArtworkID] = useState<ArtworkType | null>(null);

//   useEffect(() => {
//     const fetchArtwork = async () => {
//       const response = await axios.get<ArtworkType>(
//         `${baseUrl}/public/collection/v1/objects/${ArtworkId}`
//       );
//       setArtworkID(response.data);
//     };

//     fetchArtwork();
//   }, [ArtworkId]);

//   return artwork;
// }
