import { ArtworkType } from "../../types";
import Artwork from "./Artwork";

type ArtworkListProps = {
  Artworks: ArtworkType[];
};

export function ArtworkList({ Artworks }: ArtworkListProps) {
  return (
    <div>
      <h1>Artworks</h1>
      <div>
        {Artworks.map((artwork) => (
          <Artwork artwork={artwork} />
        ))}
      </div>
    </div>
  );
}