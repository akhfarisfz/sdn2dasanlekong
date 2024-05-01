require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { DatabaseMongoDBConnector } = require("./libs/databases");
const { LibModuleRegister } = require("./libs/modules");
const { UserRouter } = require("./providers/users/routers");
const { GuruRouter } = require("./modules/guru/routers");
const { SiswaRouter } = require("./modules/siswa/routers");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

DatabaseMongoDBConnector({ hideSuccessMessage: false });

app.use(express.json());

LibModuleRegister(app, "users", UserRouter);
LibModuleRegister(app, "siswa", SiswaRouter);
LibModuleRegister(app, "barang", GuruRouter);

app.listen(process.env.APP_PORT, function () {
  console.log(`Server berjalan di port ${process.env.APP_PORT}.`);
});
