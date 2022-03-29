import { json } from "express/lib/response";
import userService from "../services/userServices";
let handleLogin = async (req, res) => {
    let email = req.body.email;
    // console.log('your email: ' + email)
    let password = req.body.password;
    //check email exist
    //return userInfor
    if (!email || !password) {// = if(email == || email == null)
        return res.status(500).json({
            errCode: 1,
            message: 'missing input!'
        })
    }

    let userData = await userService.handleLogin(email, password);
    // console.log(userData)
    return res.status(200).json({
        //password nhap vao khong dung
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUser = async (req, res) => {
    let id = req.query.id;//all = lay tat ca nguoi dung, id = lay 1 nguoi dung, lay chinh xac nguoi dung do
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required',
            user: []
        })
    }
    let user = await userService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        user
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "missing required!!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {

        let data = await userService.getAllCodeService(req.query.type);
        console.log(data)
        return res.status(200).json(data);
    } catch (e) {
        console.log('get all code: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode

}