import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://root:rodrigo2020@localhost:3306/links_database');

export default sequelize;
