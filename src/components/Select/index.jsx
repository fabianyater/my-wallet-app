import React, { useContext } from "react";

import AuthContext from "../../context/AuthProvider";

import styles from "./Select.module.css";

export default function Select({ accounts }) {
  const { auth, setAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    const { value } = e.target;

    setAuth({
      ...auth,
      selectedAccountValue: value,
    });
  };

  return (
    <select
      value={auth.selectedAccountValue}
      className={styles.select}
      title="Cuentas"
      onChange={handleChange}
    >
      {accounts.map((account) => (
        <option key={account.accountId} value={account.accountId}>
          {account.accountName}
        </option>
      ))}
    </select>
  );
}
