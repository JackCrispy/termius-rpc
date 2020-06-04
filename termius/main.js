'use strict';

/* eslint-disable no-console */

const DiscordRPC = require('../src');
const exec = require('child_process').exec;

const clientId = '700889110440837220';

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

rpc.on('ready', async() => {
  const startTimestamp = new Date();

  const { snapshot } = require("process-list");

  let tasks = await snapshot('pid', 'name');
  tasks = tasks.filter(task => task.name == "Termius.exe");

  const stp = new Date();

  setActivity((tasks.length > 0), startTimestamp);

  setInterval(async () => {
    let tasks = await snapshot('pid', 'name');
    tasks = tasks.filter(task => task.name == "Termius.exe");

    let processWindows = require("node-process-windows");
 
    processWindows.getProcesses(function(err, processes) {
        processes.forEach(fill => {
          if (fill.processName == "Termius") {
            let mainWindow = fill.mainWindowTitle;
            setActivity((tasks.length > 0), startTimestamp, mainWindow);
        }
      });
    });
  }, 5e3);

  async function setActivity(isRunning, startTimestamp, title) {
    if (!rpc) {
      return;
    }

    if (isRunning) {
      rpc.setActivity({
        details: `SSH Terminal`,
        state: title,
        startTimestamp,
        largeImageKey: 'large',
        largeImageText: 'Termius',
        smallImageKey: 'large',
        smallImageText: 'TermiusRPC',
        instance: false,
      });
    } else {
      rpc.clearActivity();
    }
  }
});

rpc.login({ clientId }).catch(console.error);
console.log('Started TermiusRPC - by JackCrispy#0001')
