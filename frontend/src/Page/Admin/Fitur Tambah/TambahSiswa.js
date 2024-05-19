import { Link, NavLink } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

function TambahSiswa() {
  const [formData, setFormData] = useState({
    nama: "",
    NIK: "",
    email: "",
    password: "",
    tanggal_lahir: "",
    alamat: "",
    kota: "",
    provinsi: "",
    kode_pos: "",
    jenis_kelamin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mengambil nilai tanggal lahir dari formData
      const { tanggal_lahir, ...restData } = formData;

      // Memisahkan tanggal, bulan, dan tahun
      const [tahun, bulan, tanggal] = tanggal_lahir.split("-");

      // Mengubah format tanggal lahir menjadi "tahun/bulan/tanggal" (YYYY/MM/DD)
      const formattedTanggalLahir = `${tahun}/${bulan}/${tanggal}`;

      // Menggabungkan kembali data dengan format tanggal lahir yang diubah
      const updatedFormData = {
        ...restData,
        tanggal_lahir: formattedTanggalLahir,
      };

      const response = await fetch(
        "http://localhost:4000/api/v1/users/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );
      if (response.ok) {
        // handle success
        console.log("Data berhasil disimpan ke database!");
      } else {
        // handle error
        console.error("Gagal menyimpan data ke database.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Link
        to="/admin/dashboard"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Back to Admin Dashboard
      </Link>

      <form
        className="m-6 lg:m-12 p-6 lg:p-16 border-2 border-solid border-zinc-800 shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="border-b-2 border-gray-400 font-bold text-xl text-base leading-7 text-gray-900 text-center">
              Isi data Siswa yang ingin ditambahkan
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="nama"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama Lengkap
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="nama"
                      id="nama"
                      autoComplete="nama"
                      value={formData.username}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="NIP"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  NIP
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      name="NIP"
                      id="NIP"
                      autoComplete="NIP"
                      value={formData.username}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Masukkan NIP"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="NISN"
                  className="ml-4 block text-sm font-medium leading-6 text-gray-900"
                >
                  NISN
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      name="NISN"
                      id="NISN"
                      autoComplete="NISN"
                      value={formData.username}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Masukkan NISN"
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
                      value={formData.username}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Masukkan tanggal lahir"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="Alamat"
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
                      value={formData.username}
                      onChange={handleChange}
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
                    checked={formData.jenis_kelamin === "Pria"}
                    onChange={handleChange}
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
                    value="wanita"
                    checked={formData.jenis_kelamin === "Wanita"}
                    onChange={handleChange}
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
                    accept="image/*"
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="photo"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                  >
                    Change
                  </label>
                </div>
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
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default TambahSiswa;
