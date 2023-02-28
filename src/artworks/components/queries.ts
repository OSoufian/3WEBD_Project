import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";

import { ArtworkType } from "../../types";

// export function useArtworkListQuery(
//   options: { searchText?: string; offset?: number; limit?: number } = {}
// ) {
//   const { searchText = "", limit = 9, offset = 0 } = options;
//   // const [artworks, setArtworks] = useState<ArtworkType[]>([]);

//   return useQuery(
//     ["artworks", { searchText, limit, offset }],
//     async () => {
//       console.log("Salut 0.75");
//       const response = await axios.get(
//         `${baseUrl}/public/collection/v1/search?q=${searchText}&offset=${offset}&limit=${limit}`
//       );
//       const objectIDs = response.data.objectIDs;
//       console.log("Salut 1");
//       const promises = objectIDs.map((objectID: number) => {
//         return axios.get(`${baseUrl}/public/collection/v1/objects/${objectID}`);
//       });
//       console.log("Salut 2");
//       const artworks = await Promise.all(promises);
//       console.log("Salut 3");
//       // setArtworks(artworks.map((artwork) => artwork.data));
//       const finalResponse: ArtworkType[] = artworks.map(
//         (artwork) => artwork.data
//       );
//       console.log("Salut 4");
//       console.log(finalResponse);
//       return {
//         previousOffset: offset > 0 ? offset - limit : null,
//         nextOffset: objectIDs.length === limit ? offset + limit : null,
//         results: finalResponse,
//       };
//     },
//     { enabled: Boolean(searchText), refetchOnWindowFocus: false }
//   );
// }

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

// export function useArtworkDetailsQuery(ArtworkId: number | null) {
//   return useQuery(["Artworks"], async () => {
//     const response = await fetch(`${baseUrl}/Artworks/${ArtworkId}`);
//     const json = await response.json();

//     return json as ArtworkType;
//   });
// }
