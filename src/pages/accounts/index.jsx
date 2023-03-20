import React from "react";
import CreateAccountForm from "../../components/CreateAccountForm";

import styles from "./Accounts.module.css";

export default function AccountsPage() {
  return (
    <div className={styles.container}>
      <CreateAccountForm />
    </div>
  );
}
