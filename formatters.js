const moment = require('moment');
const chalk = require('chalk');

const { levels, colorWheel } = require('./settings');

function noDefaultMetadata(val) {
  return ![
    'level',
    'time',
    'msg',
    'pid',
    'v',
    'message',
    'hostname',
    'reqId',
  ].includes(val);
}

function filterOutMetadata(obj) {
  return Object.keys(obj).filter(noDefaultMetadata).reduce((total, element) => {
    const totalLocal = total;
    totalLocal[element] = obj[element];
    return totalLocal;
  }, {});
}

function formatLogLevel(obj) {
  return {
    text: levels[obj.level].color(levels[obj.level].label),
    width: 2,
    align: levels[obj.level].align,
  };
}

function formatTime(obj) {
  return {
    text: levels[obj.level].color(
      `[${moment(obj.time).format(moment.HTML5_FMT.TIME_SECONDS)}]`,
    ),
    width: 11,
  };
}

function formatMessage(obj) {
  const text = levels[obj.level].colorize
    ? levels[obj.level].color(obj.message)
    : obj.message;
  // const width =
  //   obj.message && process.stdout.columns > obj.message.length
  //     ? obj.message.length
  //     : process.stdout.columns;
  return { text };
}

function formatPropertiesText(level, obj, parent) {
  if (!obj) return '';
  return Object.entries(obj)
    .map((o) => {
      if (typeof o[1] === 'object') {
        return formatPropertiesText(level, o[1], o[0]);
      }
      return `${(parent === '' ? '' : level.color(`${parent}.`))
        + level.color(o[0])}=${o[1]}`;
    })
    .join(' ');
}

function formatProperties(level, obj, parent = '') {
  const text = formatPropertiesText(level, obj, parent);
  return { text, align: 'right' };
}

const formatResponse = (obj) => `${chalk.yellow('⤻')} ${obj.res.statusCode}`;
const formatRequest = (obj) => `${chalk.green('⤺')} ${obj.req.method} ${obj.req.url} from ${
  obj.req.remoteAddress
}`;
function formatReqId(obj) {
  const text = `${
    obj.responseTime !== undefined
      ? `${Math.round((obj.responseTime + Number.EPSILON) * 10000) / 10000}ms `
      : ''
  }[${colorWheel[obj.reqId % colorWheel.length](obj.reqId)}]`;
  return { text, align: 'right' };
}

module.exports = {
  filterOutMetadata,
  noDefaultMetadata,
  formatLogLevel,
  formatTime,
  formatMessage,
  formatPropertiesText,
  formatProperties,
  formatResponse,
  formatRequest,
  formatReqId,
};
