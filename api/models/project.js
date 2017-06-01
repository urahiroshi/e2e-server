const Connector = require('../connectors/mysql');
const Helper = require('./helper');
const Base = require('./base');
const crypto = require('crypto');
const Promise = require('bluebird');
const validator = require('validator');

class Project extends Base {
  constructor() {
    super();
  }

  save() {
    const projectId = Helper.randomInt();
    const now = new Date();
    const connector = new Connector();
    return connector.query('\
      insert into projects \
        (project_id, created_at) \
        values (?, ?) \
      ', projectId, now
    )
    .then(() => {
      this.id = projectId;
      this.createdAt = now;
      return this;
    });
  }

  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt
    };
  }

  static find(projectId) {
    const connector = new Connector();
    const project = new Project();
    return connector.query(
      'select * from projects where project_id = ?', projectId
    )
    .then((rows) => {
      if (rows.length <= 0) { throw new NotFoundError(); }
      Object.assign(project, Connector.camelCase(rows[0]));
      return project;
    })
  }
}

module.exports = Project;
