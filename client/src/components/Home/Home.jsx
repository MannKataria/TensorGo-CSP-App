import Messages from "../Messages/Messages";
import Form from "../Form/Form";
import styles from "./Home.module.css";

const Home = (props) => {
  const user = props.user;
  const userId = user.sub;
  const userEmail = user.email;

  return (
    <div className={styles.container}>
      <Form userId={userId} userEmail={userEmail} />
      <Messages userId={userId} />
    </div>
  );
};

export default Home;
