import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import AuthContext from "../../context/AuthProvider";
import { useContext, useEffect } from "react";
import SignupForm from "../../components/SignupForm";

export default function SignupPage() {
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
      <SignupForm />
    </div>
  );
}
