
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class codes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            codes.hasMany(models.User, {foreignKey:'positionId', as:'positionData' })
            //Allcode.hasMany(models.User, {foreignKey:'positionId', as:'positionData' })
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