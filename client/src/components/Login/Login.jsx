import styles from "./Login.module.css";

const Login = () => {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  return (
    <div className={styles.form_container}>
      <h1 className={styles.form_heading}>Login Form</h1>
      <button className={styles.google_btn} onClick={googleAuth}>
        <img src="./assets/google.png" alt="google icon" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default Login;
