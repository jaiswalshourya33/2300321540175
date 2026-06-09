import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

 const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqYWlzd2Fsc2hvdXJ5YTM2MEBnbWFpbC5jb20iLCJleHAiOjE3ODA5OTY2OTksImlhdCI6MTc4MDk5NTc5OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQ1NjlhNTVlLWQxZmEtNGIxMC05NmRlLTE1YzhiZWMyZGY5NyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNob3VyeWEgamFpc3dhbCIsInN1YiI6IjE5Njc3MzBlLWU1MmYtNGEzYi1iZTUwLTI4MjgwMjM4ODcxYyJ9LCJlbWFpbCI6ImphaXN3YWxzaG91cnlhMzYwQGdtYWlsLmNvbSIsIm5hbWUiOiJzaG91cnlhIGphaXN3YWwiLCJyb2xsTm8iOiIyMzAwMzIxNTQwMTc1IiwiYWNjZXNzQ29kZSI6ImNYdXFodCIsImNsaWVudElEIjoiMTk2NzczMGUtZTUyZi00YTNiLWJlNTAtMjgyODAyMzg4NzFjIiwiY2xpZW50U2VjcmV0IjoicXlEd3hBRHl4Y1pUV2plRCJ9.r0CM50i-kvBEcZ8eNOyHQ-pd3_JLY_nHjQfz9rgstkg";

const fetchNotifications = async () => {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    console.log(response.data);

    setNotifications(response.data.notifications || []);
  } catch (error) {
    console.log(
      "Error:",
      error.response?.data || error.message
    );
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