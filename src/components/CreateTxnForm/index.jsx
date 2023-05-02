import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import {
  transactionInputOptions,
  transactionTypeOptions,
} from "../../utils/inputOptions";
import { API_URL_DEV } from "../../utils/env";

import AuthContext from "../../context/AuthProvider";
import Button from "../Button";
import Input from "../Input";
import Radio from "../Radio";

import styles from "./Transaction.module.css";
import axios from "axios";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function CreateTxnForm({ getTxns }) {
  const form = useForm({
    /* defaultValues: {
      type: "income",
    }, */
    mode: "onChange",
  });
  const { register, handleSubmit, reset } = form;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [created, setCreated] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: auth.token,
    },
  };

  const updateAccountBalance = (data) => {
    if (data?.transactionType === "income") {
      setAuth({
        ...auth,
        accountBalance:
          Number(auth.accountBalance) + Number(data.transactionAmount),
      });
    } else {
      setAuth({
        ...auth,
        accountBalance: auth.accountBalance - data.transactionAmount,
      });
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    if (value === "0") {
      setAuth({
        ...auth,
        categoryValue: null,
      });
    } else {
      setAuth({
        ...auth,
        categoryValue: value,
      });
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const requestData = {
      ...data,
      accountId: auth.selectedAccountValue,
      categoryId: auth.categoryValue,
    };

    try {
      await axios.post(`${API_URL_DEV}/transactions/`, requestData, options);

      reset();
      updateAccountBalance(data);
      getTxns();

      setCreated(true);

      toast.success("Transaction successfully created", {
        icon: "😎",
        style: {
          color: "green",
        },
        duration: 5000,
      });
    } catch (error) {
      setError(true);

      toast.error(error.response.data.message, {
        icon: "😢",
        style: {
          color: "red",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    const response = await fetch(`${API_URL_DEV}/categories/`, {
      headers: {
        Authorization: auth?.token,
      },
    });

    const data = await response.json();

    try {
      setCategories(data);
    } catch (error) {
      console.log("Error getting categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.form_title}>Movimiento rápido</h2>
      {error && (
        <div>
          <Toaster position="top-center" />
        </div>
      )}
      {created && (
        <div>
          <Toaster position="top-center" />
        </div>
      )}
      <div className={styles.input_group}>
        {transactionTypeOptions.map((option) => (
          <Radio
            key={option.value}
            name={option.name}
            value={option.value}
            label={option.label}
            image={option.image}
            register={register}
            disabled={option.disabled}
          />
        ))}
      </div>
      <div className={styles.category_select}>
        <label htmlFor="category">Categoría</label>
        <select
          className={styles.select}
          title="Cuentas"
          id="category"
          onChange={handleChange}
          required
        >
          <option value={0}>Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      {transactionInputOptions.map((option) => (
        <Input
          key={option.name}
          label={option.label}
          name={option.name}
          type={option.type}
          register={register}
          placeholder={option.placeholder}
          required={option.required}
          maxLength={option.maxLength}
          min={option.min}
        />
      ))}
      <Button type="submit" text="Enviar" isLoading={isLoading} />
    </form>
  );
}
