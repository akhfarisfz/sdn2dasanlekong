import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/Login Page/Login.js";
import Home from "./Home Page/Home.js";
import { ContextApplication } from "./libs/config/contexts.js";
import { useState } from "react";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <ContextApplication.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ContextApplication.Provider>
  );
}

export default App;
