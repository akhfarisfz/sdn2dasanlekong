
const { LibHTTPRouter } = require("../../libs/https");
const {
  BukuControllerList,
  BukuControllerCreate,
  BukuControllerDetail,
  BukuControllerUpdate,
  BukuControllerDelete
} = require("./controllers");
const {
  BukuMiddlewareCreate,
  BukuMiddlewareUpdate,
  BukuMiddlewareList,
  BukuMiddlewareDetail,
  BukuMiddlewareDelete
} = require("./middlewares");

const BukuRouter = LibHTTPRouter();

BukuRouter.get("", BukuMiddlewareList, BukuControllerList);
BukuRouter.post("", BukuMiddlewareCreate, BukuControllerCreate);
BukuRouter.get("/:id", BukuMiddlewareDetail, BukuControllerDetail);
BukuRouter.put("/:id", BukuMiddlewareUpdate, BukuControllerUpdate);
BukuRouter.delete("/:id", BukuMiddlewareDelete, BukuControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { BukuRouter } = require("./modules/buku/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "buku", BukuRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  BukuRouter,
};  
