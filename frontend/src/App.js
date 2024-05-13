import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/Page/Login.js";
import Home from "../src/Page/Home Page/Home.js";
import DashboardAdmin from "./Page/DashboardAdmin.js";
import DashboardGuru from "./Page/Guru/DashboardGuru.js";
import { ContextApplication } from "./libs/config/contexts.js";
import { useState } from "react";
import PageCommonOutlet from "./Page/commons/PageCommonOutlet.js";
import AdminDetail from "./Page/AdminDetail.js";
import E_learningSiswa from "./Page/Siswa/E-learningSiswa.js";
import Mapel from "./Page/Siswa/Mapel.js";

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
          <Route element={<PageCommonOutlet />}>
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
            <Route path={"detail/:id"} element={<AdminDetail />} />
          </Route>
          <Route path="/siswa/eLearning" element={<E_learningSiswa />} />
          <Route path="/siswa/eLearning/mapel/:id" element={<Mapel />}></Route>
          <Route element={<PageCommonOutlet />}>
            <Route path="/guru/dashboard" element={<DashboardGuru />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextApplication.Provider>
  );
}

export default App;
