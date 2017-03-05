#!/usr/bin/env node

import * as commander from 'commander';
import * as blessed from 'blessed';
import SerialPort = require('serialport');

commander
  .option('-p, --port <port>', 'Target port', 'COM1')
  .option('-b, --baud <baud>', 'Used baud rate', '9600')
  .parse(process.argv)
;

const screen = blessed.screen();

screen.title = 'Serial monitor';

const prompt = blessed.box({
  top: 0,
  left: 0,
  width: 2,
  height: 1,
  tags: true,
  content: '{bold}>{/bold}'
});

const input = blessed.textbox({
  top: 0,
  left: 2,
  height: 1,
  inputOnFocus: true
});

const box = blessed.textarea({
  top: 1,
  left: '0',
  width: '100%',
  height: '90%',
  content: '',
  scrollable: true,
  tags: true
});

screen.append(prompt);
screen.append(input);
screen.append(box);

screen.key(['escape', 'q', 'C-c'], () => {
  return process.exit(0);
});

input.key(['escape', 'q', 'C-c'], () => {
  return process.exit(0);
});

input.on('submit', () => {
  const text = input.getText();
  input.clearValue();
  onDataWritten(text);
});

screen.render();

const serial = new SerialPort(commander.port, { baudRate: +commander.baud });

serial.on('data', (data) => {
  onDataReceived(data.toString());
});

serial.on('disconnect', () => process.exit(0));
serial.on('close', () => process.exit(0));
serial.on('error', (err) => onError(err));

function log (text: string): void {
  box.insertLine(1, `[${Date.now()}] ${text.replace(/\n$/g, '')}`);
  refresh();
}

function onDataReceived(text: string): void {
  log(`{green-fg}${text}{/green-fg}`);
}

function onDataWritten(text: string): void {
  log(`{bold}${text}{/bold}`);
}

function onError(text: string): void {
  log(`{red-fg}${text}{/red-fg}`);
}

function refresh(): void {
  box.setScrollPerc(0);
  const program = blessed.program();
  program.hideCursor();

  input.focus();
  screen.render();

  // Obtain cursor focus in the input field
  setTimeout(() => {
    program.alternateBuffer();
    program.sety(0);
    program.setx(2);
    program.up(program.rows);
    program.right(input.getText().length);
    program.showCursor();
  });
}
