import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/Page/Login.js";
import Home from "../src/Page/Home Page/Home.js";
import DashboardAdmin from "./Page/Admin/DashboardAdmin.js";
import DashboardGuru from "./Page/Guru/DashboardGuru.js";
import { ContextApplication } from "./libs/config/contexts.js";
import { useState } from "react";
import PageCommonOutlet from "./Page/commons/PageCommonOutlet.js";
import AdminDetail from "./Page/Admin/AdminDetail.js";
import E_learningSiswa from "./Page/Siswa/E-learningSiswa.js";
import Mapel from "./Page/Siswa/Mapel.js";
import TambahGuru from "./Page/Admin/TambahGuru.js";
import TambahSiswa from "./Page/Admin/TambahSiswa.js";

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
          {/* Admin */}
          <Route element={<PageCommonOutlet />}>
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
            <Route path={"detail/:id"} element={<AdminDetail />} />
            <Route
              path="/admin/dashboard/tambahGuru"
              element={<TambahGuru />}
            />
            <Route
              path="/admin/dashboard/TambahSiswa"
              element={<TambahSiswa />}
            />
          </Route>
          {/* Siswa */}
          <Route path="/siswa/eLearning" element={<E_learningSiswa />} />
          <Route path="/siswa/eLearning/mapel/:id" element={<Mapel />}></Route>
          {/* Guru */}
          <Route element={<PageCommonOutlet />}>
            <Route path="/guru/dashboard" element={<DashboardGuru />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextApplication.Provider>
  );
}

export default App;
