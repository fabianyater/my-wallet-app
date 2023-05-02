import React, { useContext, useEffect, useState } from "react";

import CreateAccountForm from "../../components/CreateAccountForm";
import CreateTxnForm from "../../components/CreateTxnForm";
import BalanceCard from "../../components/BalanceCard";
import Table from "../../components/Table";

import AuthContext from "../../context/AuthProvider";
import { API_URL_DEV } from "../../utils/env";

import styles from "./DashboardStyles.module.css";
import { DotSpinner } from "@uiball/loaders";
import { Box, Button, Icon, IconButton, Pagination } from "@mui/material";
import {
  ArrowBack,
  ArrowBackIos,
  ArrowBackIosNew,
  ArrowForward,
  ArrowForwardIos,
} from "@mui/icons-material";

export default function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchAccounts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL_DEV}/accounts/user/${auth?.userId}`, {
        headers: {
          Authorization: auth?.token,
        },
      });

      const data = await response.json();

      setAccounts(data);
      setAuth({
        ...auth,
        selectedAccountValue: auth.selectedAccountValue || data[0]?.accountId,
      });
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTxns = async () => {
    const response = await fetch(
      `${API_URL_DEV}/transactions/account/${auth?.selectedAccountValue}?page=${page}&size=5`,
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );

    const data = await response.json();

    try {
      setTransactions(data);
      setTotalTransactions(data.length);
    } catch (error) {
      console.log("Error getting transactions", error);
    }
  };

  useEffect(() => {
    if (auth?.selectedAccountValue) {
      fetchTxns();
    }
  }, [auth.selectedAccountValue, page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (transactions.length < 5) {
      // Ya no hay más transacciones, no cambia la página
      return;
    }

    setPage(page + 1);
  };

  useEffect(() => {
    fetchAccounts();
  }, [setAccounts]);

  return !isLoading ? (
    <div className={styles.container}>
      {accounts.length === 0 ? (
        <CreateAccountForm />
      ) : (
        <>
          <div className={styles.left}>
            <BalanceCard accounts={accounts} />
          </div>
          <div className={styles.txn}>
            <Table transactions={transactions} />
            {transactions.length > 0 && (
              <div className={styles.pagination}>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  onClick={handlePrevPage}
                  disabled={transactions.length < 1}
                >
                  <ArrowBackIos style={{ color: "#fff" }} />
                </IconButton>
                <Box sx={{ mx: 2 }}>{`Página ${page}`}</Box>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  onClick={handleNextPage}
                  disabled={transactions.length < 5}
                >
                  <ArrowForwardIos style={{ color: "#fff" }} />
                </IconButton>
              </div>
            )}
          </div>
          <div className={styles.right}>
            <CreateTxnForm getTxns={fetchTxns} />
          </div>
        </>
      )}
    </div>
  ) : (
    <DotSpinner color="#fff" />
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
