
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class codes extends Model {
        static associate(models) {
            // define association here
            codes.hasMany(models.User, {foreignKey:'positionId', as:'positionData' })
            codes.hasMany(models.Schedule, {foreignKey:'timeType', as:'timeTypeData' })
            //Allcode.hasMany(models.User, {foreignKey:'positionId', as:'positionData' })
            codes.hasMany(models.Doctor_Infor, {foreignKey:'priceId', as:'priceType' })
            codes.hasMany(models.Doctor_Infor, {foreignKey:'provinceId', as:'provinceType' })
            codes.hasMany(models.Doctor_Infor, {foreignKey:'paymentId', as:'paymentType' })
            //  codes.hasMany(models.Doctor_Infor, {foreignKey:'addressClinicId', as:'addressClinicType' })
            //  codes.hasMany(models.Doctor_Infor, {foreignKey:'nameClinicId', as:'nameClinicType' })
            // codes.hasMany(models.Doctor_Infor, {foreignKey:'linkMap', as:'linkMapType' })
            // codes.hasMany(models.Doctor_Infor, {foreignKey:'note', as:'noteType' })
            

        }
    };
    codes.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueENG: DataTypes.STRING,
        valueVI: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'codes',
    });
    return codes;
};