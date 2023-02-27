import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ArtworkDetails.module.css";

import { ArtworkType } from "../../types";
import { baseUrl } from "../config";
import { useParams } from "react-router";

type ArtworkDetailsProps = {
  objectID: number;
};

export default function ArtworkDetails() {
  const { objectID } = useParams();
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
        <h2 id={styles.logo}>Supknowledge</h2>
      </header>
      <div id={styles.mainContainer}>
        {artwork ? (
          <div>
            <div>
              <p>
                <a href="">Accueil</a> / <a href="">{artwork.department}</a>
              </p>
            </div>
            <div>
              <div id={styles.mainSection}>
                <div>
                  <h1>{artwork.title}</h1>
                  <a href="">{artwork.culture}</a>
                  <p>{artwork.objectDate}</p>
                  <p>
                    <b>
                      Exposé au Met Fifth Avenue dans la Galerie{" "}
                      <a href="">{artwork.GalleryNumber}</a>
                    </b>
                  </p>
                </div>
                <img
                  id={styles.artworkIcon}
                  src={artwork.primaryImage}
                  alt={artwork.title}
                />
              </div>
              <div id={styles.detailsSection}>
                <h2>Artwork Details</h2>
                <p>
                  <b>Titre :</b> {artwork.title}
                </p>
                <p>
                  <b>Date :</b> {artwork.objectDate}
                </p>
                <p>
                  <b>Géographie :</b> {artwork.geographyType} {artwork.country}
                </p>
                <p>
                  <b>Culture :</b> {artwork.culture}
                </p>
                <p>
                  <b>Matière :</b> {artwork.medium}
                </p>
                <p>
                  <b>Dimensions :</b> {artwork.dimensions}
                </p>
                <p>
                  <b>Référence : {artwork.creditLine}</b>
                </p>
                <p>
                  <b>Numéro d'accès : {artwork.accessionNumber}</b>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Artwork inexistant !</p>
        )}
      </div>
    </div>
  );
}
