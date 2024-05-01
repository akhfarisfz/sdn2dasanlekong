import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/Login Page/Login.js";
import Home from "./Home Page/Home.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
