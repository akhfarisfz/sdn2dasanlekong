import { useLocation } from "react-router-dom";
import useHTTP from "../libs/hooks/useHTTP.js";
import useJWT from "../libs/hooks/useJWT.js";
import { useEffect, useRef, useState } from "react";
import useMessage from "../libs/hooks/useMessage.js";
import { BASE_URL } from "../libs/config/settings.js";
import { Link, useNavigate } from "react-router-dom";

function DashboardAdmin() {
  // Gunakan useLocation untuk mengakses location dan state
  const location = useLocation();
  const { state } = location;
  const role = state && state.role;

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarUser, setDaftarUser] = useState([]);
  const [daftarUserPagination, setDaftarUserPagination] = useState({})
  const userSearch = useRef({ value: "" })

  const onUserList = (params) => {
    const url = `${BASE_URL}/users/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params
    }
    http.privateHTTP.get(url, config).then((response) => {
      const { results, ...pagination } = response.data;
      setDaftarUserPagination(pagination);
      setDaftarUser(results)
    }).catch((error) => {
      message.error(error);
    })
  }

  const onUserSearch = (e) => {
    if (e.key == 'Enter') {
      onUserList({ search: userSearch.current.value })
    }
  }

  const onUserPagination = (page) => {
    onUserList({ search: userSearch.current.value, page })
  }

  useEffect(() => {
    onUserList();
  }, []);

  const filteredUsers = daftarUser.filter((user) => !user.roles.includes('Admin'))
    .sort((a, b) => {
      if (a.roles < b.roles) {
        return -1;
      }
      if (a.roles > b.roles) {
        return 1;
      }
      return 0;
    });

  return (
    <div>
      {role ? (
        <div>Ini adalah dashboard untuk role: {role}</div>
      ) : (
        <div>Anda tidak diizinkan</div>
      )}
      <div>
      <input
        ref={userSearch}
        onKeyDown={onUserSearch}
        placeholder="Search..."
        className="w-1/2 bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.profile.firstName}</td>
              <td>{user.profile.lastName}</td>
              <td>{user.roles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardAdmin;
