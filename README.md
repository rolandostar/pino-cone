<div align="center">
<img width="500" src="docs/pino-cone-logo.svg" alt="pino-cone Logo">
</div>

# pino-cone&nbsp;&nbsp;<img src="https://badgen.net/badge/build/works%20on%20my%20computer/green"/>&nbsp;<img src="https://badgen.net/badge/uses/JS/yellow"/>&nbsp;<img src="https://badgen.net/badge/designed%20in/MS Paint/blue"/>&nbsp;<img src="https://badgen.net/badge/made%20with/%E2%9D%A4/red" />

ndjson formatter for [pino](https://www.npmjs.com/package/pino), used best with [fastify](https://www.fastify.io/)
Based on [pino-pretty-min](https://www.npmjs.com/package/pino-pretty-min)

![Showcase](docs/showcase.png)

## Features

- Detection and formatting of Incoming Request and Outgoing Response for Fastify
- Formatted Error and Object printing
- Accepts input using pipe

## Installation

Install through npm

`npm install -g pino-cone`

## Usage

Pipe ndjson data into it by either redirecting your program's output or reading a log file

`npm start | pino-cone`

Or if your log file is named "out.log"

`tail -f out.log | pino-cone`

## Planned Features

- Colorization Settings
- Load as fastify plugin

## Release Notes

Check [CHANGELOG.md](https://github.com/rolandostar/pino-cone/blob/master/CHANGELOG.md)


