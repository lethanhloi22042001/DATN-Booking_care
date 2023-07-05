import express from "express";
import homeController from "../controllers/homeController";
import userService from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/index", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);

  router.post("/api/login", userService.handleLogin);
  router.get("/api/get-all-users", userService.handleGetAllUsers);
  router.post("/api/createNewUser", userService.createNewUser);
  router.delete("/api/deleteUser", userService.handleDeleteUser);
  router.put("/api/editUser", userService.handleEditUser);
  return app.use("/", router);
};

module.exports = initWebRoutes;
