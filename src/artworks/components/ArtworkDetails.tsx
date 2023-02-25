import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ArtworkDetails.module.css";

import { ArtworkType } from "../../types";

type ArtworkDetailsProps = {
  objectID: number;
};

const ArtworkDetails: React.FunctionComponent<ArtworkDetailsProps> = (
  props
) => {
  const { objectID } = props;
  const baseUrl =
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
  const [artwork, setArtworkID] = useState<ArtworkType | null>(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      const response = await axios.get<ArtworkType>(`${baseUrl}/${objectID}`);
      setArtworkID(response.data);
    };
    fetchArtwork();
  }, [objectID]);

  return (
    <div>
      {artwork ? (
        <div>
          <div id={styles.test}>
            <h1> Artwork {artwork.objectID} : {artwork.title} </h1>
            <img id={styles.artworkIcon} src={artwork.primaryImage} alt={artwork.title} />
          </div>          
          <p>
            <b>Département :</b> {artwork.department}
          </p>
          <p>
            <b>Année d'acquisition:</b> {artwork.accessionYear}
          </p>
        </div>
      ) : (
        <p>Artwork inexistant !</p>
      )}
    </div>
  );
};

export default ArtworkDetails;
