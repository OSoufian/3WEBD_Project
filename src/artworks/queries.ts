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
  options: {
    searchText?: string;
    offset?: number;
    limit?: number;
    hasImages?: boolean;
    isOnView?: boolean;
    artistOrCulture?: string;
    geoLocation?: string;
    dimensions?: string;
  } = {}
) {
  const [artworksHighlight, setArtworksHighlight] = useState<ArtworkType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      let url = "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=s";     
      

      if(options.isOnView !== undefined) {
        url += `&isOnView=${options.isOnView}`;        
      } 

      const response = await axios.get(url);

      const objectIDs = response.data.objectIDs.slice(0, 97);
      const promises = objectIDs.map((objectID: number) => {
        return axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
      });

      const artworksHighlight = await Promise.all(promises);
      setArtworksHighlight(artworksHighlight.map((artwork) => artwork.data));
      setIsLoading(false);
    };
    fetchData();
  }, [options.isOnView]);


  return { artworksHighlight, isLoading };
}