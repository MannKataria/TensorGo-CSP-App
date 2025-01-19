import { useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";

const Form = (props) => {
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState("");
  const userId = props.userId;
  const userEmail = props.userEmail;
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/submit`,
        {
          userId,
          category,
          comments,
          userEmail,
        }
      );
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
    <div className={styles.form_wrap}>
      <div className={styles.form_container}>
        <h2 className={styles.form_heading}>
          Submit a Customer Service Request
        </h2>
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
              value={userEmail}
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
    </div>
  );
};

export default Form;
