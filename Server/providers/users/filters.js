function UserFilter(req) {
  let qSearch = {};
  const { search, limit, page, ...filters } = req.query;

  if (search) {
    qSearch = {
      $or: [

        { nama_lengkap: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    };
  }

  return { ...filters, ...qSearch };
}

module.exports = {
  UserFilter,
};

