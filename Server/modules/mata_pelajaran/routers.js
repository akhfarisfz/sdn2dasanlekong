
const { LibHTTPRouter } = require("../../libs/https");
const {
  Mata_pelajaranControllerList,
  Mata_pelajaranControllerCreate,
  Mata_pelajaranControllerDetail,
  Mata_pelajaranControllerUpdate,
  Mata_pelajaranControllerDelete
} = require("./controllers");
const {
  Mata_pelajaranMiddlewareCreate,
  Mata_pelajaranMiddlewareUpdate,
  Mata_pelajaranMiddlewareList,
  Mata_pelajaranMiddlewareDetail,
  Mata_pelajaranMiddlewareDelete
} = require("./middlewares");

const Mata_pelajaranRouter = LibHTTPRouter();

Mata_pelajaranRouter.get("", Mata_pelajaranMiddlewareList, Mata_pelajaranControllerList);
Mata_pelajaranRouter.post("", Mata_pelajaranMiddlewareCreate, Mata_pelajaranControllerCreate);
Mata_pelajaranRouter.get("/:id", Mata_pelajaranMiddlewareDetail, Mata_pelajaranControllerDetail);
Mata_pelajaranRouter.put("/:id", Mata_pelajaranMiddlewareUpdate, Mata_pelajaranControllerUpdate);
Mata_pelajaranRouter.delete("/:id", Mata_pelajaranMiddlewareDelete, Mata_pelajaranControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { Mata_pelajaranRouter } = require("./modules/mata_pelajaran/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "mata_pelajaran", Mata_pelajaranRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  Mata_pelajaranRouter,
};  
