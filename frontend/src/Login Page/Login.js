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

  const [user, setUser] = useState({ email: "", password: "" });
  const userChangeListener = useChangeListener();
  const userValidator = useValidator({ email: [], password: [] });

  const onSignIn = () => {
    userValidator.reset();
    http.publicHTTP
      .post(`${BASE_URL}/users/signin/`, user)
      .then((response) => {
        jwt.set(response.data.token);
        application.setIsAuthenticated(true);
      })
      .catch((error) => {
        userValidator.except(error);
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-64 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            name="email"
            value={user.email}
            onChange={(e) => userChangeListener.onChangeText(e, user, setUser)}
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <ComponentMessageValidation messages={userValidator.get("email")} />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            name="password"
            value={user.password}
            onChange={(e) => userChangeListener.onChangeText(e, user, setUser)}
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <ComponentMessageValidation messages={userValidator.get("password")} />
        </div>
        <button onClick={onSignIn} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Sign In</button>
      </div>
    </div>
  );
};

export default Login;
