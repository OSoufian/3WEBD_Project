import { useEffect, useState } from "react";
import axios from "axios";
import { ArtworkType } from "../types";

export function useArtworkListQuery(
  options: { searchText?: string; offset?: number; limit?: number } = {}
) {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);

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
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=sun`
      );
      console.log(response.data);
      const objectIDs = response.data.objectIDs.slice(3,100);
      const promises = objectIDs.map((objectID: number) => {
        return axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
      });
      const artworksHighlight = await Promise.all(promises);
      setArtworks(artworksHighlight.map((artwork) => artwork.data));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { artworksHighlight, isLoading };
}