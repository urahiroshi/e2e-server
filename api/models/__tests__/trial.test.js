jest.mock('bull');
jest.mock('../../connectors/mysql');
jest.mock('../result');
const Connector = require('../../connectors/mysql');
const Result = require('../result');
const Trial = require('../trial');
const ValidationError = require('../../errors/validation-error');

const usecase = {
  url: 'http://yahoo.com',
  actions: [
    {
      selectors: ['form[action*=\'/search\'] [name=p]'],
      type: 'input',
      value: 'github nightmare'
    }, {
      selectors: ['form[action*=\'/search\'] [type=submit]'],
      type: 'click'
    }
  ]
};

const sharedExamplesForTrialParameter = (subject) => {
  const setUsecaseMethod = (obj) => (
    () => {
      subject({
        usecase: obj
      });
    }
  );
  const errorExample = ({ when, should, usecase, error }) => {
    describe(`when ${when}`, () => {
      it(`should ${should}`, () => {
        if (error) {
          expect(setUsecaseMethod(usecase)).toThrowError(error);
        } else {
          expect(setUsecaseMethod(usecase)).not.toThrow();
        }
      });
    });
  }

  const sharedExamplesForSelectors = ({ actionType, actionWithoutSelectors }) => {
    errorExample({
      when: `${actionType} action has no selectors`,
      should: 'throw validation error',
      usecase: {
        url: usecase.url,
        actions: usecase.actions.concat([actionWithoutSelectors])
      },
      error: JSON.stringify({
        "usecase.actions[2]": {
          selectors: "'undefined' is invalid length or one of selector has invalid length (valid length is between 1 - 255)"
        }
      })
    });

    errorExample({
      when: `${actionType} action has empty selectors`,
      should: 'throw validation error',
      usecase: {
        url: usecase.url,
        actions: usecase.actions.concat([
          Object.assign({
            selectors: []
          }, actionWithoutSelectors)
        ])
      },
      error: JSON.stringify({
        "usecase.actions[2]": {
          selectors: "'[]' is invalid length or one of selector has invalid length (valid length is between 1 - 255)"
        }
      })
    });
  };

  const sharedExamplesForValue = ({ actionType, actionWithoutValue }) => {
    errorExample({
      when: `${actionType} action has no value`,
      should: 'throw validation error',
      usecase: {
        url: usecase.url,
        actions: usecase.actions.concat([actionWithoutValue])
      },
      error: JSON.stringify({
        "usecase.actions[2]": {
          value: "'undefined' is invalid length (valid length is between 1 - 255)"
        }
      })
    });

    errorExample({
      when: `${actionType} action has not string value`,
      should: 'throw validation error',
      usecase: {
        url: usecase.url,
        actions: usecase.actions.concat([
          Object.assign({
            value: 100
          }, actionWithoutValue)
        ])
      },
      error: JSON.stringify({
        "usecase.actions": 'invalid type'
      })
    });
  };

  const sharedExamplesForVariable = ({ actionType, actionWithoutVariable}) => {
    errorExample({
      when: `${actionType} action has no variable`,
      should: 'not throw validation error',
      usecase: {
        url: usecase.url,
        actions: usecase.actions.concat([actionWithoutVariable])
      },
      error: null
    });

    errorExample({
      when: `${actionType} action has not-string variable`,
      should: 'throw validation error',
      usecase: {
        url: usecase.url,
        actions: usecase.actions.concat([
          Object.assign({
            variable: 100
          }, actionWithoutVariable)
        ])
      },
      error: JSON.stringify({
        "usecase.actions": 'invalid type'
      })
    });
  };

  describe('when valid usecase is set', () => {
    it('should not throw error', () => {
      expect(() => { subject({ usecase: usecase }); }).not.toThrow();
    });
  });

  errorExample({
    when: 'url is not defined',
    should: 'throw validation error',
    usecase: {
      actions: usecase.actions
    },
    error: /"usecase.url":"invalid type"/
  });

  errorExample({
    when: 'url is not string',
    should: 'throw validation error',
    usecase: {
      url: 5,
      actions: usecase.actions
    },
    error: /"usecase.url":"invalid type"/
  });

  errorExample({
    when: 'url is not valid url string',
    should: 'throw validation error',
    usecase: {
      url: 'hoge',
      actions: usecase.actions
    },
    error: /"usecase.url":"invalid type"/
  });

  errorExample({
    when: 'actions is not defined',
    should: 'throw validation error',
    usecase: {
      url: usecase.url
    },
    error: /"usecase.actions":"invalid type"/
  });

  errorExample({
    when: 'actions is not array',
    should: 'throw validation error',
    usecase: {
      url: usecase.url,
      actions: 'hoge'
    },
    error: /"usecase.actions":"invalid type"/
  });

  errorExample({
    when: 'actions has null member',
    should: 'throw validation error',
    usecase: {
      url: usecase.url,
      actions: usecase.actions.concat([null])
    },
    error: /"usecase.actions":"invalid type"/
  });

  errorExample({
    when: 'actions has no member',
    should: 'throw validation error',
    usecase: {
      url: usecase.url,
      actions: []
    },
    error: /"usecase.actions":"invalid type"/
  });

  errorExample({
    when: 'action has no type',
    should: 'throw validation error',
    usecase: {
      url: usecase.url,
      actions: [{
        selectors: ['hoge']
      }]
    },
    error: /"usecase.actions":"invalid type"/
  });

  errorExample({
    when: 'action has unknown type',
    should: 'throw validation error',
    usecase: {
      url: usecase.url,
      actions: [{
        type: 'hoge',
        selectors: ['hoge']
      }]
    },
    error: JSON.stringify({
      "usecase.actions[0]": {
        type: "'hoge' is unknown type"
      }
    })
  });

  errorExample({
    when: 'click action has valid selectors',
    should: 'throw validation error',
    usecase: {
      url: usecase.url,
      actions: usecase.actions.concat([{
        type: 'click',
        selectors: ['hoge', 'fuga']
      }])
    },
    error: null
  });

  sharedExamplesForSelectors({
    actionType: 'click',
    actionWithoutSelectors: {
      type: 'click'
    }
  });

  ['select', 'input'].forEach((actionType) => {
    errorExample({
      when: `${actionType} action has valid selectors and value`,
      should: 'not throw validation error',
      usecase: {
        url: usecase.url,
        actions: usecase.actions.concat([{
          type: actionType,
          value: 'hoge',
          selectors: ['hoge', 'fuga']
        }])
      },
      error: null
    });

    sharedExamplesForSelectors({
      actionType: actionType,
      actionWithoutSelectors: {
        type: actionType,
        value: 'hoge'
      }
    });

    sharedExamplesForValue({
      actionType: actionType,
      actionWithoutValue: {
        type: actionType,
        selectors: ['hoge', 'fuga']
      }
    });
  });

  ['getHtml', 'getText'].forEach((actionType) => {
    errorExample({
      when: `${actionType} action has valid selectors and variable`,
      should: 'not throw validation error',
      usecase: {
        url: usecase.url,
        actions: usecase.actions.concat([{
          type: actionType,
          variable: 'hoge',
          selectors: ['hoge', 'fuga']
        }])
      },
      error: null
    });

    sharedExamplesForSelectors({
      actionType: actionType,
      actionWithoutSelectors: {
        type: actionType,
        variable: 'hoge'
      }
    });

    sharedExamplesForVariable({
      actionType: actionType,
      actionWithoutVariable: {
        type: actionType,
        selectors: ['hoge', 'fuga']
      }
    });
  });

  errorExample({
    when: 'getScreenshot action',
    should: 'not throw validation error',
    usecase: {
      url: usecase.url,
      actions: [{
        type: 'getScreenshot'
      }]
    },
    error: null
  });

};

