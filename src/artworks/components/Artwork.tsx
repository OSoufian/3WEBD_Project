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
      
          <img
            src={artwork.primaryImage}
            alt={artwork.title}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png";
            }}       
          />
        
        <h2>{artwork.title}</h2>
        <Link to={`/artworks/${artwork.objectID}`}>
          View Details
        </Link>
      </div>
  );
}