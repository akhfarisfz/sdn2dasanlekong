
const { LibHTTPRouter } = require("../../libs/https");
const {
  TugasControllerList,
  TugasControllerCreate,
  TugasControllerDetail,
  TugasControllerUpdate,
  TugasControllerDelete
} = require("./controllers");
const {
  TugasMiddlewareCreate,
  TugasMiddlewareUpdate,
  TugasMiddlewareList,
  TugasMiddlewareDetail,
  TugasMiddlewareDelete
} = require("./middlewares");

const TugasRouter = LibHTTPRouter();

TugasRouter.get("", TugasMiddlewareList, TugasControllerList);
TugasRouter.post("", TugasMiddlewareCreate, TugasControllerCreate);
TugasRouter.get("/:id", TugasMiddlewareDetail, TugasControllerDetail);
TugasRouter.put("/:id", TugasMiddlewareUpdate, TugasControllerUpdate);
TugasRouter.delete("/:id", TugasMiddlewareDelete, TugasControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { TugasRouter } = require("./modules/tugas/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "tugas", TugasRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  TugasRouter,
};  
