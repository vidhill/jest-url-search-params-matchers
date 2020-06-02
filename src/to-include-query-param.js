import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import makeUtils from './utils';

const MATCHER_NAME = 'toIncludeQueryParam';
const { matchExpectedType } = makeUtils(MATCHER_NAME);

const toIncludeQueryParam = function (received, ...expected) {
  if (expected.length === 0) {
    return {
      pass: false,
    };
  }

  const isExpectedTypeResult = matchExpectedType(received);

  if (isExpectedTypeResult.pass === false) {
    return isExpectedTypeResult;
  }

  const receivedParamKeys = [...received.keys()];

  const pass = expected.every((key) => receivedParamKeys.includes(key));

  if (pass) {
    return {
      message: () => {
        return [
          matcherHint(`.not.${MATCHER_NAME}`),
          'Expected search params not to include the param:',
          `  ${printExpected(expected)}`,
          'Received:',
          `  ${printReceived(receivedParamKeys)}`,
        ].join('\n');
      },
      pass: true,
    };
  }

  return {
    message: () => {
      return (
        matcherHint(`.${MATCHER_NAME}`) +
        '\n' +
        `Expected URLSearchParams to have to include a param named: ${printExpected(expected)}\n` +
        `Received: ${printReceived(receivedParamKeys)}`
      );
    },
    pass: false,
  };
};

export { MATCHER_NAME };
export default toIncludeQueryParam;
