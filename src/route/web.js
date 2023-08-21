import express from "express";
import homeController from "../controllers/homeController";
// import userService from "../controllers/userController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/index", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);

  // router.post("/api/login", userService.handleLogin);
  // router.get("/api/get-all-users", userService.handleGetAllUsers);
  // router.post("/api/createNewUser", userService.createNewUser);
  // router.delete("/api/deleteUser", userService.handleDeleteUser);
  // router.put("/api/editUser", userService.handleEditUser);
  router.post('/api/login', userController.handleLogin)
  router.get('/api/get-all-users', userController.handleGetAllUsers)
  router.post('/api/create-new-user', userController.handleCreateNewUser)
  router.put('/api/edit-user', userController.handleEditUser)
  router.delete('/api/delete-user', userController.handleDeleteUser)
  router.get('/api/getallcode', userController.getAllCode)
  // router.get('/api/getallcodes', userController.getAllCodes)

  router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
  router.get('/api/getAllDoctor', doctorController.getAllDoctor)


  return app.use("/", router);
};

module.exports = initWebRoutes;
