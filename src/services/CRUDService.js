//import { reject } from 'bcrypt/promises';
import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                fullName: data.fullName,
                email: data.email,
                password: hashPasswordBcrypt,
                phonenumber: data.phonenumber,
                address: data.address,
                roleId: data.roleId,
            })
            resolve('create new user successfully!!');
        } catch (e) {
            reject(e);
        }
    })

}
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
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({//findOne lay mot object
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user)
            } else {
                resolve({})//không tìm thấy user sẽ trả ra mảng roongx
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            })
            if (user) {
                user.fullName = data.fullName;
                user.email = data.email;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.password = data.password;
                user.roleId = data.roleId;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
                //cách hd: cần tìm user trong db với điều kiện  where: { id: data.id }, id = id truyền vào
                //sau khi tìm dc user, bắt đầu cập nhật thông tin user theo biến data truyền vào
                //sau cùng gọi ngược lại user.save: lưu thông tin
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);
        }
    })
}
//promis dùng để tránh việc bất đồng bộ xảy ra: nói với nodejs, có 1 cái promis ở đây
//chờ khi nào promis xử lý xong thì mới được chạy tiếp
//resolve: chap nhan, reject: tu choi

// let deleteUserById = (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: { id: userId }
//             })
//             if (!user) {
//                 await user.destroy();
//             }
//             resolve();//resolve = return = cau lenh ko tra ra ket qua gi, thoat ra khoi ham
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({//findOne = chi tìm 1 bản ghi, nếu tìm thấy sẽ trả ra object
            //tương ứng role trong db
            where: {id: userId}//where: chọn hết tableUser, nơi id = idInput truyền vào
        })
        if(!user){
            resolve({
                errCode: 2,
                errMessage: 'nguoi dung khong ton tai'
            })
        }
        await db.User.destroy({
            where: {id: userId}
        })
       
        resolve({
            errCode: 0,
            message: 'delete done'
        })
    })
}
// deleteUserById = ()=>{
//     alert('your want delete')
// }
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById,
}