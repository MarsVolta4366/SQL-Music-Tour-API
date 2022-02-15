'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('set_times', {
      set_time_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: { model: 'events', key: 'event_id' }
      },
      stage_id: {
        type: Sequelize.INTEGER,
        references: { model: 'stages', key: 'stage_id' }
      },
      band_id: {
        type: Sequelize.INTEGER,
        references: {model: 'bands', key: 'band_id'}
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('set_times');
  }
};