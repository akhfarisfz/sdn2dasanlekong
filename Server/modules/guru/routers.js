const express = require("express");
const multer = require("multer");
const path = require("path");
const { LibHTTPRouter } = require("../../libs/https");
const {
  GuruControllerList,
  GuruControllerCreate,
  GuruControllerDetail,
  GuruControllerUpdate,
  GuruControllerDelete
} = require("./controllers");
const {
  GuruMiddlewareCreate,
  GuruMiddlewareUpdate,
  GuruMiddlewareList,
  GuruMiddlewareDetail,
  GuruMiddlewareDelete
} = require("./middlewares");

const GuruRouter = LibHTTPRouter();

// Konfigurasi multer untuk menyimpan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Tentukan folder tujuan penyimpanan gambar
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Middleware yang ada di GuruMiddlewareCreate tetap dipanggil setelah upload middleware
GuruRouter.get("", GuruMiddlewareList, GuruControllerList);
GuruRouter.post("", upload.single('gambar'), GuruMiddlewareCreate, GuruControllerCreate);
GuruRouter.get("/:id", GuruMiddlewareDetail, GuruControllerDetail);
GuruRouter.put("/:id", GuruMiddlewareUpdate, GuruControllerUpdate);
GuruRouter.delete("/:id", GuruMiddlewareDelete, GuruControllerDelete);

module.exports = {
  GuruRouter,
};
  