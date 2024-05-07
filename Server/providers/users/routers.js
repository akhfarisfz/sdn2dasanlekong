const { LibHTTPRouter } = require("../../libs/https");
const { UserControllerSignUp, UserControllerSignIn, UserControllerList,UserControllerDetail,UserControllerUpdate,UserControllerDelete} = require("./controllers");
const { UserMiddlewareSignUp, UserMiddlewareSignIn, UserMiddlewareList,UserMiddlewareDetail,UserMiddlewareUpdate,UserMiddlewareDelete } = require("./middlewares");

const UserRouter = LibHTTPRouter();

UserRouter.get("", UserMiddlewareList, UserControllerList);
UserRouter.post("/signup", [UserMiddlewareSignUp], UserControllerSignUp);
UserRouter.post("/signin", [UserMiddlewareSignIn], UserControllerSignIn);
UserRouter.get("/:id", UserMiddlewareDetail, UserControllerDetail);
UserRouter.get("/:id", UserMiddlewareDetail, UserControllerDetail);
UserRouter.put("/:id", UserMiddlewareUpdate, UserControllerUpdate);
UserRouter.delete ("/:id", UserMiddlewareDelete, UserControllerDelete);

module.exports = {
  UserRouter,
};
