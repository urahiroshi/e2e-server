const Config = {
  db: {
    pool: {
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'e2e_server'
    }
  }
};

module.exports = Config;