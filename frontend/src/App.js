import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/Login Page/Login.js";
import Home from "./Home Page/Home.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
