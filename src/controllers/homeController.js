
import db from '../models/index';
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();//findAll la tim tat ca du lieu trong ban user

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('create.ejs');
}
// let postCRUD = async (req, res) => {
//     let message = await CRUDService.createNewUser(req.body);
//     console.log(message)
//     return res.send('post form thuy thuy');
// }
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server HIHIH');

}

let display = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('---------------------')
    console.log(data)
    console.log('---------------------')
    return res.render('display.ejs', {
        dataDisplay: data
    })
}
let edit = async (req, res) => {
    let userId = req.query.id;
    console.log(userId)
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check user data not found
        return res.render('edit.ejs', {
            user: userData
        })

    } else {
        return res.send('user not found!');
    }
}

let putEdit = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUser(data);
    return res.render('display.ejs', {
        dataDisplay: allUsers
    })
}

let Delete = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('delete done!')
    } else {
        return res.send('not found!');
    }

}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    display: display,
    edit: edit,
    putEdit: putEdit,
    Delete: Delete
}