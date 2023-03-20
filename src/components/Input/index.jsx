import styles from "./Input.module.css";

export default function Input({
  label,
  name,
  type,
  placeholder,
  register,
  required,
  maxLength,
  min
}) {
  return (
    <div className={styles.input_group}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={name}
        {...register(name)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        min={min}
      />
    </div>
  );
}
