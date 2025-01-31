import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContent";
import Login from "./pages/Login";
import Students from "./pages/Students";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
