var Cylon = require("cylon");

const getRandomIntegerInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setAngle = function (my, channel, angle) {
  my.pca9685.setPWM(channel, 0, (angle).fromScale(0,180).toScale(200, 940));
}

Cylon.robot({
  name: 'H725',

  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    pca9685: { driver: 'pca9685' }
  },

  setPWMFreq: function (freq) {
    // console.log('[', this.name, ']: setting PWN frequency to', freq);
    this.pca9685.setPWMFreq(freq);
    return { freq: freq }
  },

  setAngle: function (channel, angle) {
    // console.log('[', this.name, ']: setting channel', channel, 'to angle', angle);
    this.pca9685.setPWM(channel, 0, (angle).fromScale(0,180).toScale(200, 940));
    return { channel: channel, angle: angle };
  },
});
Cylon.api('socketio', {
  host: '0.0.0.0',
  port: '3000'
});
Cylon.start();
