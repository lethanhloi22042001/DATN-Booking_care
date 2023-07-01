import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/index', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud',homeController.getCRUD) ;
    router.post('/post-crud',homeController.postCRUD) ;
    router.get('/getUsers',homeController.getUsers) ;
    router.get('/edit-crud',homeController.getEditCRUD) ;
    router.post('/put-crud', homeController.putCRUD) ;
    router.post('/api/post-user',userController.handleLogin);
    return app.use("/", router);
} 

module.exports = initWebRoutes;