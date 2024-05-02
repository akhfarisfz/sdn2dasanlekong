import React, { useContext, useState } from "react";
import useHTTP from "../libs/hooks/useHTTP.js";
import { BASE_URL } from "../libs/config/settings.js";
import useJWT from "../libs/hooks/useJWT.js";
import { ContextApplication } from "../libs/config/contexts.js";
import useValidator from "../libs/hooks/useValidator.js";
import ComponentMessageValidation from "../libs/components/ComponentMessageValidation.js";
import { Navigate } from "react-router-dom";

const Login = () => {
  const application = useContext(ContextApplication);
  const http = useHTTP();
  const jwt = useJWT();

  const [user, setUser] = useState({ email: "", password: "" });
  const userValidator = useValidator({ email: [], password: [] });
  const [IsLogin, setIsLogin] = useState(false);
  const [Role, setRole] = useState(null);

  
  const onSignIn = () => {
    userValidator.reset();
    http.publicHTTP
      .post(`${BASE_URL}/users/signin/`, user)
      .then((response) => {
        jwt.set(response.data.token);
        application.setIsAuthenticated(true);
        setRole(response.data.roles);
        setIsLogin(true);
      })
      .catch((error) => {
        userValidator.except(error);
        console.log(error);
      });
  };
  
  switch (Role[0]) {
    case 'Admin':
      return <Navigate to="/admin/dashboard" replace />; 
    case 'Guru':
      return <Navigate to="/guru/dashboard" replace />; 
    case 'Siswa':
      return <Navigate to="/siswa/dashboard" replace />; 
    default:break;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-64 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Masuk ke akun anda</h2>
        <div className="mb-4">
          <label className="block mb-2">Masukkan nama kalian!!</label>
          <input
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <ComponentMessageValidation
            messages={userValidator.get("username")}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Masukkan Password</label>
          <input
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <ComponentMessageValidation
            messages={userValidator.get("password")}
          />
        </div>
        <button
          onClick={onSignIn}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
