import rules from './';

describe('test exported combined rules', () => {
  it('should be a defined object', () => {
    expect(rules).not.toBeUndefined();
    expect(rules).toBeType('object');
  });

  it('should have the expected properties', () => {
    const a = {
      toIncludeQueryParam: expect.any(Function),
      toMatchQueryParam: expect.any(Function),
    };
    expect(rules).toEqual(a);
  });
});
