
import express from "express";
import { route } from "express/lib/application";
// import { route } from "express/lib/application";
import homeController from '../controllers/homeController';
let router = express.Router();
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController"

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
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);//restAPI
    router.get('/api/code', userController.getAllCode);

    router.get('/api/load-doctor', doctorController.getLoadDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctor);
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor);
    router.get('/api/get-infor-doctor', doctorController.getInforDoctor);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-scheduledoctor-date', doctorController.getSchedulebyDate);
    router.get('/api/get-extra-infordoctor', doctorController.getExtraInforDoctorById);
    router.get('/api/get-profile-infordoctor', doctorController.getProfileDoctorById);

    return app.use("/", router);
}

module.exports = initWebRoutes;