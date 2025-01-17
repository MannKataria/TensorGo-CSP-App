import styles from "./Home.module.css";

const Home = (props) => {
  const user = props.user;
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };
  return (
    <div className={styles.form_container}>
      <h1 className={styles.form_heading}>Profile</h1>
      <img src={user.picture} className={styles.profile_img} alt="profile" />
      <p className={styles.text}>{user.name}</p>
      <p className={styles.text}>{user.email}</p>
      <button className={styles.btn} onClick={logout}>
        Log Out
      </button>
    </div>
  );
};

export default Home;
