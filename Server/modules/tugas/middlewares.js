
const { LibAuthenticationMiddleware } = require("../../libs/authentications");
const {
  LibValidationExceptionMiddleware,
  LibValidationFields,
  LibValidationsMiddleware,
} = require("../../libs/validations");

/**
 * If you want to remove JWT authentication, 
 * you can remove 'LibAuthenticationMiddleware' from your middleware list.
 */

const TugasMiddlewareList = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const TugasMiddlewareDetail = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const TugasMiddlewareCreate = LibValidationsMiddleware(
  LibAuthenticationMiddleware,
  /** Your middleware here (validations, sanitizing, etc..) */

  /**
   * "LibValidationExceptionMiddleware" is suitable for validating data sent by the client in body. 
   * If you have your own handler, you can replace it.
   * 
   * For example:
   *  ...
   *  LibValidationFields.CharField({ field: "field1" }),
   *  LibValidationFields.CharField({ field: "field2" }),
   *  LibValidationFields.CharField({
   *    field: "field3",
   *    customs: [TugasValidatorField3Unique],
   *  }),
   *  LibValidationFields.CharField({
   *    field: "field4",
   *    sanitizers: [TugasSanitizerField4ToHash],
   *  }),
   *  ...
   */
  LibValidationFields.CharField({ field: "deskripsi" }),
  LibValidationFields.DateField({ field: "deadline" }),
  LibValidationFields.CharField({ field: "id_materi" }),
  LibValidationFields.CharField({ field: "id_guru_pembuat" }),
  LibValidationFields.ArrayField({ field: "pertanyaan" }),
  LibValidationFields.CharField({ field: "pertanyaan.teks_soal" }),
  LibValidationFields.ArrayField({ field: "pertanyaan.opsi_jawaban" }),
  LibValidationFields.CharField({ field: "pertanyaan.opsi_jawaban.pilihan_jawaban" }),
  LibValidationFields.NumberField({ field: "pertanyaan.kunci_jawaban" }), // Perbaiki tipe validasi
  LibValidationFields.NumberField({ field: "pertanyaan.skor" }), // Perbaiki tipe validasi
  LibValidationFields.ArrayField({ field: "jawaban_siswa" }),
  LibValidationFields.CharField({ field: "jawaban_siswa.id_tugas" }),
  LibValidationFields.CharField({ field: "jawaban_siswa.id_siswa" }),
  LibValidationFields.ArrayField({ field: "jawaban_siswa.jawaban" }),
  LibValidationFields.CharField({ field: "jawaban_siswa.jawaban.jawaban_siswa" }),
  LibValidationFields.DateField({ field: "jawaban_siswa.tanggal_pengumpulan" }),
  LibValidationFields.NumberField({ field: "jawaban_siswa.skor" }),
  // LibValidationFields.NumberField({ field: "total_skor" }), // Memperbaiki total_skor menjadi field langsung di schema tugas





  LibValidationExceptionMiddleware,
);

const TugasMiddlewareUpdate = LibValidationsMiddleware(
  LibAuthenticationMiddleware,
  /** Your middleware here (validations, sanitizing, etc..) */
  LibValidationExceptionMiddleware,
);

const TugasMiddlewareDelete = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

module.exports = {
  TugasMiddlewareCreate,
  TugasMiddlewareUpdate,
  TugasMiddlewareDetail,
  TugasMiddlewareList,
  TugasMiddlewareDelete,
};
