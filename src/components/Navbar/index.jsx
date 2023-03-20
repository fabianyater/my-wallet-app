import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@mui/icons-material";
import styles from "./styles.module.css";
import { privateRoutes } from "../../routes/privateRoutes";
import Button from "../Button";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export const Navbar = () => {
  const { auth } = useContext(AuthContext);

  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>
            <Link to="/dashboard">
              Wallet
            </Link>
          </h1>
        </div>
        <div className={styles.menu_icon} onClick={handleShowNavbar}>
          <MenuOutlined />
        </div>
        <div
          className={`${styles.nav_elements} ${showNavbar && styles.active}`}
        >
          <ul>
            {privateRoutes.map(({ label, route }) => (
              <li key={route}>
                <Link className={styles.item} to={route}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {auth.token && (
            <Button
              icon="material-symbols:logout-rounded"
              onClick={logout}
              type="button"
              text="Cerrar sesión"
            />
          )}
        </div>
      </div>
    </nav>
  );
};
