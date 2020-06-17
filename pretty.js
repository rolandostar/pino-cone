const jsonParser = require('fast-json-parse');
const cliui = require('cliui');

const formatters = require('./formatters');
const { levels } = require('./settings');

const numericLabels = {
  10: 'trace',
  20: 'debug',
  30: 'info',
  40: 'warn',
  50: 'error',
  60: 'fatal',
};

const defaultOptions = {};

module.exports = (options) => {
  // methods taken from James' reference prettifier: https://github.com/pinojs/pino-pretty/
  const isPinoLog = (log) => (log && Object.prototype.hasOwnProperty.call(log, 'v') && log.v === 1);
  const isObject = (input) => Object.prototype.toString.apply(input) === '[object Object]';
  //
  function extractLog(inputData) {
    if (!isObject(inputData)) {
      const parsed = jsonParser(inputData);
      if (parsed.err || !isPinoLog(parsed.value)) return null;
      return parsed.value;
    }
    return inputData;
  }

  function formatOutput(args, obj) {
    const {
      formatLogLevel,
      noDefaultMetadata,
      filterOutMetadata,
      formatTime,
      formatResponse,
      formatRequest,
      formatReqId,
      formatProperties,
      formatMessage,
    } = formatters;
    const ui = cliui();
    const l1 = formatLogLevel(obj);
    const l2 = formatTime(obj);

    if (obj.message === 'request completed') ui.div(l1, l2, formatResponse(obj), formatReqId(obj));
    else if (obj.message === 'incoming request') ui.div(l1, l2, formatRequest(obj), formatReqId(obj));
    else {
      const hasProps = Object.keys(obj).filter(noDefaultMetadata).length > 0;
      const hasMsg = typeof obj.message !== 'undefined';
      if (hasMsg !== hasProps) {
        if (hasProps) ui.div(l1, l2, formatProperties(levels[obj.level], filterOutMetadata(obj)));
        else ui.div(l1, l2, formatMessage(obj));
      } else {
        ui.div(
          formatLogLevel(obj),
          formatTime(obj),
          formatMessage(obj),
          formatProperties(levels[obj.level], filterOutMetadata(obj)),
        );
      }
    }
    return `${ui.toString()}\n`;
  }

  function parse(args, obj) {
    const objLocal = obj;
    if (typeof objLocal.level === 'number') objLocal.level = numericLabels[objLocal.level];
    if (!objLocal.message) objLocal.message = obj.msg;

    return formatOutput(args, objLocal);
  }

  const opts = { ...defaultOptions, ...options };
  return (inputData) => {
    const log = extractLog(inputData);
    if (log === null) return `${inputData}\n`;
    return parse(opts, log);
  };
};
