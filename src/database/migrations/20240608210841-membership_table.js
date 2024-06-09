'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'membership_id',
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name',
      },
      membershipType: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'membership_type',
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'start_date',
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'due_date',
      },
      totalAmount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        field: 'total_amount',
      },
      isFirstMonth: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_first_month',
      },
      invoiceLink: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'invoice_link',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('members');
  },
};
