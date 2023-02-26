// import styles from "./ArtworkList.module.css";

import { ArtworkType } from "../../types";
import Artwork from "./Artwork";

type ArtworkListProps = {
  Artworks: ArtworkType[];
};

// export default function ArtworkList({ children }: ArtworkListProps) {
//   return <div className={styles.list}>{children}</div>;
// }

export function ArtworkList({ Artworks }: ArtworkListProps) {
  return (
    <div>
      <h1>Artworks</h1>
      <ul>
        {Artworks.map((artwork) => (
          <li><Artwork artwork = {artwork}/></li>
        ))}
      </ul>
    </div>
  );
}
