import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PriorityInbox.css";

function PriorityInbox() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const priority = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications?limit=50&page=1"
      );

      const sorted = res.data.notifications
        .sort((a, b) => priority[b.Type] - priority[a.Type])
        .slice(0, 10);

      setNotifications(sorted);
    } catch (err) {
      setError("Failed to load priority notifications. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getPriorityColor = (type) => {
    const colors = {
      Placement: "#e74c3c",
      Result: "#f39c12",
      Event: "#3498db",
    };
    return colors[type] || "#95a5a6";
  };

  return (
    <div className="priority-container">
      <div className="priority-header">
        <h1>Priority Inbox</h1>
        <Link to="/">
          <button className="back-btn">All Notifications</button>
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading priority notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="empty-state">
          <p>No priority notifications</p>
          <small>You're all caught up!</small>
        </div>
      ) : (
        <div className="priority-list">
          {notifications.map((item) => (
            <div
              key={item.ID}
              className="priority-card"
              style={{ borderLeftColor: getPriorityColor(item.Type) }}
            >
              <div className="priority-header-content">
                <span
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(item.Type) }}
                >
                </span>
                <span className="priority-type">{item.Type}</span>
                <span className="priority-time">
                  {formatDate(item.Timestamp)}
                </span>
              </div>
              <p className="priority-message">{item.Message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriorityInbox;