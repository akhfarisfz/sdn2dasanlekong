  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import Login from "../src/Page/Login.js";
  import Home from "../src/Page/Home Page/Home.js";
  import DashboardAdmin from "./Page/DashboardAdmin.js";
  import DashboardGuru from "./Page/Guru/DashboardGuru.js";
  import DashboardSiswa from "./Page/Siswa/DashboardSiswa.js";
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
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
            <Route path="/guru/dashboard" element={<DashboardGuru/>} />
            <Route path="/siswa/dashboard" element={<DashboardSiswa />} />

          </Routes>
        </BrowserRouter>
      </ContextApplication.Provider>
    );
  }

  export default App;
