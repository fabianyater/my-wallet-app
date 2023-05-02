import { useState, } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { API_URL_DEV } from "../../utils/env";
import styles from "../Form/Form.module.css";
import Button from "../Button";
import Input from "../Input";

export default function SignupForm() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onSubmit = (data) => {
    setIsLoading(true);
    const request = fetch(`${API_URL_DEV}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    request
      .then((response) => response.json())
      .then(() => {
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_head}>
        <h3>Rregistrate</h3>
        <p>Organiza tus finanzas y no pierdas rastro de ellas, c:</p>
      </div>
      <div className={styles.form_body}>
        <Input
          label="Nombre completo"
          name="fullName"
          type="text"
          register={register}
          placeholder="Fullname"
        />
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
          text="Registrarme"
          type="submit"
          icon="ic:round-arrow-right-alt"
          isLoading={isLoading}
        />
      </div>
      <p className={styles.form_bottom}>
        ¿Ya tienes una cuenta?{" "}
        <Link to="/" className={styles.link}>
          Inicia sesión aquí
        </Link>
      </p>
    </form>
  );
}
