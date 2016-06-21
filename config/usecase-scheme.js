module.exports = {
  usecase: {
    id: {
      type: 'string',
      primaryKey: true,
      unique: true
    },
    url: {
      type: 'string'
    },
    timeout: {
      type: 'integer'
    },
    created_at: {
      type: 'datetime'
    },
    updated_at: {
      type: 'datetime'
    }
  },
  'usecase-flow': {
    usecase_id: {
      type: 'string',
      primaryKey: true
    },
    flow_id: {
      type: 'string',
      primaryKey: true
    },
    selector: {
      type: 'string'
    },
    action: {
      type: 'string'
    },
    param: {
      type: 'string'
    },
    timeout: {
      type: 'integer'
    }
  },
  'usecase-validation': {
    usecase_id: {
      type: 'string',
      primaryKey: true
    },
    validation_id: {
      type: 'string',
      primaryKey: true
    },
    selector: {
      type: 'string'
    },
    target: {
      type: 'string'
    },
    reg: {
      type: 'string'
    }
  }
}