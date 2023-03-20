import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Navbar } from "../Navbar";

import styles from "./Header.module.css";

export function Header() {
  const { auth } = useContext(AuthContext);

  return (
    auth.token && (
      <header className={styles.header}>
        <Navbar />
      </header>
    )
  );
}
