import { useLocation } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.js";
import useJWT from "../../libs/hooks/useJWT.js";
import { useEffect, useRef, useState } from "react";
import useMessage from "../../libs/hooks/useMessage.js";
import { BASE_URL } from "../../libs/config/settings.js";

function DashboardAdmin() {
  // Gunakan useLocation untuk mengakses location dan state
  const location = useLocation();
  const { state } = location;
  const role = state && state.role;

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarUser, setDaftarUser] = useState([]);
  const [daftarUserPagination, setDaftarUserPagination] = useState({});
  const userSearch = useRef({ value: "" });

  const onUserList = (params) => {
    const url = `${BASE_URL}/users/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params,
    };
    http.privateHTTP
      .get(url, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        setDaftarUserPagination(pagination);
        setDaftarUser(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onUserSearch = (e) => {
    if (e.key === "Enter") {
      onUserList({ search: userSearch.current.value });
    }
  };

  useEffect(() => {
    onUserList();
  }, []);
  const filterguru = daftarUser
    .filter(
      (user) => !user.roles.includes("Siswa") && !user.roles.includes("Admin")
    )
    .sort((a, b) => {
      const roleA = typeof a.roles === "string" ? a.roles : "";
      const roleB = typeof b.roles === "string" ? b.roles : "";
      return roleA.localeCompare(roleB);
    });

  const filtersiswa = daftarUser
    .filter(
      (user) => !user.roles.includes("Guru") && !user.roles.includes("Admin")
    )
    .sort((a, b) => {
      const roleA = typeof a.roles === "string" ? a.roles : "";
      const roleB = typeof b.roles === "string" ? b.roles : "";
      return roleA.localeCompare(roleB);
    });

  function addGuruButton() {
    window.location.href = `/admin/dashboard/tambahGuru`;
  }
  function addSiswaButton() {
    window.location.href = `/admin/dashboard/tambahSiswa`;
  }
  function handleRowClick(user) {
    // Lakukan tindakan yang sesuai saat baris diklik
    // Misalnya, tampilkan informasi detail pengguna, dll.
    // alert(`Roles of ${user.username}: ${user.roles}`);
    window.location.href = `/detail/${user._id}`;
  }
  function handleEditButtonClick(event, user) {
    // Lakukan tindakan yang sesuai saat tombol "Edit" diklik
    event.stopPropagation();
    alert(`Edit for ${user.username}: ${user.roles}`);
    // Misalnya, tampilkan formulir untuk mengedit data pengguna ini
  }

  function handleDeleteButtonClick(event, user) {
    // Lakukan tindakan yang sesuai saat tombol "Delete" diklik
    event.stopPropagation();
    alert(`Delete for ${user.username}: ${user.roles}`);

    // Misalnya, tampilkan konfirmasi dialog untuk menghapus data pengguna ini
  }

  return (
    <div className="m-8">
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
          className="w-1/2 bg-gray-100 my-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <table class="min-w-full divide-y divide-gray-200 ">
        <thead>
          <tr>
            <th colspan="6" class="bg-gray-100 py-2">
              Data Guru
            </th>
          </tr>
          <tr>
            <th class="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th class="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Lengkap
            </th>
            <th class="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal Lahir
            </th>
            <th class="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th class="px-6 py-3 bg-gray-100">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(event) => addGuruButton(event)}
              >
                Add Guru
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filterguru.map((user) => (
            <tr
              key={user._id}
              class="bg-white divide-y divide-gray-200 cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(user)}
            >
              <td class="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td class="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td class="px-6 py-4 whitespace-nowrap">{user.nama_lengkap}</td>
              <td class="px-6 py-4 whitespace-nowrap">{user.tanggal_lahir}</td>
              <td class="px-6 py-4 whitespace-nowrap">{user.roles}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={(event) => handleEditButtonClick(event, user)}
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={(event) => handleDeleteButtonClick(event, user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th colspan="6" class="bg-gray-100 py-2">
              Data Siswa
            </th>
          </tr>
          <tr>
            <th class="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th class="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Lengkap
            </th>
            <th class="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal Lahir
            </th>
            <th class="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th class="px-6 py-3 bg-gray-100">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(event) => addSiswaButton(event)}
              >
                Add Siswa
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filtersiswa.map((user) => (
            <tr
              key={user._id}
              class="bg-white divide-y divide-gray-200 cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(user)}
            >
              <td class="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td class="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td class="px-6 py-4 whitespace-nowrap">{user.nama_lengkap}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {new Date(filtersiswa.tanggal_lahir).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "2-digit", day: "2-digit" }
                )}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{user.roles}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={(event) => handleEditButtonClick(event, user)}
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={(event) => handleDeleteButtonClick(event, user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardAdmin;
