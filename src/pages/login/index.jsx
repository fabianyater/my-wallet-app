import LoginForm from "../../components/Form";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import AuthContext from "../../context/AuthProvider";
import { useContext, useEffect } from "react";

export default function LoginPage() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) {
      navigate("/dashboard");
    }
  }, [auth.token, navigate]);

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>
          Some random sentence about the application
        </h2>
      </div>
      <LoginForm />
    </div>
  );
}
