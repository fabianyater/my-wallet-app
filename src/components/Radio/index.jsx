import React from "react";
import { Icon } from "@iconify/react";

import styles from "./Radio.module.css";

export default function Radio({
  name,
  label,
  image,
  register,
  checked,
  value,
  disabled,
  required
}) {
  return (
    <label className={styles.custom_radio}>
      <input type="radio" {...register(name)} checked={checked} value={value} disabled={disabled} required={required} />
      <span className={styles.radio_btn}>
        <img className={styles.icon} src={image} alt={name} />
      </span>
      <h3>{label}</h3>
    </label>
  );
}
