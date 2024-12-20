
function Mata_pelajaranFilter(req) {
  let qSearch = {};
  const { search, limit, page, ...filters } = req.query;

  if (search) {
    qSearch = {
      $or: [
        /**
         * You can change field1 and field2 according to your needs.
         **/

        { nama_mapel: { $regex: ".*" + search + ".*", $options: "i" } },
        { field2: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    };
  }

  return { ...filters, ...qSearch };
}

module.exports = {
  Mata_pelajaranFilter,
};
  