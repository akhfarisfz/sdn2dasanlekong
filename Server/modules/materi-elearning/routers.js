
const { LibHTTPRouter } = require("../../libs/https");
const {
  MateriElearningControllerList,
  MateriElearningControllerCreate,
  MateriElearningControllerDetail,
  MateriElearningControllerUpdate,
  MateriElearningControllerDelete
} = require("./controllers");
const {
  MateriElearningMiddlewareCreate,
  MateriElearningMiddlewareUpdate,
  MateriElearningMiddlewareList,
  MateriElearningMiddlewareDetail,
  MateriElearningMiddlewareDelete
} = require("./middlewares");

const MateriElearningRouter = LibHTTPRouter();

MateriElearningRouter.get("", MateriElearningMiddlewareList, MateriElearningControllerList);
MateriElearningRouter.post("", MateriElearningMiddlewareCreate, MateriElearningControllerCreate);
MateriElearningRouter.get("/:id", MateriElearningMiddlewareDetail, MateriElearningControllerDetail);
MateriElearningRouter.put("/:id", MateriElearningMiddlewareUpdate, MateriElearningControllerUpdate);
MateriElearningRouter.delete("/:id", MateriElearningMiddlewareDelete, MateriElearningControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { MateriElearningRouter } = require("./modules/materi-elearning/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "materi-elearning", MateriElearningRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  MateriElearningRouter,
};  
