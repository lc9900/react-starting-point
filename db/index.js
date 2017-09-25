'use strict'
const chalk = require('chalk');
const Sequelize = require('sequelize');
const databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/senior_enrichment';


console.log(chalk.yellow(`Opening database connection to ${databaseUrl}`));

// create the database instance that can be used in other database files
module.exports = new Sequelize(databaseUrl, {
  logging: true
});
