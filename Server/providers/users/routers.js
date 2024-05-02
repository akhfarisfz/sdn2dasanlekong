const { LibHTTPRouter } = require("../../libs/https");
const { UserControllerSignUp, UserControllerSignIn, UserControllerList } = require("./controllers");
const { UserMiddlewareSignUp, UserMiddlewareSignIn, UserMiddlewareList } = require("./middlewares");

const UserRouter = LibHTTPRouter();

UserRouter.get("", UserMiddlewareList, UserControllerList);
UserRouter.post("/signup", [UserMiddlewareSignUp], UserControllerSignUp);
UserRouter.post("/signin", [UserMiddlewareSignIn], UserControllerSignIn);

module.exports = {
  UserRouter,
};
