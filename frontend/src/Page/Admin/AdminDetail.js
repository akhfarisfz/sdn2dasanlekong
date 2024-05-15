import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useMessage from "../../libs/hooks/useMessage.js";
import useJWT from "../../libs/hooks/useJWT.js";
import useHTTP from "../../libs/hooks/useHTTP.js";
import useValidator from "../../libs/hooks/useValidator.js";
import { BASE_URL } from "../../libs/config/settings.js";
import useChangeListener from "../../libs/hooks/useChangeListener.js";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.js";

function AdminDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const userChangeListener = useChangeListener();

  const [user, setUser] = useState({ nama: "" });
  const userValidator = useValidator({ nama: [] });

  const onUserUpdate = () => {
    userValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .put(`${BASE_URL}/user/${params.id}/`, user, config)
      .then((response) => {
        message.success(response);
        navigate("/");
      })
      .catch((error) => {
        message.error(error);
        userValidator.except(error);
      });
  };

  const onUserDelete = () => {
    message.confirmRemove(() => {
      const config = {
        headers: {
          Authorization: jwt.get(),
        },
      };

      http.privateHTTP
        .delete(`${BASE_URL}/user/${params.id}/`, config)
        .then((response) => {
          message.success(response);
          navigate("/");
        })
        .catch((error) => {
          message.error(error);
        });
    });
  };

  const onUserDetail = () => {
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .get(`${BASE_URL}/user/${params.id}/`, config)
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  useEffect(() => {
    // panggil fungsi detail user
    if (params.id) {
      onUserDetail();
    }
  }, [params.id]);

  return (
    <div>
      <div>Data User</div>
      <div>ID: {params.id}</div>
      {/* Tambahkan tombol back */}
      <Link
        to="/admin/dashboard"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Back to Admin Dashboard
      </Link>

      <>
        <div className="mt-4">
          <div className="flex justify-center mb-3">
            <div className="md:w-6/12">{/* <h4>{user.nama}</h4> */}</div>
          </div>
          <div className="flex justify-center mb-3">
            <div className="md:w-6/12">
              <div className="bg-white shadow-md rounded px-4 py-3">
                <div className="mb-3">Nama User</div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Nama jasa/user cucian"
                    className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={user.nama}
                    name="nama"
                    onChange={(e) =>
                      userChangeListener.onChangeText(e, user, setUser)
                    }
                  />
                  {/* Komponen untuk pesan validasi */}
                  <ComponentMessageValidation
                    messages={userValidator.get("nama")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="md:w-6/12 flex justify-end gap-2">
              <button className="border border-gray-300 px-4 py-2 text-gray-700 hover:text-gray-600 hover:border-gray-400 rounded">
                Batal
              </button>
              <button className="border border-gray-300 px-4 py-2 text-gray-700 hover:text-gray-600 hover:border-gray-400 rounded">
                Hapus
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={onUserUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default AdminDetail;
