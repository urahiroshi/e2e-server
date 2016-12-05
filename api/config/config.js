const Config = {
  job: {
    baseUrl: 'http://localhost:3002'
  },
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