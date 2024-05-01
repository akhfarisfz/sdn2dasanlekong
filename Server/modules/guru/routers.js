
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

GuruRouter.get("", GuruMiddlewareList, GuruControllerList);
GuruRouter.post("", GuruMiddlewareCreate, GuruControllerCreate);
GuruRouter.get("/:id", GuruMiddlewareDetail, GuruControllerDetail);
GuruRouter.put("/:id", GuruMiddlewareUpdate, GuruControllerUpdate);
GuruRouter.delete("/:id", GuruMiddlewareDelete, GuruControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { GuruRouter } = require("./modules/guru/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "guru", GuruRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  GuruRouter,
};  
