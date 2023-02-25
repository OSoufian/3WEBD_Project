import styles from "./ArtworkList.module.css";

type ArtworkListProps = {
  children: React.ReactNode;
};

export default function ArtworkList({ children }: ArtworkListProps) {
  return <div className={styles.list}>{children}</div>;
}
