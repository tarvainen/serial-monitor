#!/usr/bin/env node

import * as commander from 'commander';

commander
  .command('list', 'List all the available serial ports')
  .command('monitor', 'Monitor specified port')
;

commander
  .version('1.0.0')
  .parse(process.argv)
;
