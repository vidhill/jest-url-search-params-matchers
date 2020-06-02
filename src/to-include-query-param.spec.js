import toIncludeQueryParam, { MATCHER_NAME } from './to-include-query-param';

const dummyExpect = (received) => ({
  toIncludeQueryParam: (...args) => toIncludeQueryParam(received, ...args),
});

describe(`test 'expect().${MATCHER_NAME}()'`, () => {
  it('should ', () => {
    const queryParams = new URLSearchParams({ foo: '' });
    const { pass } = dummyExpect(queryParams).toIncludeQueryParam();
    expect(pass).toBe(false);
  });

  it('should ', () => {
    const { pass } = dummyExpect({}).toIncludeQueryParam('foo');
    expect(pass).toBe(false);
  });

  it.each([{}, true, 1, 0, null, undefined])(
    "should fail if object passed is not a 'URLSearchParams' object, case: %j",
    (input) => {
      const { pass } = dummyExpect(input).toIncludeQueryParam('foo');
      expect(pass).toBe(false);
    },
  );

  it('should ', () => {
    const queryParams = new URLSearchParams({ foo: '' });
    const { pass } = dummyExpect(queryParams).toIncludeQueryParam('foo');
    expect(pass).toBe(true);
  });

  it('should ', () => {
    const queryParams = new URLSearchParams({ foo: 'val' });
    const { pass } = dummyExpect(queryParams).toIncludeQueryParam('foo', 'val');
    expect(pass).toBe(false);
  });

  it('should ', () => {
    const queryParams = new URLSearchParams({ foo: 'val', paginate: true });
    const { pass } = dummyExpect(queryParams).toIncludeQueryParam('paginate', 'foo');
    expect(pass).toBe(true);
  });
});
