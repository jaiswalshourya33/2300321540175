import React, { useState } from "react";
import "./App.css";

function App() {
  const [notifications] = useState([
    {
      id: 1,
      title: "Mid-Sem",
      type: "result",
      timestamp: "2026-04-22 17:51:30",
    },
    {
      id: 2,
      title: "CSX Corporation Hiring",
      type: "placement",
      timestamp: "2026-04-22 17:51:18",
    },
    {
      id: 3,
      title: "farewell",
      type: "event",
      timestamp: "2026-04-22 17:51:06",
    },
    {
      id: 4,
      title: "mid-sem",
      type: "result",
      timestamp: "2026-04-22 17:50:54",
    },
     {
      id: 5,
      title: "project-overview",
      type: "result",
      timestamp: "2026-04-22 17:50:42",
    },
     {
      id: 6,
      title: "external",
      type: "result",
      timestamp: "2026-04-22 17:50:30",
    },

     {
      id: 7,
      title: "project-overview",
      type: "result",
      timestamp: "2026-04-22 17:50:18",
    },

     {
      id: 8,
      title: "tech-fest",
      type: "event",
      timestamp: "2026-04-22 17:50:06",
    },
     {
      id: 9,
      title: "project-overview",
      type: "result",
      timestamp: "2026-04-22 17:49:54",
    },
     {
      id: 10,
      title: "Advanced Micro Devices Inc.hiring",
      type: "placement",
      timestamp: "2026-04-22 17:49:42",
    },
  ]);

  const getPriority = (type) => {
    const priorities = {
      placement: 3,
      result: 2,
    };
    return priorities[type] || 1;
  };

  const getPriorityColor = (type) => {
    const colors = {
      placement: "#ea1111",
      result: "#2cea5f",
      event: "#3498db",
    };
    return colors[type] || "#95a5a6";
  };

  const getPriorityLabel = (type) => {
    const labels = {
      placement: "Placement",
      result: "Result",
      admission: "Admission",
      event: "Event",
      education: "Education",
    };
    return labels[type] || "Other";
  };

  const topNotifications = [...notifications].sort(
    (a, b) => getPriority(b.type) - getPriority(a.type)
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1> Priority Inbox</h1>
        <p className="subtitle">
          {notifications.length} notifications
        </p>
      </header>

      <div className="notifications-grid">
        {topNotifications.map((item) => (
          <div
            key={item.id}
            className={`notification-card notification-${item.type}`}
          >
            <div className="notification-header">
              <span className="notification-icon">{item.icon}</span>
              <span
                className="priority"
                style={{
                  backgroundColor: getPriorityColor(item.type),
                }}
              >
                {getPriorityLabel(item.type)}
              </span>
            </div>

            <h3 className="notification-title">{item.title}</h3>

            <div className="notification-footer">
              <span className="timestamp">{item.timestamp}</span>
              <span className="priority-level">
                Priority: {getPriority(item.type)}/3
              </span>
            </div>

            <button className="action-btn">View Details →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;