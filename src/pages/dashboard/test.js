import { useState, useEffect } from 'react';
import { Button, Pagination, Table } from '@mui/material';
import { API_URL_DEV } from '../../utils/env';
import styles from "./DashboardStyles.module.css";


export default function TransactionsTable ({ auth }) {
  const [page, setPage] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTxns();
  }, [page]);

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
      console.log('Error getting transactions', error);
    }
  };

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

  return (
    <div>
      <Table transactions={transactions} />
      {transactions.length > 0 && (
        <div className={styles.pagination}>
          <Button
            variant="contained"
            onClick={handlePrevPage}
            disabled={page <= 1}
            style={{ color: '#fff' }}
          >
            Anterior
          </Button>
          <Pagination
            count={Math.ceil(totalTransactions / 5)} // total de páginas
            page={page} // página actual
            onChange={(event, value) => setPage(value)} // manejar el cambio de página
            disabled={totalTransactions === 0} // deshabilitar si no hay transacciones
            color="primary"
            size="small"
            shape="rounded"
          />
          <Button
            variant
            ="contained"
            onClick={handleNextPage}
            disabled={transactions.length < 5}
            style={{ color: '#fff' }}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}