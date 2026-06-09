import React, { useState } from "react";
import "./App.css";

function App() {
  const [notifications] = useState([
    {
      id: 1,
      title: "AffordMed Drive",
      type: "placement",
      timestamp: "1 hours ago",
    },
    {
      id: 2,
      title: "Semester Result Published",
      type: "result",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "Veersa Hiring Challenge",
      type: "placement",
      timestamp: "1 day ago",
    },
    {
      id: 4,
      title: "ST Results Released",
      type: "result",
      timestamp: "2 days ago",
    },
     {
      id: 5,
      title: "Admission Open",
      type: "admission",
      timestamp: "2 days ago",
    },
     {
      id: 6,
      title: "Admission closed",
      type: "admission",
      timestamp: "5 days ago",
    },

     {
      id: 7,
      title: "Genero Event ",
      type: "event",
      timestamp: "2 days ago",
    },

     {
      id: 8,
      title: "TED Talks",
      type: "event",
      timestamp: "5 days ago",
    },
     {
      id: 9,
      title: "DSA Training",
      type: "education",
      timestamp: "5 days ago",
    },
     {
      id: 10,
      title: "AWS Training",
      type: "education",
      timestamp: "5 days ago",
    },
  ]);

  const getPriority = (type) => {
    const priorities = {
      placement: 5,
      result: 4,
      admission: 3,
      event: 1,
      education: 2,
    };
    return priorities[type] || 1;
  };

  const getPriorityColor = (type) => {
    const colors = {
      placement: "#ea1111",
      result: "#2cea5f",
      admission: "#f39c12",
      event: "#3498db",
      education: "#9b59b6",
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
                Priority: {getPriority(item.type)}/5
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