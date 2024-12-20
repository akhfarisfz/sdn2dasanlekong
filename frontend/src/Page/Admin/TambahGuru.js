import { NavLink, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import useChangeListener from "../../libs/hooks/useChangeListener";
import { BASE_URL } from "../../libs/config/settings";
import useValidator from "../../libs/hooks/useValidator";

function TambahGuru() {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [guru, setGuru] = useState({
    nip: '',
    user: {
      username: '',
      email: '',
      password: '',
      roles: 'Guru'
    },
    kelas: [],
    nama_lengkap: '',
    tanggal_lahir: null,
    jenis_kelamin: '',
    alamat: ''
  });
  const kelasOptions = ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];
  const guruChangeListener = useChangeListener();
  const guruValidator = useValidator([])

  const onguruCreate = () => {
    guruValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(`${BASE_URL}/guru/`, guru, config).then((response) => {
      message.success(response);
      navigate("/admin/dashboard")
    }).catch((error) => {
      message.error(error)
      guruValidator.except(error)
    })
  }
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedKelas;
    if (checked) {
      // Tambahkan kelas yang dipilih
      updatedKelas = [...guru.kelas, value];
    } else {
      // Hapus kelas yang tidak dipilih
      updatedKelas = guru.kelas.filter((kelas) => kelas !== value);
    }

    const updatedGuru = { ...guru, kelas: updatedKelas };
    guruChangeListener.onChangeText({ target: { name: 'kelas', value: updatedKelas } }, updatedGuru, setGuru);
    setGuru(updatedGuru);
  };
  return (
    <>
      <div
        className="m-6 lg:m-12 p-6 lg:p-16 border border-solid border-zinc-800 shadow-xl lg:col-span-3 rounded-lg space-y-4"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="border-b-2 border-gray-400 font-bold text-xl text-base leading-7 text-gray-900 text-center">
              Isi data Guru yang ingin ditambahkan
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="nama_lengkap"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama Lengkap
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="nama_lengkap"
                      id="nama_lengkap"
                      value={guru.nama_lengkap}
                      onChange={(e) => guruChangeListener.onChangeText(e, guru, setGuru)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name={"user.email"}
                      id="email"
                      value={guru.email} // Arahkan ke guru.user.email
                      onChange={(e) => guruChangeListener.onChangeText(e, guru, setGuru)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Masukkan email"
                    />
                  </div>
                </div>

              </div>

              <div className="col-span-full">
                <label
                  htmlFor="password"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="password"
                      name={"user.password"}
                      id="password"
                      value={guru.password}
                      onChange={(e) => guruChangeListener.onChangeText(e, guru, setGuru)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Masukkan Password"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="username"
                      name={"user.username"}
                      id="username"
                      value={guru.username}
                      onChange={(e) => guruChangeListener.onChangeText(e, guru, setGuru)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="nip"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  NIP
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="nip"
                      id="nip"
                      autoComplete="nip"
                      value={guru.nip}
                      onChange={(e) => guruChangeListener.onChangeText(e, guru, setGuru)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Masukkan NIP"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="tanggal_lahir"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  Tanggal Lahir
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="date"
                      name="tanggal_lahir"
                      id="tanggal_lahir"
                      autoComplete="tanggal_lahir"
                      value={guru.tanggal_lahir}
                      onChange={(e) => guruChangeListener.onChangeText(e, guru, setGuru)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Masukkan tanggal lahir"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="alamat"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  Alamat
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="alamat"
                      id="alamat"
                      autoComplete="street-address"
                      value={guru.alamat}
                      onChange={(e) => guruChangeListener.onChangeText(e, guru, setGuru)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <label className="ml-4 block text-sm font-medium leading-6 text-gray-900">
                  Jenis Kelamin
                </label>
                <div className="flex items-center gap-x-3">
                  <input
                    id="pria"
                    name="jenis_kelamin"
                    type="radio"
                    value="Pria"
                    checked={guru.jenis_kelamin === "Pria"}
                    onChange={(e) => guruChangeListener.onChangeText(e, guru, setGuru)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="pria"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pria
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="wanita"
                    name="jenis_kelamin"
                    type="radio"
                    value="Wanita"
                    checked={guru.jenis_kelamin === "Wanita"}
                    onChange={(e) => guruChangeListener.onChangeText(e, guru, setGuru)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="wanita"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Wanita
                  </label>
                </div>
              </div>
              <div className="col-span-full mt-4">
                <label
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  Kelas
                </label>
                <div className="my-2">
                  {kelasOptions.map((kelas) => (
                    <div key={kelas} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={kelas}
                        value={kelas}
                        checked={guru.kelas.includes(kelas)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={kelas}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {kelas}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Photo */}
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    accept="guruimage/*"
                    onChange={(e) => guruChangeListener.onChangeText(e, guru, setGuru)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="photo"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                  >
                    Change
                  </label>
                </div>
                {/* {previewImage && (
                  <div className="mt-4">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-md"
                    />
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <NavLink
            className="text-sm font-semibold leading-6 text-gray-900"
            to="/admin/dashboard"
          >
            Cancel
          </NavLink>

          <button
            type="submit"
            onClick={onguruCreate}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default TambahGuru;
