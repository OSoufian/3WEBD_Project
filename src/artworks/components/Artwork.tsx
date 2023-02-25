import React from "react";
import { Link } from "react-router-dom";

import { ArtworkType } from "../../types";

import styles from "./ArtworkCard.module.css";

type ArtworkDetailsProps = {
  artwork: ArtworkType;
};

export default function ArtworkCard(props: ArtworkDetailsProps) {
  const { artwork } = props;
  return (
    <Link to={`/Artworks/${artwork.objectID}`}>
      <div className={styles.card}>
        <div>{artwork.objectName}</div>
        <img
          src={artwork.primaryImage}
          alt={artwork.objectName}
          height={96}
          width={96}
        />
      </div>
    </Link>
  );
}
