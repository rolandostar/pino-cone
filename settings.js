const chalk = require('chalk');

const levels = {
  trace: { label: '\u2B24', color: chalk.gray, colorize: true },
  debug: { label: '\u2B24', color: chalk.magentaBright, colorize: true },
  // 'info': { label: '\u2139', color: chalk.green, align: 'right' },
  info: { label: '', color: chalk.green },
  warn: { label: '\u26A0', color: chalk.yellow, colorize: true },
  error: { label: '\u2a02', color: chalk.red, colorize: true },
  fatal: { label: '\u2717', color: chalk.redBright, colorize: true },
};


const colorWheel = [
  chalk.red,
  chalk.green,
  chalk.yellow,
  chalk.blue,
  chalk.magenta,
  chalk.cyan,
  chalk.white,
];

module.exports = {
  levels,
  colorWheel,
};
