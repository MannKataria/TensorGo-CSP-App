import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Messages.module.css";

const Messages = ({ userId }) => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");

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
    const fetchMessages = async (conversationId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/conversations/${conversationId}`
        );
        const tmp = response.data;
        setMessages((prevMessages) => [...prevMessages, ...tmp]);
      } catch (err) {
        setError("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    if (conversations.length !== 0) {
      conversations.map((conversation) => fetchMessages(conversation));
    }
  }, [conversations]);

  useEffect(() => {
    console.log(messages, messages.length);
    setFilteredMessages(messages);
  }, [messages]);

  const updateCategory = () => {
    if (category === "all") {
      setFilteredMessages(messages);
      return;
    }
    const tmp = messages.filter(
      (message) => message.custom_attributes.category === category
    );
    setFilteredMessages(tmp);
  };
  useEffect(() => {
    updateCategory();
  }, [category]);

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
            <div className={styles.category}>
              <label>Category:</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className={styles.select_input}
              >
                <option value="all">All</option>
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
            {filteredMessages.length === 0 ? (
              <p>No messages found.</p>
            ) : (
              <ul>
                {filteredMessages.map((message) => (
                  <li key={message.id}>
                    <p>
                      <strong>
                        {message.source.author.type === "user"
                          ? "You"
                          : "Admin"}
                        :
                      </strong>{" "}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: message.source.body,
                        }}
                      />
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
