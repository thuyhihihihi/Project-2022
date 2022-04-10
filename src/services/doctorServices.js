// import { reject } from "bcrypt/promises"
import { promise, reject } from "bcrypt/promises";
import { response } from "express";
import db from "../models/index";

let getLoadDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],//lay thong tin nguoi nao vua tao se len truoc
                attributes: {
                    exclude: ['password']//khong hien thi password
                },
                include: [
                    { model: db.codes, as: 'positionData', attributes: ['valueENG', 'valueVI'] },
                ],

                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errCode: 0,
                data: doctor
            })
        } catch (e) {
            reject(e);

        }
    })
}


let saveDetailInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.contentHTML || !data.contentMarkdown
                || !data.doctorId) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing parameter 55'
                })
            } else {
                // await db.Markdowns.create({
                //     contentHTML: data.contentHTML,
                //     contentMarkdown: data.contentMarkdown,
                //     description: data.description,
                //     doctorId: data.doctorId
                    if (data.action === 'ADD') {
                        await db.Markdowns.create({
                            contentHTML: data.contentHTML,
                            contentMarkdown: data.contentMarkdown,
                            description: data.description,
                            doctorId: data.doctorId
                        })

                    } else if (data.action === 'EDIT') {
                        let doctorMarkdown = await db.Markdowns.findOne({
                            where: { doctorId: data.doctorId },
                            raw: false
                        })
                        if (doctorMarkdown) {
                            doctorMarkdown.contentHTML = data.contentHTML;
                            doctorMarkdown.contentMarkdown = data.contentMarkdown;
                            doctorMarkdown.description = data.description;
                            await doctorMarkdown.save()
                        }
                }
                resolve({
                    errCode: 0,
                    errMessage: 'save ok'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing required parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: {//tim 1 user voi dieu kien where
                        id: inputData
                    },
                    attributes: {
                        exclude: ['password', 'roleId']//khong hien thi 
                    },
                    include: [//ý nghĩa: sẽ lấy thông tin user kèm theo thông tin của nó tồn tại trong bảng markdown
                        {
                            model: db.Markdowns, attributes: ['description', 'contentHTML',
                                'contentMarkdown'],
                        },

                        { model: db.codes, as: 'positionData', attributes: ['valueENG', 'valueVI'] },

                    ],
                    raw: false,
                    nest: true
                })


                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getLoadDoctorHome: getLoadDoctorHome,
    getAllDoctor: getAllDoctor,
    //saveDetailDoctor:saveDetailDoctor
    saveDetailInforDoctor: saveDetailInforDoctor,
    getInforDoctor: getInforDoctor
}