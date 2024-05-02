import { useContext } from "react";
import { ContextApplication } from "../config/contexts.js";
import useJWT from "../hooks/useJWT.js";
import { useNavigate } from "react-router-dom";

const LibComponentNavbar = () => {
  const jwt = useJWT();
  const application = useContext(ContextApplication);
  const navigate = useNavigate();

  const signOut = () => {
    jwt.signOut();
    navigate("/login");
    application.setIsAuthenticated(false);
  };

  // Mendapatkan role dari context
  const { role } = application;

  return (
    
    <nav className="bg-gray-800" data-bs-theme="dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <h1 className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Navbar Umum</h1>
                {role && ( // Menampilkan role jika tersedia
                  <h1 className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">{role}</h1>
                )}
              </div>
            </div>
          </div>
          {application.isAuthenticated && (
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button onClick={signOut} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Log Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LibComponentNavbar;
