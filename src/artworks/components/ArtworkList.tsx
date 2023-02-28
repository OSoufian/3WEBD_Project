import styles from "./ArtworkList.module.css";
import { useArtworkListQuery } from "./queries";

import { ArtworkType } from "../../types";
import Artwork from "./Artwork";

import { useState } from "react";
import { TextField } from "@mui/material";

type ArtworkListProps = {
  children: React.ReactNode;
};

export default function ArtworkList() {
  const artworkList = useArtworkListQuery();
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArtworkList = artworkList.filter((artwork) => {
    if (input === "") {
      return true;
    } else {
      return artwork.title.toLowerCase().includes(input.toLowerCase());
    }
  });

  const itemsPerPage = 6;

  const totalPages = Math.ceil(filteredArtworkList.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button key={i} onClick={() => setCurrentPage(i)}>
        {i}
      </button>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedArtworkList = filteredArtworkList.slice(startIndex, endIndex);

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <TextField
        className={styles["search-input"]}
        placeholder="Rechercher"
        onChange={(event) => setInput(event.target.value)}
      />
      <div className={styles["museum-list"]}>
        {displayedArtworkList.map((artwork) => (
          <Artwork artwork={artwork} key={artwork.objectID} />
        ))}
      </div>
      <div className={styles.pagination}>{pageNumbers}</div>
    </div>
  );
}
// type ArtworkListProps = {
//   children: React.ReactNode;
// };

// export default function ArtworkList({ children }: ArtworkListProps) {
//   return <div>{children}</div>;
// }