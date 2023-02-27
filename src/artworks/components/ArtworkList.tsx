import styles from "./ArtworkList.module.css";
import { useArtworkListQuery } from "./queries";

import { ArtworkType } from "../../types";
import Artwork from "./Artwork";

import {useState} from "react";

type ArtworkListProps = {
  children: React.ReactNode;
};

// export default function ArtworkList({ children }: ArtworkListProps) {
//   return <div className={styles.list}>{children}</div>;
// }

export default function ArtworkList() {
  const artworkList: ArtworkType[] = useArtworkListQuery();
  const [query, setQuery] = useState("");
  return (
    <div>
        <input placeholder="Rechercher" onChange={event => setQuery(event.target.value)} />
        <div className={styles["museum-list"]}>
            {/* {artworkList.map((artwork) => (
              <Artwork artwork={artwork} />
            ))} */}
            {
              artworkList.filter(artworks => {
                if (query === '') {
                  return artworks;
                } else if (artworks.title.toLowerCase().includes(query.toLowerCase())) {
                  return artworks;
                }
              }).map((artwork, index) => (
                <Artwork artwork={artwork} />
            ))
          }
      </div>

    </div>
  );
}


