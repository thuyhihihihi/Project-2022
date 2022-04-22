
// import { reject, use } from "bcrypt/promises";
import db from "../models/index";
import bcrypt from 'bcryptjs';//hardpassword
import { reject } from "bcrypt/promises";
import { hash } from "bcrypt";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {// resolve: neu moi viec xay ra binh thuong thi se giai quyet dc vde
        //reject: tu choi
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'fullName'],//ham nay de lay nhung mang can lay
                    where: { email: email },
                    raw: true // hide password - bao mat tai khoan
                });
                if (user) {

                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        console.log(user)
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `user not found. Try other email!`;
                }
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Account not valid!`;
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (userId === 'ALL') {
                user = await db.User.findAll({
                  
                })
            }
            if (userId && userId !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: userId },
                    // attributes: {
                    //     exclude: ['password']//khong hien thi password
                    // }
                })
            }
            resolve(user)
        } catch (e) {
            reject(e);
        }
    })
}


let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email exist
            let check = await checkEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'email da duoc su dung, thu cach khac'
                })
            } else {
                let hashPasswordBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    fullName: data.fullName,
                    email: data.email,
                    password: hashPasswordBcrypt,
                    phonenumber: data.phonenumber,
                    address: data.address,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.image
                })
                resolve({
                    errCode: 0,
                    message: 'tao thanh cong'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let FoundUser = await db.User.findOne({//findOne = chi tìm 1 bản ghi, nếu tìm thấy sẽ trả ra object
            //tương ứng role trong db
            where: { id: userId }//where: chọn hết tableUser, nơi id = idInput truyền vào

        })
        if (!FoundUser) {
            resolve({
                errCode: 2,
                errMessage: 'nguoi dung khong ton tai'
            })
        }
        // console.log('abc', FoundUser)
        // if(FoundUser){
        //     await FoundUser.destroy();
        // }
        await db.User.destroy({
            where: { id: userId }
        })

        resolve({
            errCode: 0,
            message: 'delete done'
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.fullName = data.fullName;
                user.email = data.email;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.password = data.password;
                user.roleId = data.roleId
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'update done'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'nguoi dung khong ton tai'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing required parameter!'
                })
            } else {
                let res = {};
                let allCode = await db.codes.findAll({
                    where: { type: typeInput }// tim tat ca va loc theo dieu kien where
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }

        } catch (e) {
            reject(e);

        }
    })
}


module.exports = {
    handleLogin: handleLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService
}