describe('#constructor', () => {
  sharedExamplesForTrialParameter((params) => {
    new Trial(params);
  });
});

describe('#set', () => {
  sharedExamplesForTrialParameter((params) => {
    const trial = new Trial();
    trial.set(params);
  });
});

describe('#save', () => {
  beforeAll(() => {
    Connector.mockMethod('query', () => {
      return new Promise((resolve) => { resolve(); });
    });
  });

  it('should success without exception', done => {
    const trial = new Trial({ usecase: usecase });
    trial.save().then(() => {
      expect(trial.id).toBeDefined();
      expect(trial.state).toBe('Initialized');
      done();
    });
  });
});

describe('#delete', () => {
  beforeAll(() => {
    Result.mockMethod('find', () => (
      new Promise((resolve) => { resolve([]); }))
    );
    const mockTransaction = {
      query: () => mockTransaction,
      end: () => new Promise((resolve) => { resolve(); })
    };
    Connector.mockMethod('transaction', () => mockTransaction);
  });

  it('should success without exception', done => {
    const trial = new Trial({
      usecase: Object.assign({}, usecase, { id: 12345 }),
      job: {
        remove: () => new Promise((resolve) => { resolve(); })
      }
    });
    trial.delete().then(() => {
      done();
    });
  });
});

describe('#find', () => {
  const trialId = 12345;
  const trialRow = {
    trial_id: trialId,
    created_at: new Date(),
    state: 'Initialized',
    updated_at: new Date(),
    usecase_json: JSON.stringify(usecase)
  };

  beforeAll(() => {
    Connector.mockMethod('query', () => {
      return new Promise((resolve) => {
        resolve([trialRow]);
      });
    });
  });

  it('should return trial', done => {
    Trial.find(trialId).then(trial => {
      expect(trial.toJSON()).toMatchObject({
        id: trialRow.trial_id,
        createdAt: trialRow.created_at,
        state: 'Running',
        usecase: usecase
      });
      done();
    });
  });
});

describe('#findByUsecase', () => {
  const projectUsecase = Object.assign({}, usecase, {
    projectId: 100,
    usecasePath: '/hoge'
  });

  describe('when projectId is not set', () => {
    it('should raise error', () => {
      expect(() => {
        Trial.findByUsecase({
          usecasePath: projectUsecase.usecasePath
        });
      }).toThrowError(JSON.stringify({ projectId: 'need to be set' }));
    });
  });

  describe('when usecasePath is not set', () => {
    it('should raise error', () => {
      expect(() => {
        Trial.findByUsecase({
          projectId: projectUsecase.projectId
        });
      }).toThrowError(JSON.stringify({ usecasePath: 'need to be set' }));
    });
  });

  describe('when usecasePath and projectId is set', () => {
    const trialRowBase = {
      created_at: new Date(),
      state: 'Initialized',
      updated_at: new Date(),
      usecase_json: JSON.stringify(usecase)
    };
    const trials = [];
    (() => {
      for (let i = 0; i < 10; i++) {
        trials.push(Object.assign({}, trialRowBase, { trial_id: i + 1 }));
      }
    })();
    const mockTrials = ({ projectId, usecasePath, limit }) => {
      Connector.mockMethod('query', () => (
        new Promise((resolve) => {
          const filteredTrials = trials.filter((trial, i) => i < limit)
          .map((trial, i) => (
            Object.assign({
              project_id: projectId,
              usecase_path: usecasePath,
              iteration_number: i + 2
            }, trial)
          ));
          resolve(filteredTrials);
        })
      ));
    };

    it('should return trials', done => {
      mockTrials(Object.assign({ limit: 10 }, projectUsecase));
      Trial.findByUsecase(projectUsecase).then((trials) => {
        expect(trials.length).toBe(10);
        trials.forEach((trial, i) => {
          expect(trial.toJSON()).toMatchObject({
            id: i + 1,
            createdAt: trialRowBase.created_at,
            state: 'Running',
            usecase: usecase,
            projectId: projectUsecase.projectId,
            usecasePath: projectUsecase.usecasePath,
            iterationNumber: i + 2
          });
        });
        done();
      });
    });

    it('should return trials with offset and limit', done => {
      const offset = 1;
      const limit = 5;

      mockTrials(Object.assign({ limit }, projectUsecase));
      Trial.findByUsecase(
        Object.assign({ offset: 1, limit: 5 }, projectUsecase)
      ).then((trials) => {
        expect(trials.length).toBe(5);
        trials.forEach((trial, i) => {
          expect(trial.toJSON()).toMatchObject({
            id: i + 1,
            createdAt: trialRowBase.created_at,
            state: 'Running',
            usecase: usecase,
            projectId: projectUsecase.projectId,
            usecasePath: projectUsecase.usecasePath,
            iterationNumber: i + 2
          });
        });
        done();
      });
    });

    it('should return trials with lastIterationNumber and limit', done => {
      const offset = 1;
      const limit = 5;

      mockTrials(Object.assign({ limit }, projectUsecase));
      Trial.findByUsecase(
        Object.assign({ lastIterationNumber: 2, limit: 5 }, projectUsecase)
      ).then((trials) => {
        expect(trials.length).toBe(5);
        trials.forEach((trial, i) => {
          expect(trial.toJSON()).toMatchObject({
            id: i + 1,
            createdAt: trialRowBase.created_at,
            state: 'Running',
            usecase: usecase,
            projectId: projectUsecase.projectId,
            usecasePath: projectUsecase.usecasePath,
            iterationNumber: i + 2
          });
        });
        done();
      });
    });
  })
});

describe('#findByIterationNumber', () => {
  const projectId = 101;
  const iterationNumber = 3;

  describe('when projectId is not set', () => {
    it('should raise error', () => {
      expect(() => {
        Trial.findByIterationNumber({ iterationNumber });
      }).toThrowError(JSON.stringify({ projectId: 'need to be set' }));
    });
  });

  describe('when iterationNumber is not set', () => {
    it('should raise error', () => {
      expect(() => {
        Trial.findByIterationNumber({ projectId });
      }).toThrowError(JSON.stringify({ iterationNumber: 'need to be set' }));
    });
  });

  describe('when usecasePath and projectId is set', () => {
    const trialRowBase = {
      created_at: new Date(),
      state: 'Initialized',
      updated_at: new Date(),
      usecase_json: JSON.stringify(usecase),
      project_id: projectId,
      iteration_number: iterationNumber
    };
    const trials = [];
    (() => {
      for (let i = 0; i < 10; i++) {
        trials.push(Object.assign({}, trialRowBase, {
          trial_id: i + 1,
          iteration_number: iterationNumber
        }));
      }
    })();

    beforeEach(() => {
      Connector.mockMethod('query', () => (
        new Promise((resolve) => {
          resolve(trials);
        })
      ));
    });

    it('should return trials', done => {
      Trial.findByIterationNumber({
        projectId, iterationNumber
      }).then((trials) => {
        expect(trials.length).toBe(10);
        trials.forEach((trial, i) => {
          expect(trial.toJSON()).toMatchObject({
            id: i + 1,
            createdAt: trialRowBase.created_at,
            state: 'Running',
            usecase: usecase,
            projectId,
            iterationNumber
          });
        });
        done();
      });
    });
  });
});
