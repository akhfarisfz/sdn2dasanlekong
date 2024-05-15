require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { DatabaseMongoDBConnector } = require("./libs/databases");
const { LibModuleRegister } = require("./libs/modules");
const { UserRouter } = require("./providers/users/routers");
// const { GuruRouter } = require("./modules/guru/routers");
const { SiswaRouter } = require("./modules/siswa/routers");
const app = express();
// Mendefinisikan koneksi ke MongoDB dengan opsi tambahan
const connectToMongoDB = async () => {
  try {
    await DatabaseMongoDBConnector({ hideSuccessMessage: false });
    console.log("Terhubung ke MongoDB.");
  } catch (error) {
    console.error("Gagal terhubung ke MongoDB:", error);
    // Atau lakukan langkah lain yang sesuai dengan kebutuhan aplikasi Anda
  }
};

// Panggil fungsi untuk terhubung ke MongoDB
connectToMongoDB();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
DatabaseMongoDBConnector({ hideSuccessMessage: false });

app.use(express.json());

LibModuleRegister(app, "users", UserRouter);
LibModuleRegister(app, "siswa", SiswaRouter);
// LibModuleRegister(app, "guru", GuruRouter);

app.listen(process.env.APP_PORT, function () {
  console.log(`Server berjalan di port ${process.env.APP_PORT}.`);
});
