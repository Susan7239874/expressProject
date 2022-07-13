'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Articles', [
            {
                title: 'John Doe',
                conent: '发报一条新闻',
                createdAt: new Date(),
                updatedAt: new Date()
            },
          {
            title: 'Marray',
            conent: '纽约市中心爆炸',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {});

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Articles', null, {});

    }
};
