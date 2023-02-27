import React from "react";
import { Link } from "react-router-dom";

import { ArtworkType } from "../../types";

import styles from "./Artwork.module.css";

type ArtworkDetailsProps = {
  artwork: ArtworkType;
};

export default function Artwork(props: ArtworkDetailsProps) {
  const { artwork } = props;
  return (
    <div className={styles.card}>
      <div>{artwork.title}</div>
      <img
        src={artwork.primaryImage}
        alt={artwork.title}
        height={96}
        width={96}
      />
    </div>
  );
}
