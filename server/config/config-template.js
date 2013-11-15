/**
 * Created by Mark on 11/5/13.
 */

exports.config = {
    listenPort: "1337",
    sessionSecret: "keyboard-cat",
    database: {
        IP: "192.168.0.10",
        name: "arduino-home",
        port: "27017"
    },
    arduino: {
        serialport: '/dev/ttyUSB0',
        baudrate: 57600
    }
};