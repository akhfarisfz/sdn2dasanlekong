import React, { useContext, useState } from "react";
import useChangeListener from "../libs/hooks/useChangeListener.js";
import useHTTP from "../libs/hooks/useHTTP.js";
import { BASE_URL } from "../libs/config/settings.js";
import useJWT from "../libs/hooks/useJWT.js";
import { ContextApplication } from "../libs/config/contexts.js";
import useValidator from "../libs/hooks/useValidator.js";
import ComponentMessageValidation from "../libs/components/ComponentMessageValidation.js";

const Login = () => {
  const application = useContext(ContextApplication);
  const http = useHTTP();
  const jwt = useJWT();

  const [user, setUser] = useState({ username: "", password: "" });
  const userChangeListener = useChangeListener();
  const userValidator = useValidator({ username: [], password: [] });

  const onSignIn = async () => {
    try {
      userValidator.reset();
      const response = await http.publicHTTP.post(
        `${BASE_URL}/users/signin/`,
        user
      );
      jwt.set(response.data.token);
      application.setIsAuthenticated(true);
    } catch (error) {
      if (error.response && error.response.data) {
        // Mendestruksi properti 'data' jika 'response' dan 'data' didefinisikan
        const { data } = error.response;
        console.log(data);
      } else {
        // Menangani kasus di mana 'response' atau 'data' tidak didefinisikan
        console.log("Error occurred:", error.message);
      }
      userValidator.except(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-64 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Masuk ke akun anda</h2>
        <div className="mb-4">
          <label className="block mb-2">Masukkan nama kalian!!</label>
          <input
            name="username"
            value={user.username}
            onChange={(e) => userChangeListener.onChangeText(e, user, setUser)}
            type="username"
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
            onChange={(e) => userChangeListener.onChangeText(e, user, setUser)}
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
