import { Image } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { formatCurrency } from "../../utils/currencyFormat";
import { formatDate } from "../../utils/formatDate";
import ButtonFilter from "../ButtonFilter";
import PaginationRounded from "../Pagination";
import face from "../../../src/images/winking-face.png"

import styles from "./Table.module.css";

export default function Table({ transactions }) {
  const INCOME_TYPE = "income";

  const formatAmountByType = (amount, type) => {
    return type === INCOME_TYPE
      ? formatCurrency(amount, 0)
      : `-${formatCurrency(amount, 0)}`;
  };

  return (
    <div style={{height: "100%"}}>
      <div className={styles.table_top}>
        <h2>Movimientos</h2>
        <div className={styles.btns}>
          {transactions.length > 0 && (
            <ButtonFilter text="Ordenar" icon="mingcute:transfer-4-line" />
          )}
          {/* <ButtonFilter text="Filtrar" icon="system-uicons:filtering" /> */}
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className={styles.table_container}>
          <img src={face} title="Winling face" alt="Winking face emoji" />
          <h2>Sin movimientos por aquí... ¡Todo está en orden!</h2>
        </div>
      ) : (
        <table className={styles.table}>
          <thead className={styles.table_head}>
            <tr>
              <th>Categoría</th>
              <th>
                Monto<span className={styles.date}>/Fecha</span>
              </th>
              <th>Fecha</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody className={styles.table_body}>
            {transactions.length > 0 &&
              transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.category.name}</td>
                  <td className={styles.td_amount}>
                    <p
                      className={
                        txn.transactionType === "expense"
                          ? styles.red
                          : styles.green
                      }
                    >
                      {formatAmountByType(
                        txn.transactionAmount,
                        txn.transactionType
                      )}
                    </p>
                    {/* <td>{txn.transactionType === "income" ? "Ingreso" : "Gasto"}</td> */}
                  </td>
                  <td>{formatDate(txn.transactionDate)}</td>
                  <td className={styles.td_desc}>
                    {txn.transactionDescription}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
