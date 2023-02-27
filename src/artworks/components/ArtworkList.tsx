// import styles from "./ArtworkList.module.css";
import { useArtworkListQuery } from "./queries";

import { ArtworkType } from "../../types";
import Artwork from "./Artwork";

// type ArtworkListProps = {
//   Artworks: ArtworkType[];
// };

export function ArtworkList() {
  const artworkList: ArtworkType[] = useArtworkListQuery();
  return (
    <div>
      <h1>Artworks</h1>
      <div>
        {artworkList.map((artwork) => (
          <Artwork artwork={artwork} />
        ))}
      </div>
    </div>
  );
}
