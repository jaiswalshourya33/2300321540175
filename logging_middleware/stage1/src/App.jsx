import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications"
      );

      setNotifications(response.data.notifications);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  const getPriority = (type) => {
    const priorities = {
      Placement: 3,
      Result: 2,
    };

    return priorities[type] || 1;
  };

  const getPriorityColor = (type) => {
    const colors = {
      Placement: "#ea1111",
      Result: "#2cea5f",
      Event: "#3498db",
    };

    return colors[type] || "#95a5a6";
  };

  const topNotifications = [...notifications]
    .sort((a, b) => getPriority(b.Type) - getPriority(a.Type))
    .slice(0, 10);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Priority Inbox</h1>
        <p>{topNotifications.length} Notifications</p>
      </header>

      <div className="notifications-grid">
        {topNotifications.map((item) => (
          <div key={item.ID} className="notification-card">
            <div className="notification-header">
              <span
                className="priority"
                style={{
                  backgroundColor: getPriorityColor(item.Type),
                }}
              >
                {item.Type}
              </span>
            </div>

            <h3>{item.Message}</h3>

            <div className="notification-footer">
              <span>{item.Timestamp}</span>
              <span>
                Priority: {getPriority(item.Type)}/3
              </span>
            </div>

            <button className="action-btn">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;