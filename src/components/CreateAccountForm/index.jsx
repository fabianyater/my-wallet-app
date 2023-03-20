import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../utils/env";
import Button from "../Button";
import Input from "../Input";
import styles from "./Account.module.css";

export default function CreateAccountForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { auth } = useContext(AuthContext);

  const onSubmit = (data) => {
    setIsLoading(true);
    fetch(`${API_URL}/accounts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({ ...data, userId: auth.userId}),
    })
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_body}>
        <Input
          label="Nombre de la cuenta"
          name="accountName"
          type="text"
          register={register}
          placeholder="General"
          required={true}
        />
        <Input
          label="Moneda"
          name="accountCurrency"
          type="text"
          register={register}
          placeholder="COP"
          required={true}
        />
        <Input
          label="Saldo inicial"
          name="accountBalance"
          type="number"
          register={register}
          placeholder="0"
        />
        <Button title="Crear cuenta" type="submit" isLoading={isLoading} />
      </div>
    </form>
  );
}
