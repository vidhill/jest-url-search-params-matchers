import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import makeUtils from './utils';

const MATCHER_NAME = 'toIncludeQueryParam';

const { matchExpectedType } = makeUtils(MATCHER_NAME);

const messageObj = {
  expectedKey: 'Matcher expects to be passed an expected search param key but received none',
  expectedValue: 'Matcher expects to be passed an expected value but received none',
};

const checkArguments = function (args) {
  const [, expectedKey, expectedValue] = args;
  if (args.length < 3) {
    if (expectedKey === undefined || expectedValue === undefined) {
      const message = expectedKey === undefined ? messageObj.expectedKey : messageObj.expectedValue;

      return {
        message: () => {
          return [matcherHint(`.${MATCHER_NAME}`), message].join('\n');
        },
        pass: false,
      };
    }
  }
  return {
    pass: true,
  };
};

const toMatchQueryParam = function (...args) {
  const [received, expectedKey, expectedValues] = args;

  const expectedArgumentsResult = checkArguments(args);
  if (expectedArgumentsResult.pass === false) {
    return expectedArgumentsResult;
  }

  const isExpectedTypeResult = matchExpectedType(received);

  if (isExpectedTypeResult.pass === false) {
    return isExpectedTypeResult;
  }

  const receivedValues = received.getAll(expectedKey);

  const [receivedValue] = receivedValues;

  if (Array.isArray(expectedValues) && expectedValues.length > 1) {
    const allIncluded = expectedValues.every((val) => receivedValues.includes(val));

    if (allIncluded) {
      return {
        message: () => {
          return [
            matcherHint(`.not.${MATCHER_NAME}`),
            `Expected  '${expectedKey}' `,
            `  ${printExpected(expectedValues.sort())}`,
            'Received:',
            `  ${printReceived(receivedValues.sort())}`,
          ].join('\n');
        },
        pass: true,
      };
    }

    return {
      message: () => {
        return [
          matcherHint(`.${MATCHER_NAME}`),
          `Expected the searchParams to have all the expected values for all the key: '${expectedKey}' `,
          'Expected value:',
          `  ${printExpected(expectedValues.sort())}`,
          'Received values:',
          `  ${printReceived(receivedValues.sort())}`,
        ].join('\n');
      },
      pass: false,
    };
  } else {
    const expectedValue = Array.isArray(expectedValues) ? expectedValues[0] : expectedValues;

    if (receivedValues.length === 0) {
      return {
        message: () => {
          return [
            matcherHint(`.${MATCHER_NAME}`),
            `Expected the search param a value for the key '${expectedKey}' but none is present`,
          ].join('\n');
        },
        pass: false,
      };
    } else if (receivedValues.length > 1) {
      return {
        message: () => {
          return [
            matcherHint(`.${MATCHER_NAME}`),
            `Expected the searchParams '${expectedKey}' to have one value, however it contains multiple values`,
            'Expected value:',
            `  ${printExpected(expectedValue)}`,
            'Received values:',
            `  ${printReceived(receivedValues)}`,
          ].join('\n');
        },
        pass: false,
      };
    }

    const pass = receivedValue === expectedValue;

    if (pass) {
      return {
        message: () => {
          return [
            matcherHint(`.not.${MATCHER_NAME}`),
            `Expected the search param '${expectedKey}' not to equal the passed value`,
            `  ${printExpected(expectedValue)}`,
            'Received:',
            `  ${printReceived(receivedValue)}`,
          ].join('\n');
        },
        pass: true,
      };
    }

    return {
      message: () => {
        return [
          matcherHint(`.${MATCHER_NAME}`),
          `Expected the search param '${expectedKey}' to have the expected value`,
          'Expected:',
          `  ${printExpected(expectedValue)}`,
          'Received:',
          `  ${printReceived(receivedValue)}`,
        ].join('\n');
      },
      pass: false,
    };
  }
};

export { MATCHER_NAME };

export default toMatchQueryParam;
