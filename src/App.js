import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Registration from "./pages/auth/registration";
import Home from "./pages/home/Home";
import { AuthProvider } from "./pages/auth/authenticate";
import { RequireAuth } from "./pages/auth/requireauthenticate";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/regestration" element={<Registration />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
