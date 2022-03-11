
import express from "express";
import { route } from "express/lib/application";
// import { route } from "express/lib/application";
import homeController from '../controllers/homeController';
let router = express.Router();
import userController from "../controllers/userController"

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/create', homeController.getCRUD);
    router.post('/postCreate', homeController.postCRUD);
    router.get('/display', homeController.display);
    router.get('/edit', homeController.edit);
    router.post('/put-edit', homeController.putEdit);
    router.get('/delete', homeController.Delete);

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.put('/api/edit-user',userController.handleEditUser);
    router.delete('/api/delete-user',userController.handleDeleteUser);//restAPI
    return app.use("/", router);
}

module.exports = initWebRoutes;