import React, { useState, useEffect } from "react";

const initialNotifications = [
  {
    id: 1,
    type: "placement",
    title: "Google Placement Drive",
    timestamp: "2026-06-08T10:00:00",
    unread: true,
  },
  {
    id: 2,
    type: "result",
    title: "Semester Result Published",
    timestamp: "2026-06-07T15:00:00",
    unread: true,
  },
  {
    id: 3,
    type: "event",
    title: "Coding Contest Tomorrow",
    timestamp: "2026-06-08T18:00:00",
    unread: true,
  },
  {
    id: 4,
    type: "placement",
    title: "Amazon Hiring Challenge",
    timestamp: "2026-06-09T09:00:00",
    unread: true,
  },
  {
    id: 5,
    type: "result",
    title: "Mid-Term Marks Uploaded",
    timestamp: "2026-06-06T11:00:00",
    unread: true,
  },
];

function App() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const weightMap = {
    placement: 3,
    result: 2,
    event: 1,
  };

  const calculatePriority = (notification) => {
    const ageInHours =
      (new Date() - new Date(notification.timestamp)) /
      (1000 * 60 * 60);

    const recencyScore = Math.max(0, 100 - ageInHours);

    return weightMap[notification.type] * 100 + recencyScore;
  };

  const topNotifications = notifications
    .filter((n) => n.unread)
    .sort((a, b) => calculatePriority(b) - calculatePriority(a))
    .slice(0, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: ["placement", "result", "event"][
          Math.floor(Math.random() * 3)
        ],
        title: `New Notification ${Date.now()}`,
        timestamp: new Date().toISOString(),
        unread: true,
      };

      setNotifications((prev) => [...prev, newNotification]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Priority Inbox</h1>
      <h3>Top 10 Unread Notifications</h3>

      {topNotifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h4>{notification.title}</h4>
          <p>Type: {notification.type}</p>
          <p>
            Priority Score: {calculatePriority(notification).toFixed(2)}
          </p>
          <p>{new Date(notification.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App;