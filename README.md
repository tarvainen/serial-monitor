# serial-monitor

## What is this?

serial-monitor is just another simple tool for monitoring serial port traffing
during your awesome IOT projects! By installing this module as a global node
module you may list all the available serial ports and also communicate to
some of those using simple commands right from your PATH.

## Installation

Just run `npm install -g serial-monitor` to install serial-monitor so that you
can run it from the PATH.

## Usage

### Listing all available port information

Run `serial-monitor list`

Output:

```
[0] PORT: COM3 | MAN: Some Manufacturer | SN: 1231213
[1] PORT: COM6 | MAN: Some Manufacturer | SN: 1234512
```

### Communication to some port

Run `serial-monitor monitor [options]`

Available options are: 

    -h, --help         output usage information
    -p, --port <port>  Target port
    -b, --baud <baud>  Used baud rate
    
    
Example:

`serial-monitor monitor --port COM6 --baud 9600`

Output:

```
> my message to the serial

[1488725573782] serial message
[1488725571781] serial message
[1488725569782] serial message
[1488725567782] serial message
[1488725567325] rok!
```

Using the `monitor` command allows you to listen messages from the serial port
and also to write your own message back there. Since now all messages are separated
by newline character and all the data is handled as basic strings.

You may exit the monitoring console by pressing 'esc' or 'ctrl + c'.

## TODO
* Allow using custom parser
* Allow writing raw bytes in some way
* Allow reading raw buffers
