import knex from 'knex';

const connection = knex({
  client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'ecoleta_db'
    }
});

export default connection;