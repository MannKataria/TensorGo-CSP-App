import { useState } from "react";
import axios from "axios";
import Intercom from "@intercom/messenger-js-sdk";
import styles from "./Home.module.css";

const Home = (props) => {
  const user = props.user;
  Intercom({
    app_id: "h0c8zglc",
    user_id: user.sub,
    name: user.name,
    email: user.email,
    created_at: user.createdAt,
  });
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState("");
  const userId = user.sub;
  const userEmail = user.email;
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post("http://localhost:5000/submit", {
        userId,
        category,
        comments,
        userEmail,
      });
      setSuccessMessage("Request submitted successfully.");
      setCategory("");
      setComments("");
      console.log(response);
    } catch (error) {
      setErrorMessage("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };
  return (
    <div className={styles.form_container}>
      {/* <h1 className={styles.form_heading}>Profile</h1>
      <img src={user.picture} className={styles.profile_img} alt="profile" />
      <p className={styles.text}>{user.name}</p>
      <p className={styles.text}>{user.email}</p> */}
      <h2 className={styles.form_heading}>Submit a Customer Service Request</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_item}>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.form_input}
          >
            <option value="">Select Category</option>
            <option value="General Queries">General Queries</option>
            <option value="Product Features Queries">
              Product Features Queries
            </option>
            <option value="Product Pricing Queries">
              Product Pricing Queries
            </option>
            <option value="Product Feature Implementation Requests">
              Product Feature Implementation Requests
            </option>
          </select>
        </div>

        <div className={styles.form_item}>
          <label>Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows="3"
            placeholder="Describe your issue..."
            className={styles.form_input}
          />
        </div>

        <div className={styles.form_item}>
          <label>Your Email:</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className={styles.form_input}
          />
        </div>

        <button
          className={`${styles.btn} ${styles.submit}`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
      <button className={`${styles.btn} ${styles.log_out}`} onClick={logout}>
        Log Out
      </button>
    </div>
  );
};

export default Home;
