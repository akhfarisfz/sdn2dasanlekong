
const { LibHTTPRouter } = require("../../libs/https");
const {
  JawabansiswaControllerList,
  JawabansiswaControllerCreate,
  JawabansiswaControllerDetail,
  JawabansiswaControllerUpdate,
  JawabansiswaControllerDelete
} = require("./controllers");
const {
  JawabansiswaMiddlewareCreate,
  JawabansiswaMiddlewareUpdate,
  JawabansiswaMiddlewareList,
  JawabansiswaMiddlewareDetail,
  JawabansiswaMiddlewareDelete
} = require("./middlewares");

const JawabansiswaRouter = LibHTTPRouter();

JawabansiswaRouter.get("", JawabansiswaMiddlewareList, JawabansiswaControllerList);
JawabansiswaRouter.post("", JawabansiswaMiddlewareCreate, JawabansiswaControllerCreate);
JawabansiswaRouter.get("/:id", JawabansiswaMiddlewareDetail, JawabansiswaControllerDetail);
JawabansiswaRouter.put("/:id", JawabansiswaMiddlewareUpdate, JawabansiswaControllerUpdate);
JawabansiswaRouter.delete("/:id", JawabansiswaMiddlewareDelete, JawabansiswaControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { JawabansiswaRouter } = require("./modules/jawabansiswa/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "jawabansiswa", JawabansiswaRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  JawabansiswaRouter,
};  
