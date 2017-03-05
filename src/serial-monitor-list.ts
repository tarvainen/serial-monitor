import SerialPort = require('serialport');

SerialPort.list((err, ports) => {
  if (err) {
    throw new Error(err);
  }

  ports.forEach((port, index) => {
    const com = `PORT: ${port.comName}`;
    const man = `MAN: ${port.manufacturer}`;
    const sn = `SN: ${port.serialNumber}`;

    console.log(`[${index}] ${com} | ${man} | ${sn}`);
  });
});
