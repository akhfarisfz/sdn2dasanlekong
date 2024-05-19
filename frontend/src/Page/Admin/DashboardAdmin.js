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

  // Sidebar
  const navigation = [
    {
      href: "javascript:void(0)",
      name: "Overview",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      ),
    },
    {
      href: "javascript:void(0)",
      name: "Integration",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
          />
        </svg>
      ),
    },
    {
      href: "javascript:void(0)",
      name: "Plans",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
    },
    {
      href: "javascript:void(0)",
      name: "Transactions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
    },
  ];

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
      {/* Sidebar */}

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
