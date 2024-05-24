
const { LibHTTPRouter } = require("../../libs/https");
const {
  Pilihan_gandaControllerList,
  Pilihan_gandaControllerCreate,
  Pilihan_gandaControllerDetail,
  Pilihan_gandaControllerUpdate,
  Pilihan_gandaControllerDelete
} = require("./controllers");
const {
  Pilihan_gandaMiddlewareCreate,
  Pilihan_gandaMiddlewareUpdate,
  Pilihan_gandaMiddlewareList,
  Pilihan_gandaMiddlewareDetail,
  Pilihan_gandaMiddlewareDelete
} = require("./middlewares");

const Pilihan_gandaRouter = LibHTTPRouter();

Pilihan_gandaRouter.get("", Pilihan_gandaMiddlewareList, Pilihan_gandaControllerList);
Pilihan_gandaRouter.post("", Pilihan_gandaMiddlewareCreate, Pilihan_gandaControllerCreate);
Pilihan_gandaRouter.get("/:id", Pilihan_gandaMiddlewareDetail, Pilihan_gandaControllerDetail);
Pilihan_gandaRouter.put("/:id", Pilihan_gandaMiddlewareUpdate, Pilihan_gandaControllerUpdate);
Pilihan_gandaRouter.delete("/:id", Pilihan_gandaMiddlewareDelete, Pilihan_gandaControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { Pilihan_gandaRouter } = require("./modules/pilihan_ganda/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "pilihan_ganda", Pilihan_gandaRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  Pilihan_gandaRouter,
};  
