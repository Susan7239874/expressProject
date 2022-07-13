'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Comments', [
            {
                articleId: 1,
                conent: '这是文章的评论',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                articleId: 2,
                conent: '这是marry文章的评论',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    async down(queryInterface, Sequelize) {
          await queryInterface.bulkDelete('Comments', null, {});
    }
};
