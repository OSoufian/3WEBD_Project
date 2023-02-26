import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ArtworkDetails.module.css";

import { ArtworkType } from "../../types";
import { baseUrl } from "../config";

type ArtworkDetailsProps = {
  objectID: number;
};

const ArtworkDetails: React.FunctionComponent<ArtworkDetailsProps> = (
  props
) => {
  const { objectID } = props;
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
      <header>
      </header>    
      <div id={styles.mainContainer}>
        {artwork ? (
          <div>
            <div>
              <p><a href="">Accueil</a> / <a href="">{artwork.department}</a></p>     
            </div>
            <div>
              <div id={styles.mainSection}>
                <div>
                  <h1>{artwork.title}</h1>
                  <a href="">{artwork.culture}</a>
                  <p>{artwork.objectDate}</p>
                  <p><b>Exposé au Met Fifth Avenue dans la Galerie <a href="">{artwork.GalleryNumber}</a></b></p>
                </div>                
                <img id={styles.artworkIcon} src={artwork.primaryImage} alt={artwork.title} />
              </div>
            </div>
          </div>
          
        ) : (
          <p>Artwork inexistant !</p>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetails;
