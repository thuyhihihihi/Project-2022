
import req from "express/lib/request";
import doctorServices from "../services/doctorServices";
let getLoadDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorServices.getLoadDoctorHome(+limit);
        return res.status(200).json(response);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'error from server BBB ....'

        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let doctor = await doctorServices.getAllDoctor();
        //console.log(doctor)
        return res.status(200).json(doctor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from getallDoctor'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorServices.saveDetailInforDoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: e,
            errMessage: 'error  11'
        })
    }
}

let getInforDoctor = async (req, res) => {
    try {
        let infor = await doctorServices.getInforDoctor(req.query.id);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorServices.bulkCreateSchedule(req.body);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the server 777'
        })
    }
}

let getSchedulebyDate = async (req, res) => {
    try {
        let infor = await doctorServices.getSchedulebyDate(req.query.doctorId, req.query.date);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the server 7'
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorServices.getExtraInforDoctorById(req.query.doctorId);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the server 55'
        })
    }
}



let getProfileDoctorById = async (req, res) => {
    try {
        let infor = await doctorServices.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the server 55'
        })
    }
}



module.exports = {
    getLoadDoctorHome: getLoadDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getInforDoctor: getInforDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getSchedulebyDate: getSchedulebyDate,
    getExtraInforDoctorById:getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById

}