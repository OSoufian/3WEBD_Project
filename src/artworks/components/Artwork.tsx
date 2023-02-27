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
      <div className={styles["museum-article"]}>
        <object data="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png" type="image/png" height={250}>
          <img
            src={artwork.primaryImage}
            alt={artwork.title}
            className={styles["museum-article__image"]}
            height={250}
          />      
        </object>
        
        <h2 className={styles["museum-article__title"]}>{artwork.title}</h2>
        <Link to={`/artworks/${artwork.objectID}`} className={styles["museum-article__link"]}>
          View Details
        </Link>
      </div>
  );
}