import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllNotification.css";

function AllNotification() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [type]);

  const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqYWlzd2Fsc2hvdXJ5YTM2MEBnbWFpbC5jb20iLCJleHAiOjE3ODA5OTY2OTksImlhdCI6MTc4MDk5NTc5OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQ1NjlhNTVlLWQxZmEtNGIxMC05NmRlLTE1YzhiZWMyZGY5NyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNob3VyeWEgamFpc3dhbCIsInN1YiI6IjE5Njc3MzBlLWU1MmYtNGEzYi1iZTUwLTI4MjgwMjM4ODcxYyJ9LCJlbWFpbCI6ImphaXN3YWxzaG91cnlhMzYwQGdtYWlsLmNvbSIsIm5hbWUiOiJzaG91cnlhIGphaXN3YWwiLCJyb2xsTm8iOiIyMzAwMzIxNTQwMTc1IiwiYWNjZXNzQ29kZSI6ImNYdXFodCIsImNsaWVudElEIjoiMTk2NzczMGUtZTUyZi00YTNiLWJlNTAtMjgyODAyMzg4NzFjIiwiY2xpZW50U2VjcmV0IjoicXlEd3hBRHl4Y1pUV2plRCJ9.r0CM50i-kvBEcZ8eNOyHQ-pd3_JLY_nHjQfz9rgstkg";

const fetchData = async () => {
  setLoading(true);
  setError("");

  try {
    const res = await axios.get(
      `http://4.224.186.213/evaluation-service/notifications?limit=20&page=1&notification_type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    console.log(res.data);
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
          <p>No notifications yet</p>
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