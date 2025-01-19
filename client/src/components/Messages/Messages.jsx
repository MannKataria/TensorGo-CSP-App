import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Messages.module.css";

const Messages = ({ userId }) => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/messages/${userId}`
        );
        const tmp = response.data;
        const tmp2 = tmp.map((el) => el.id);
        setConversations(tmp2);
      } catch (err) {
        setError("Failed to fetch conversations");
      }
    };

    fetchConversations();
  }, [userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/conversations/${conversations[0]}`
        );
        console.log(response);
        const tmp = response.data;
        const tmp2 = tmp.map((el) => el);
        setMessages(tmp2);
      } catch (err) {
        setError("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    if (conversations.length !== 0) fetchMessages();
  }, [conversations]);

  return (
    <div className={styles.messages_wrap}>
      <div className={styles.messages_container}>
        {loading ? (
          <p>Loading messages...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            <h3>Customer Service Requests</h3>
            {messages.length === 0 ? (
              <p>No messages found.</p>
            ) : (
              <ul>
                {messages.map((message) => (
                  <li key={message.id}>
                    <p>
                      {message.source.author.type === "user"
                        ? "You: "
                        : "Admin: "}
                      {message.source.body}
                    </p>
                    <small>
                      {new Date(message.created_at * 1000).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
