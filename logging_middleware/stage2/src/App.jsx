import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllNotification from "./pages/AllNotification";
import priorityInbox from "./pages/priorityInbox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllNotification />} />
        <Route path="/priority" element={<priorityInbox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;