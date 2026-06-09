import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllNotification.css"; // Import styles

function AllNotification() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://4.224.186.213/evaluation-service/notifications?limit=20&page=1&notification_type=${type}`
      );
      setNotifications(res.data.notifications || []);
    } catch (err) {
      setError("Failed to load notifications. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (notificationType) => {
    const colors = {
      Event: "#3498db",
      Result: "#27ae60",
      Placement: "#e74c3c",
    };
    return colors[notificationType] || "#95a5a6";
  };
  return (
    <div className="notification-container">
      <header className="notification-header">
        <h1>All Notifications</h1>
        <Link to="/priority">
          <button className="priority-btn">Priority Inbox</button>
        </Link>
      </header>

      <div className="filter-section">
        <label htmlFor="type-filter">Filter by Type:</label>
        <select
          id="type-filter"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="filter-select"
        >
          <option value="">All Notifications</option>
          <option value="Event">Event</option>
          <option value="Result">Result</option>
          <option value="Placement">Placement</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="empty-state">
          <p>📭 No notifications yet</p>
          <small>Check back later for updates</small>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((item) => (
            <div
              key={item.ID}
              className="notification-card"
              style={{
                borderLeftColor: getTypeColor(item.Type),
              }}
            >
              <div className="notification-header-content">
                <span
                  className="notification-badge"
                  style={{ backgroundColor: getTypeColor(item.Type) }}
                >
                  {item.Type}
                </span>
                <span className="notification-time">
                  {formatDate(item.Timestamp)}
                </span>
              </div>
              <p className="notification-message">{item.Message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllNotification;