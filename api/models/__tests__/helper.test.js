const Helper = require('../helper')

describe('#createKey', () => {
  it('should return string', () => {
    const key = Helper.createKey();
    expect(typeof key).toEqual('string');
  });

  it('should return random value', () => {
    const key1 = Helper.createKey();
    const key2 = Helper.createKey();
    expect(key1).not.toEqual(key2);
  })
});

describe('#randomInt', () => {
  it('should return int', () => {
    const value = Helper.randomInt();
    expect(parseInt(String(value), 10)).toEqual(value);
  })
});

describe('#isString', () => {
  describe('when nullable = false (default)', () => {
    it('should return true by string', () => {
      expect(Helper.isString('hoge')).toEqual(true);
    });

    it('should return false by not string', () => {
      expect(Helper.isString(/hoge/)).toEqual(false);
    });

    it('should return false by null', () => {
      expect(Helper.isString(null)).toEqual(false);
    });
  });

  describe('when nullable = true', () => {
    it('should return true by string', () => {
      expect(Helper.isString('hoge', { nullable: true })).toEqual(true);
    });

    it('should return false by not string', () => {
      expect(Helper.isString(/hoge/, { nullable: true })).toEqual(false);
    });

    it('should return true by null', () => {
      expect(Helper.isString(null, { nullable: true })).toEqual(true);
    });
  });
});
