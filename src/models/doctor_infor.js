'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Infor extends Model {
        
        static associate(models) {
            // define association here
           Doctor_Infor.belongsTo(models.User, {foreignKey: 'doctorId'})
           Doctor_Infor.belongsTo(models.codes, {foreignKey: 'priceId', targetKey: 'keyMap', as:'priceType' })
           Doctor_Infor.belongsTo(models.codes, {foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceType' })
           Doctor_Infor.belongsTo(models.codes, {foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentType' })
        //    Doctor_Infor.belongsTo(models.codes, {foreignKey: 'addressClinicId', targetKey: 'keyMap', as: 'addressClinicIdType' })
        //    Doctor_Infor.belongsTo(models.codes, {foreignKey: 'nameClinicId', targetKey: 'keyMap', as: 'nameClinicIdType' })
        }
    };
    Doctor_Infor.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,

        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
        linkMap: DataTypes.STRING


    }, {
        sequelize,
        modelName: 'Doctor_Infor',
        freezeTableName: true
    });
    return Doctor_Infor;
};