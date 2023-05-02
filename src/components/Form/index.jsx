import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthProvider";
import { API_URL_DEV } from "../../utils/env";
import styles from "./Form.module.css";
import Button from "../Button";
import Input from "../Input";

export default function LoginForm() {
  const { auth, setAuth } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsLoading(true);
    const request = fetch(`${API_URL_DEV}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    request
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setAuth({
          ...auth,
          token: data.jwt,
          userId: data.userId,
          userName: data.userName,
          fullName: data.fullName,
        });
        localStorage.setItem("token", data.jwt);
        navigate("/dashboard");
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_head}>
        <h3>Inicia sesión</h3>
        <p>Ingresa y continua usando tu Wallet</p>
      </div>
      <div className={styles.form_body}>
        <Input
          label="Nombre de usuario"
          name="userName"
          type="text"
          register={register}
          placeholder="Username"
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          register={register}
          placeholder="Password"
        />
        <Button
          text="Iniciar sesión"
          type="submit"
          icon="ic:round-arrow-right-alt"
          isLoading={isLoading}
        />
      </div>
      <p className={styles.form_bottom}>
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className={styles.link}>
          Regístrate aquí
        </Link>
      </p>
    </form>
  );
}
