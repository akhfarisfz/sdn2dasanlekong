
const { LibHTTPRouter } = require("../../libs/https");
const {
  FileMateriControllerList,
  FileMateriControllerCreate,
  FileMateriControllerDetail,
  FileMateriControllerUpdate,
  FileMateriControllerDelete
} = require("./controllers");
const {
  FileMateriMiddlewareCreate,
  FileMateriMiddlewareUpdate,
  FileMateriMiddlewareList,
  FileMateriMiddlewareDetail,
  FileMateriMiddlewareDelete
} = require("./middlewares");

const FileMateriRouter = LibHTTPRouter();

FileMateriRouter.get("", FileMateriMiddlewareList, FileMateriControllerList);
FileMateriRouter.post("", FileMateriMiddlewareCreate, FileMateriControllerCreate);
FileMateriRouter.get("/:id", FileMateriMiddlewareDetail, FileMateriControllerDetail);
FileMateriRouter.put("/:id", FileMateriMiddlewareUpdate, FileMateriControllerUpdate);
FileMateriRouter.delete("/:id", FileMateriMiddlewareDelete, FileMateriControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { FileMateriRouter } = require("./modules/FileMateri/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "FileMateri", FileMateriRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  FileMateriRouter,
};  
