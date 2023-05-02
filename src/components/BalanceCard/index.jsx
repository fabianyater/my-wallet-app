import { useContext, useEffect } from "react";

import { formatCurrency } from "../../utils/currencyFormat";
import { API_URL_DEV } from "../../utils/env";

import AuthContext from "../../context/AuthProvider";
import Select from "../Select/index";
import styles from "./BalanceCard.module.css";

export default function BalanceCard( {accounts} ) {
  const { auth, setAuth } = useContext(AuthContext);

  const getAccountBalance = async () => {
    const response = await fetch(
      `${API_URL_DEV}/accounts/${auth?.selectedAccountValue}/balance`,
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );

    const { accountBalance } = await response.json();
    
    if (accountBalance?.error) {
      console.log(accountBalance.error);
    } else {
      setAuth({
        ...auth,
        accountBalance: accountBalance,
      });
    }
  };

  useEffect(() => {
    if (auth?.selectedAccountValue) {
      getAccountBalance();
    }
  }, [auth?.selectedAccountValue]);

  return (
    <div className={styles.card_container}>
      <div className={styles.card_body}>
        <div className={styles.card_select}>
          <span>Total en </span>
          <Select accounts={accounts} />
        </div>
        <h2>{auth?.accountBalance == null ? "Loading..." : formatCurrency(auth?.accountBalance, 2)}</h2>
      </div>
    </div>
  );
}
