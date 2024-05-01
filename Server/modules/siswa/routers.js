
const { LibHTTPRouter } = require("../../libs/https");
const {
  SiswaControllerList,
  SiswaControllerCreate,
  SiswaControllerDetail,
  SiswaControllerUpdate,
  SiswaControllerDelete
} = require("./controllers");
const {
  SiswaMiddlewareCreate,
  SiswaMiddlewareUpdate,
  SiswaMiddlewareList,
  SiswaMiddlewareDetail,
  SiswaMiddlewareDelete
} = require("./middlewares");

const SiswaRouter = LibHTTPRouter();

SiswaRouter.get("", SiswaMiddlewareList, SiswaControllerList);
SiswaRouter.post("", SiswaMiddlewareCreate, SiswaControllerCreate);
SiswaRouter.get("/:id", SiswaMiddlewareDetail, SiswaControllerDetail);
SiswaRouter.put("/:id", SiswaMiddlewareUpdate, SiswaControllerUpdate);
SiswaRouter.delete("/:id", SiswaMiddlewareDelete, SiswaControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { SiswaRouter } = require("./modules/siswa/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "siswa", SiswaRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  SiswaRouter,
};  
