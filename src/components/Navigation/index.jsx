import { useContext } from "react";
import { Link, redirect } from "react-router-dom";

import { privateRoutes } from "../../routes/privateRoutes";
import AuthContext from "../../context/AuthProvider";

import styles from "./Navigation.module.css";
import { Icon } from "@iconify/react";
import { MenuOutlined } from "@mui/icons-material";
import Button from "../Button";
import { useState } from "react";

export default function Navigation() {
  const { auth } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  console.log(isOpen);

  return (
    <div className={auth.token ? styles.navbar : styles.navbarLogged}>
      {auth.token ? (
        <>
          <nav className={styles.burger_menu}>
            <ul className={styles.menu}>
              {privateRoutes.map(({ label, route }) => (
                <li key={route} className={styles.item}>
                  <Link to={route}>{label}</Link>
                </li>
              ))}
            </ul>
            <Button
              icon="material-symbols:logout-rounded"
              onClick={logout}
              type="button"
            />
          </nav>
          <MenuOutlined style={{cursor: "pointer"}} onClick={() => setIsOpen(!isOpen)} />
        </>
      ) : (
        <Button
          type="button"
          text="Iniciar sesión"
          onClick={() => (window.location.href = "/")}
        />
      )}
    </div>
  );
}
