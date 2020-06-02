import toMatchQueryParam, { MATCHER_NAME } from './to-match-query-param';

jest.mock('jest-matcher-utils');

const dummyExpect = (received) => ({
  toMatchQueryParam: (...args) => toMatchQueryParam(received, ...args),
});

describe(`test 'expect().${MATCHER_NAME}()'`, () => {
  it("should fail if object passed is not a 'URLSearchParams' object", () => {
    const { pass } = dummyExpect({}).toMatchQueryParam('foo');
    expect(pass).toBe(false);
  });

  it('should fail if no expected key is provided', () => {
    const urlParams = new URLSearchParams({ paginate: true });
    const { pass } = dummyExpect(urlParams).toMatchQueryParam();
    expect(pass).toBe(false);
  });

  it("should fail if the expected value doesn't match", () => {
    const urlParams = new URLSearchParams({ paginate: true, bar: false });
    const { pass } = dummyExpect(urlParams).toMatchQueryParam('paginate', 'tru');
    expect(pass).toBe(false);
  });

  it('should pass if key and value match', () => {
    const urlParams = new URLSearchParams({ paginate: true, bar: false });
    const { pass } = dummyExpect(urlParams).toMatchQueryParam('paginate', 'true');
    expect(pass).toBe(true);
  });

  it('should pass if key and value match, array syntax', () => {
    const urlParams = new URLSearchParams({ paginate: true, bar: false });
    const { pass } = dummyExpect(urlParams).toMatchQueryParam('paginate', ['true']);
    expect(pass).toBe(true);
  });

  it('should pass if key and value match, array syntax', () => {
    const dummyKey = 'dummyKey';
    const expectedValue = 'expectedValue';
    const urlParams = new URLSearchParams(`${dummyKey}=${expectedValue}&${dummyKey}=bar`);
    const { pass } = dummyExpect(urlParams).toMatchQueryParam('paginate', ['false', expectedValue]);
    expect(pass).toBe(false);
  });

  it('should pass if key and value match, array syntax', () => {
    const dummyKey = 'dummyKey';
    const urlParams = new URLSearchParams(`${dummyKey}=expectedValue&${dummyKey}=bar`);
    const { pass } = dummyExpect(urlParams).toMatchQueryParam(dummyKey, ['bar', 'expectedValue']);
    expect(pass).toBe(true);
  });

  it('should fail, multiple values same key', () => {
    const dummyKey = 'dummyKey';
    const expectedValue = 'expectedValue';
    const urlParams = new URLSearchParams(`${dummyKey}=${expectedValue}&${dummyKey}=bar`);
    const { pass } = dummyExpect(urlParams).toMatchQueryParam(dummyKey, expectedValue);
    expect(pass).toBe(false);
  });

  it("should fail if key doesn't exist", () => {
    const urlParams = new URLSearchParams({});
    const { pass } = dummyExpect(urlParams).toMatchQueryParam('paginate', 'true');
    expect(pass).toBe(false);
  });

  it('should fail if no expected value is provided', () => {
    const urlParams = new URLSearchParams({ paginate: true });
    const { pass } = dummyExpect(urlParams).toMatchQueryParam('foo');
    expect(pass).toBe(false);
  });

  it('should ', () => {
    const urlParams = new URLSearchParams({ paginate: true });
    const { pass } = dummyExpect(urlParams).toMatchQueryParam('foo', 'true');
    expect(pass).toBe(false);
  });

  it('should ', () => {
    const urlParams = new URLSearchParams({ paginate: true });
    const { pass } = dummyExpect(urlParams).toMatchQueryParam('paginate', 'true');
    expect(pass).toBe(true);
  });

  it.each([{}, true, 1, 0, null, undefined])(
    "should fail if object passed is not a 'URLSearchParams' object, case: %j",
    (input) => {
      const { pass } = dummyExpect(input).toMatchQueryParam('foo');
      expect(pass).toBe(false);
    },
  );

  describe('happy path', () => {
    it('should ', () => {
      const key = 'paginate';
      const val = 'value';
      const queryParams = new URLSearchParams({ [key]: val });
      const { pass } = dummyExpect(queryParams).toMatchQueryParam(key, val);
      expect(pass).toBe(true);
    });
  });

  describe('happy path', () => {
    it('should ', () => {
      const key = 'paginate';
      const queryParams = new URLSearchParams({ [key]: 'value' });
      const { pass } = dummyExpect(queryParams).toMatchQueryParam(key, 'val');
      expect(pass).toBe(false);
    });
  });

  describe('missing expected value', () => {
    it('should ', () => {
      const paginate = 'paginate';
      const queryParams = new URLSearchParams({ [paginate]: 'val' });
      const { pass } = dummyExpect(queryParams).toMatchQueryParam(paginate);
      expect(pass).toBe(false);
    });
  });

  describe('multiple values', () => {
    it('should ', () => {
      const paginate = 'paginate';
      const queryParams = new URLSearchParams(`${paginate}=val&${paginate}==bar`);
      const { pass } = dummyExpect(queryParams).toMatchQueryParam(paginate, 'val');
      expect(pass).toBe(false);
    });
  });

  it('should ', () => {
    const queryParams = new URLSearchParams('');
    const { pass } = dummyExpect(queryParams).toMatchQueryParam('foo', 'val');
    expect(pass).toBe(false);
  });
});
