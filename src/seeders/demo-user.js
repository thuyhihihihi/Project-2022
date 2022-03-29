'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      fullName: 'thuy',
      email: 'admin@gmail.com',
      password: '1122',//plan text 
      typeRole: 'ROLE',
      keyRole: 'A1',
      address: 'vn',
      phonenumber: '0123455',
      positionId: 'bs',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
