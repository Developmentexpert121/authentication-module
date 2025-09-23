// 'use strict';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Users', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       username: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       password: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//       },
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('Users');
//   },
// };

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      /*FIELDS_PLACEHOLDER*/
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};